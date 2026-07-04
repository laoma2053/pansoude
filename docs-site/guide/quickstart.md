# 快速开始

本文将帮助你在 5 分钟内部署并运行 PanSou。

## 前置要求

- Docker（推荐）或 Go 1.18+
- 可选：SOCKS5 代理（用于访问受限地区的 Telegram）

## 方式一：Docker 一键启动（最快）

### 前后端集成版

包含搜索界面和后端 API，开箱即用：

```bash
docker run -d --name pansou -p 80:80 ghcr.io/fish2018/pansou-web
```

访问 `http://localhost` 即可使用搜索界面。

### 纯后端 API 版

只部署 API 服务，适合自定义前端：

```bash
docker run -d --name pansou -p 8888:8888 ghcr.io/fish2018/pansou:latest
```

访问 `http://localhost:8888/api/health` 验证服务状态。

## 方式二：Docker Compose（推荐）

```bash
# 下载配置文件
curl -o docker-compose.yml \
  https://raw.githubusercontent.com/fish2018/pansou-web/refs/heads/main/docker-compose.yml

# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f
```

## 验证部署

```bash
# 检查服务健康状态
curl http://localhost:8888/api/health

# 执行一次搜索
curl -X POST http://localhost:8888/api/search \
  -H "Content-Type: application/json" \
  -d '{"kw": "速度与激情"}'
```

成功响应示例：

```json
{
  "total": 15,
  "merged_by_type": {
    "baidu": [...],
    "quark": [...]
  }
}
```

## 启用插件

默认情况下插件未启用，需要通过环境变量显式指定：

```bash
docker run -d --name pansou -p 8888:8888 \
  -e ENABLED_PLUGINS="labi,zhizhen,shandian,duoduo,muou" \
  ghcr.io/fish2018/pansou:latest
```

> 推荐优先启用高质量插件：`labi`、`zhizhen`、`panta`、`shandian`、`duoduo`。

## 下一步

- [Docker 部署详解](/guide/docker) — 完整部署选项
- [配置说明](/guide/configuration) — 查看所有环境变量
- [API 文档](/api/) — 开始调用 API
