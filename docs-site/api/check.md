# 链接检测接口

检测网盘分享链接是否有效，支持批量检测，结果带服务端缓存。

## 接口信息

| 项目 | 说明 |
|------|------|
| 路径 | `/api/check/links` |
| 方法 | `POST` |
| 需要认证 | 取决于 `AUTH_ENABLED` 配置 |

## 支持的网盘类型

`baidu`、`aliyun`、`quark`、`tianyi`、`uc`、`mobile`、`115`、`xunlei`、`123`

## 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `items` | object[] | 是 | 待检测链接数组，至少 1 条 |
| `items[].disk_type` | string | 是 | 网盘类型 |
| `items[].url` | string | 是 | 完整分享链接 |
| `items[].password` | string | 否 | 提取码（未拼接在链接中时传此字段）|
| `view_token` | string | 否 | 前端批次标识，用于区分不同检测批次 |

## 请求示例

```bash
curl -X POST http://localhost:8888/api/check/links \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "disk_type": "quark",
        "url": "https://pan.quark.cn/s/abcdefg",
        "password": "1234"
      },
      {
        "disk_type": "baidu",
        "url": "https://pan.baidu.com/s/1abcdef?pwd=abcd"
      },
      {
        "disk_type": "xunlei",
        "url": "https://pan.xunlei.com/s/abcdefg?pwd=1234"
      }
    ],
    "view_token": "batch-001"
  }'
```

## 返回格式

```json
{
  "results": [
    {
      "disk_type": "quark",
      "url": "https://pan.quark.cn/s/abcdefg",
      "normalized_url": "https://pan.quark.cn/s/abcdefg?pwd=1234",
      "state": "ok",
      "cache_hit": false,
      "checked_at": 1710000000000,
      "expires_at": 1710086400000,
      "summary": "链接有效"
    },
    {
      "disk_type": "xunlei",
      "url": "https://pan.xunlei.com/s/abcdefg?pwd=1234",
      "normalized_url": "https://pan.xunlei.com/s/abcdefg?pwd=1234",
      "state": "bad",
      "cache_hit": true,
      "checked_at": 1710000100000,
      "expires_at": 1710021700000,
      "summary": "链接失效"
    }
  ]
}
```

## 状态说明

| state | 含义 |
|-------|------|
| `ok` | 链接有效 |
| `bad` | 链接失效 |
| `locked` | 需要提取码或密码错误 |
| `unsupported` | 当前网盘暂不支持检测 |
| `uncertain` | 检测失败或结果不确定 |
