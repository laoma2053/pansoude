# 健康检查

检查 API 服务是否正常运行，返回插件和频道状态。

## 接口信息

| 项目 | 说明 |
|------|------|
| 路径 | `/api/health` |
| 方法 | `GET` |
| 需要认证 | 否（公开接口）|

## 请求示例

```bash
curl http://localhost:8888/api/health
```

## 返回格式

```json
{
  "status": "ok",
  "auth_enabled": false,
  "plugins_enabled": true,
  "plugin_count": 5,
  "plugins": [
    "labi",
    "zhizhen",
    "panta",
    "shandian",
    "duoduo"
  ],
  "channels_count": 1,
  "channels": [
    "tgsearchers3"
  ]
}
```

## 字段说明

| 字段 | 说明 |
|------|------|
| `status` | 服务状态，`ok` 表示正常 |
| `auth_enabled` | 是否启用认证 |
| `plugins_enabled` | 是否启用插件 |
| `plugin_count` | 已启用的插件数量 |
| `plugins` | 已启用的插件列表 |
| `channels_count` | 配置的 TG 频道数量 |
| `channels` | 配置的 TG 频道列表 |

## 使用场景

- 容器健康检查（Docker HEALTHCHECK）
- 监控系统探针
- 部署后验证

```dockerfile
# Dockerfile 健康检查示例
HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl -f http://localhost:8888/api/health || exit 1
```
