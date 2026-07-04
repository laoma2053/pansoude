# 配置说明

所有配置均通过环境变量注入，无需修改代码。

## 基础配置

| 环境变量 | 描述 | 默认值 |
|---------|------|--------|
| `PORT` | 服务监听端口 | `8888` |
| `PROXY` | SOCKS5 代理地址 | 无 |
| `HTTPS_PROXY` | HTTPS 代理地址 | 无 |
| `HTTP_PROXY` | HTTP 代理地址 | 无 |
| `CHANNELS` | 默认搜索的 TG 频道，逗号分隔 | `tgsearchers3` |
| `ENABLED_PLUGINS` | 启用的插件列表，逗号分隔 | 无（需显式指定） |

**CHANNELS 示例：**

```bash
CHANNELS="tgsearchers3,Aliyun_4K_Movies,bdbdndn11,yunpanx"
```

**ENABLED_PLUGINS 示例：**

```bash
# 推荐组合（高质量优先）
ENABLED_PLUGINS="labi,zhizhen,panta,shandian,duoduo,muou"
```

> 插件未指定时不会启用任何插件，仅搜索 TG 频道。

## 认证配置

默认关闭，设置 `AUTH_ENABLED=true` 启用。

| 环境变量 | 描述 | 默认值 |
|---------|------|--------|
| `AUTH_ENABLED` | 是否启用 JWT 认证 | `false` |
| `AUTH_USERS` | 用户列表，格式：`user1:pass1,user2:pass2` | 无 |
| `AUTH_TOKEN_EXPIRY` | Token 有效期（小时） | `24` |
| `AUTH_JWT_SECRET` | JWT 签名密钥（建议手动设置） | 自动生成 |

```bash
# 启用认证示例
AUTH_ENABLED=true
AUTH_USERS=admin:yourpassword,user2:pass456
AUTH_JWT_SECRET=your-random-secret-key
```

## 缓存配置

| 环境变量 | 描述 | 默认值 |
|---------|------|--------|
| `CACHE_TTL` | 缓存有效期（分钟） | `60` |
| `CACHE_MAX_SIZE` | 最大缓存大小（MB） | `100` |
| `CACHE_PATH` | 磁盘缓存路径 | `./cache` |
| `SHARD_COUNT` | 缓存分片数量 | `8` |
| `CACHE_WRITE_STRATEGY` | 写入策略：`immediate` / `hybrid` | `hybrid` |

## 异步插件配置

| 环境变量 | 描述 | 默认值 |
|---------|------|--------|
| `ASYNC_PLUGIN_ENABLED` | 是否启用异步插件 | `true` |
| `ASYNC_RESPONSE_TIMEOUT` | 快速响应超时（秒） | `4` |
| `PLUGIN_TIMEOUT` | 插件最大超时（秒） | `30` |
| `ASYNC_LOG_ENABLED` | 异步插件详细日志 | `true` |
| `ASYNC_MAX_BACKGROUND_WORKERS` | 最大后台工作者数 | CPU 核心数 × 5 |
| `ASYNC_MAX_BACKGROUND_TASKS` | 最大后台任务数 | 工作者数 × 5 |
| `ASYNC_CACHE_TTL_HOURS` | 异步缓存有效期（小时） | `1` |

## 性能配置

| 环境变量 | 描述 | 默认值 |
|---------|------|--------|
| `CONCURRENCY` | 并发搜索数 | 自动计算 |
| `HTTP_MAX_CONNS` | HTTP 最大连接数 | 自动计算 |
| `HTTP_READ_TIMEOUT` | HTTP 读取超时（秒） | 自动计算 |
| `HTTP_WRITE_TIMEOUT` | HTTP 写入超时（秒） | 自动计算 |
| `HTTP_IDLE_TIMEOUT` | HTTP 空闲超时（秒） | `120` |
| `GC_PERCENT` | Go GC 触发百分比 | `50` |
| `ENABLE_COMPRESSION` | 是否启用响应压缩 | `false` |

## 推荐配置方案

### 个人轻量部署（2 核 2GB）

```bash
PORT=8888
CHANNELS=tgsearchers3
ENABLED_PLUGINS=labi,zhizhen,shandian
CACHE_TTL=60
ASYNC_MAX_BACKGROUND_WORKERS=10
GC_PERCENT=50
```

### 生产环境（4 核 8GB 服务器）

```bash
PORT=8888
CHANNELS=tgsearchers3,Aliyun_4K_Movies,bdbdndn11
ENABLED_PLUGINS=labi,zhizhen,panta,shandian,duoduo,muou,wanou,ouge
HTTP_MAX_CONNS=500
ASYNC_MAX_BACKGROUND_WORKERS=40
ASYNC_MAX_BACKGROUND_TASKS=200
CONCURRENCY=50
GC_PERCENT=50
ASYNC_LOG_ENABLED=false
```
