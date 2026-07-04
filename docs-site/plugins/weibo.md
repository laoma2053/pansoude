# 微博插件

微博资源搜索插件，支持多账户扫码登录，自动从配置的微博用户的帖子和评论中提取网盘链接。

## 启用方式

```bash
ENABLED_PLUGINS=weibo ./pansou
```

## 配置步骤

### 1. 访问管理页面

```
http://localhost:8888/weibo/你的微博用户名
```

系统自动生成专属 hash，重定向到 `http://localhost:8888/weibo/{hash}`。

> 请收藏 hash 后的 URL，方便后续访问。

### 2. 扫码登录

页面显示二维码，用**手机微博 APP** 扫码登录，每 2 秒自动检测登录状态。

### 3. 配置微博用户

在"微博用户管理"区域输入要搜索的微博用户 ID，每行一个：

```
1234567890
2345678901
```

**如何获取微博用户 ID？** 访问目标用户主页，URL 中的数字即为用户 ID：
`https://weibo.com/u/1234567890`

支持纯用户 ID 或完整 URL 格式。

### 4. 开始搜索

```bash
curl "http://localhost:8888/api/search?kw=唐朝诡事录&src=plugin"
```

## 管理 API

所有操作通过 `POST /weibo/{hash}`：

| action | 说明 | 需要登录 |
|--------|------|---------|
| `get_status` | 获取登录状态和已配置的微博用户 | 否 |
| `refresh_qrcode` | 刷新二维码 | 否 |
| `check_login` | 轮询检测登录状态 | 否 |
| `logout` | 退出登录 | 是 |
| `set_users` | 保存微博用户列表 | 是 |
| `test_search` | 测试搜索 | 是 |

**示例：设置微博用户**

```bash
curl -X POST "http://localhost:8888/weibo/{hash}" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "set_users",
    "users": ["1234567890", "2345678901"]
  }'
```

## 搜索原理

```
关键词搜索
  ↓
并发搜索所有配置的微博用户（前3页微博）
  ↓
过滤含有关键词的微博
  ↓
提取正文 + 评论中的网盘链接
  ↓
去重返回
```

## 环境变量

| 变量 | 说明 |
|------|------|
| `WEIBO_HASH_SALT` | 自定义 hash 加盐 |
| `WEIBO_ENCRYPTION_KEY` | Cookie 加密密钥（32字节）|

## 注意事项

- Cookie 有效期约 1 年，过期需重新登录
- 单账户请求过快可能被限流，建议配置多个账户
- 微博用户 ID 必须为纯数字格式
