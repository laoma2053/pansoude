# QQPD 插件

QQ 频道搜索插件，支持多用户扫码登录，聚合所有用户配置的 QQ 频道资源。

## 启用方式

```bash
ENABLED_PLUGINS=qqpd ./pansou
```

## 配置步骤

### 1. 访问管理页面

```
http://localhost:8888/qqpd/你的QQ号
```

系统自动根据 QQ 号生成 64 位 hash，重定向到专属管理页：

```
http://localhost:8888/qqpd/{hash}
```

> 请收藏 hash 后的 URL，方便后续访问。

### 2. 扫码登录

页面显示二维码，用**手机 QQ** 扫码登录，每 2 秒自动检测登录状态。

### 3. 配置频道

在"频道管理"区域输入频道号，每行一个：

```
pd97631607
languan8K115
m250319e25
```

支持纯频道号或完整 URL（`https://pd.qq.com/g/pd97631607`）。

### 4. 开始搜索

```bash
curl "http://localhost:8888/api/search?kw=遮天&src=plugin"
```

## 管理 API

所有操作通过统一 POST 接口 `POST /qqpd/{hash}`：

| action | 说明 | 需要登录 |
|--------|------|---------|
| `get_status` | 获取登录状态和频道配置 | 否 |
| `refresh_qrcode` | 刷新二维码 | 否 |
| `check_login` | 轮询检测登录状态 | 否 |
| `logout` | 退出登录 | 是 |
| `set_channels` | 保存频道列表 | 是 |
| `test_search` | 测试搜索 | 是 |

**示例：设置频道**

```bash
curl -X POST "http://localhost:8888/qqpd/{hash}" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "set_channels",
    "channels": ["pd97631607", "kuake12345"]
  }'
```

## 环境变量

| 变量 | 说明 |
|------|------|
| `QQPD_HASH_SALT` | 自定义 hash 加盐（推荐生产环境设置）|
| `QQPD_ENCRYPTION_KEY` | Cookie 加密密钥（32字节）|

## 特性亮点

- **Session 保活**：每 3 分钟自动访问一次 QQ 频道，防止 Cookie 失效
- **多用户负载均衡**：多个用户配置相同频道时自动去重，任务均匀分配
- **guild_id 缓存**：首次配置后永久缓存 guild_id，搜索时零额外网络请求
- **数据持久化**：配置存储于 `cache/qqpd_users/{hash}.json`，重启不丢失
