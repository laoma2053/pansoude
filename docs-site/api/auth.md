# 认证接口

当服务启用认证（`AUTH_ENABLED=true`）时，使用以下接口管理 Token。

## 登录获取 Token

| 项目 | 说明 |
|------|------|
| 路径 | `/api/auth/login` |
| 方法 | `POST` |
| 需要认证 | 否 |

```bash
curl -X POST http://localhost:8888/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "yourpassword"}'
```

**成功响应：**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_at": 1234567890,
  "username": "admin"
}
```

**失败响应：**

```json
{ "error": "用户名或密码错误" }
```

## 验证 Token

| 项目 | 说明 |
|------|------|
| 路径 | `/api/auth/verify` |
| 方法 | `POST` |
| 需要认证 | 是 |

```bash
curl -X POST http://localhost:8888/api/auth/verify \
  -H "Authorization: Bearer eyJhbGc..."
```

**成功响应：**

```json
{ "valid": true, "username": "admin" }
```

## 退出登录

| 项目 | 说明 |
|------|------|
| 路径 | `/api/auth/logout` |
| 方法 | `POST` |
| 需要认证 | 否 |

> 退出登录为客户端行为，服务端无状态。调用此接口后客户端需自行清除本地存储的 Token。

```bash
curl -X POST http://localhost:8888/api/auth/logout
```

**响应：**

```json
{ "message": "退出成功" }
```
