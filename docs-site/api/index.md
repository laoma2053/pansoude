# API 总览

PanSou 提供 RESTful API，所有接口均以 `/api` 为前缀。

## 基础信息

| 项目 | 说明 |
|------|------|
| 默认端口 | `8888` |
| 请求格式 | `application/json`（POST）|
| 响应格式 | `application/json` |
| 字符编码 | UTF-8 |

## 接口列表

| 方法 | 路径 | 描述 | 需要认证 |
|------|------|------|---------|
| POST / GET | `/api/search` | 搜索网盘资源 | 可选 |
| POST | `/api/check/links` | 检测链接有效性 | 可选 |
| GET | `/api/health` | 健康检查 | 否 |
| POST | `/api/auth/login` | 用户登录获取 Token | 否 |
| POST | `/api/auth/verify` | 验证 Token 有效性 | 是 |
| POST | `/api/auth/logout` | 退出登录 | 否 |

## 认证说明

认证功能默认关闭。启用后（`AUTH_ENABLED=true`），除登录和健康检查接口外，所有接口需要在请求头中携带 Token：

```
Authorization: Bearer <your-jwt-token>
```

**获取 Token：**

```bash
curl -X POST http://localhost:8888/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'
```

**携带 Token 调用接口：**

```bash
curl -X POST http://localhost:8888/api/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGc..." \
  -d '{"kw":"速度与激情"}'
```

## 错误响应格式

```json
// 参数错误 400
{ "code": 400, "message": "关键词不能为空" }

// 未授权 401
{ "error": "未授权：缺少认证令牌", "code": "AUTH_TOKEN_MISSING" }

// Token 无效 401
{ "error": "未授权：令牌无效或已过期", "code": "AUTH_TOKEN_INVALID" }
```
