# Docker 部署

## 镜像说明

| 镜像 | 说明 | 适用场景 |
|------|------|---------|
| `ghcr.io/fish2018/pansou-web` | 前后端集成版 | 开箱即用，包含搜索界面 |
| `ghcr.io/fish2018/pansou:latest` | 纯后端 API 版 | 自定义前端，仅需 API |

## 前后端集成版

### docker run

```bash
docker run -d \
  --name pansou \
  -p 80:80 \
  ghcr.io/fish2018/pansou-web
```

### docker-compose.yml

```yaml
version: '3'
services:
  pansou:
    image: ghcr.io/fish2018/pansou-web
    container_name: pansou
    ports:
      - "80:80"
    restart: unless-stopped
```

## 纯后端 API 版

### docker run（带常用配置）

```bash
docker run -d \
  --name pansou \
  -p 8888:8888 \
  -e CHANNELS="tgsearchers3,Aliyun_4K_Movies" \
  -e ENABLED_PLUGINS="labi,zhizhen,shandian,duoduo,muou" \
  -e CACHE_TTL=60 \
  ghcr.io/fish2018/pansou:latest
```

### docker-compose.yml（推荐）

```yaml
version: '3'
services:
  pansou:
    image: ghcr.io/fish2018/pansou:latest
    container_name: pansou
    ports:
      - "8888:8888"
    environment:
      - PORT=8888
      - CHANNELS=tgsearchers3
      - ENABLED_PLUGINS=labi,zhizhen,shandian,duoduo,muou
      - CACHE_TTL=60
    volumes:
      - ./cache:/app/cache   # 持久化磁盘缓存
    restart: unless-stopped
```

启动命令：

```bash
docker-compose up -d
docker-compose logs -f   # 查看日志
```

## 启用认证

```bash
docker run -d --name pansou -p 8888:8888 \
  -e AUTH_ENABLED=true \
  -e AUTH_USERS="admin:yourpassword" \
  -e AUTH_TOKEN_EXPIRY=24 \
  ghcr.io/fish2018/pansou:latest
```

## 使用代理

国内服务器访问 Telegram 需要配置代理：

```bash
docker run -d --name pansou -p 8888:8888 \
  -e PROXY=socks5://127.0.0.1:1080 \
  ghcr.io/fish2018/pansou:latest
```

## 常用管理命令

```bash
# 查看容器状态
docker ps

# 查看实时日志
docker logs -f pansou

# 重启服务
docker restart pansou

# 停止并删除
docker stop pansou && docker rm pansou

# 更新镜像
docker pull ghcr.io/fish2018/pansou:latest
docker restart pansou
```
