# Nginx + Supervisor 参考配置

## Supervisor 配置

将 PanSou 注册为系统服务：

```ini
[program:pansou]
environment=PORT=8888,CHANNELS="tgsearchers3",ENABLED_PLUGINS="labi,zhizhen,shandian,duoduo,muou"
command=/home/work/pansou/pansou
directory=/home/work/pansou
autostart=true
autorestart=true
startsecs=5
startretries=3
exitcodes=0
stopwaitsecs=10
stopasgroup=true
killasgroup=true
```

```bash
# 重新加载配置并启动
supervisorctl reread
supervisorctl update
supervisorctl start pansou
```

## Nginx 配置

### HTTP 转发（基础）

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8888;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### HTTPS + 限流（生产推荐）

```nginx
# 限流区域定义（放在 http 块）
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=60r/m;

server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate     /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH;
    ssl_prefer_server_ciphers on;

    access_log /var/log/nginx/pansou.log;

    location / {
        limit_req zone=api_limit burst=10 nodelay;
        limit_req_status 429;

        proxy_pass http://127.0.0.1:8888;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 申请 SSL 证书（Let's Encrypt）

```bash
# 安装 certbot
apt install certbot python3-certbot-nginx

# 申请证书
certbot --nginx -d your-domain.com

# 自动续期（已自动配置 cron）
certbot renew --dry-run
```
