# Gying 插件

Gying 影视站搜索插件，支持自定义域名配置、多用户账号登录，内置反爬挑战自动处理。

## 启用方式

```bash
ENABLED_PLUGINS=gying ./pansou
```

> 需要海外可访问的代理：`PROXY=socks5://127.0.0.1:7897`

## 配置步骤

### 1. 访问管理页面

```
http://localhost:8888/gying/你的用户名
```

系统自动生成专属 hash，重定向到 `http://localhost:8888/gying/{hash}`。

### 2. 配置站点地址（重要，先做）

在"站点地址"区域输入你的 Gying 站点域名：

```
https://your-gying-domain.com
```

> 修改站点地址会清空当前登录状态，需重新登录。

### 3. 账号登录

输入用户名和密码，点击"登录"。插件内置反爬挑战自动处理，登录过程可能需要 3-10 秒完成验证。

### 4. 开始搜索

```bash
curl "http://localhost:8888/api/search?kw=遮天&src=plugin"
```

## 管理 API

所有操作通过 `POST /gying/{hash}`：

| action | 说明 |
|--------|------|
| `get_status` | 获取登录状态 |
| `get_config` | 获取当前站点地址 |
| `update_config` | 更新站点地址 |
| `login` | 账号密码登录 |
| `logout` | 退出登录 |
| `test_search` | 测试搜索 |

**示例：更新站点地址**

```bash
curl -X POST "http://localhost:8888/gying/{hash}" \
  -H "Content-Type: application/json" \
  -d '{"action": "update_config", "base_url": "https://your-gying-domain.com"}'
```

## 环境变量

| 变量 | 说明 |
|------|------|
| `PROXY` | 代理地址（Gying 需要海外网络时使用）|
| `GYING_HASH_SALT` | 自定义 hash 加盐 |

## 特性亮点

- **反爬自动处理**：内置 PoW 验证求解，无需浏览器环境
- **登录失效自动重登**：搜索遇到 403 时用保存的加密密码自动重新登录
- **Cookie 持久化**：保存登录态 + 验证态 Cookie，减少重复验证
- **自定义域名**：所有请求基于配置的 `base_url` 动态拼接
