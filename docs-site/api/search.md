# 搜索接口

搜索网盘资源，支持 POST 和 GET 两种方式。

## 接口信息

| 项目 | 说明 |
|------|------|
| 路径 | `/api/search` |
| 方法 | `POST` / `GET` |
| 需要认证 | 取决于 `AUTH_ENABLED` 配置 |

## 请求参数

### POST 参数（JSON Body）

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `kw` | string | 是 | 搜索关键词 |
| `channels` | string[] | 否 | TG 频道列表，不填则使用默认配置 |
| `plugins` | string[] | 否 | 指定插件列表，不填则使用全部启用插件 |
| `cloud_types` | string[] | 否 | 只返回指定网盘类型，如 `["baidu","quark"]` |
| `conc` | number | 否 | 并发搜索数，默认自动计算 |
| `refresh` | boolean | 否 | 是否强制刷新缓存，默认 `false` |
| `res` | string | 否 | 返回格式：`merge`（默认）/ `results` / `all` |
| `src` | string | 否 | 数据来源：`all`（默认）/ `tg` / `plugin` |
| `ext` | object | 否 | 传递给插件的扩展参数 |
| `filter` | object | 否 | 结果过滤配置，见下方说明 |

### GET 参数（Query String）

GET 参数与 POST 相同，数组类型用英文逗号分隔，`filter`/`ext` 传 URL 编码的 JSON 字符串。

## 过滤参数（filter）

```json
{
  "include": ["合集", "全集"],
  "exclude": ["预告", "花絮"]
}
```

- `include`：包含任意一个关键词的结果才保留（OR 关系）
- `exclude`：包含任意一个关键词的结果会被过滤（OR 关系）

## 请求示例

### 基础搜索

```bash
curl -X POST http://localhost:8888/api/search \
  -H "Content-Type: application/json" \
  -d '{"kw": "速度与激情"}'
```

### 指定网盘类型

```bash
curl -X POST http://localhost:8888/api/search \
  -H "Content-Type: application/json" \
  -d '{
    "kw": "速度与激情",
    "cloud_types": ["baidu", "quark", "aliyun"],
    "res": "merge"
  }'
```

### 使用过滤器

```bash
curl -X POST http://localhost:8888/api/search \
  -H "Content-Type: application/json" \
  -d '{
    "kw": "唐朝诡事录",
    "filter": {
      "include": ["合集", "全集"],
      "exclude": ["预告", "花絮"]
    }
  }'
```

### 指定插件搜索

```bash
curl -X POST http://localhost:8888/api/search \
  -H "Content-Type: application/json" \
  -d '{
    "kw": "凡人修仙传",
    "plugins": ["labi", "zhizhen", "panta"],
    "src": "plugin"
  }'
```

### GET 方式

```bash
curl "http://localhost:8888/api/search?kw=速度与激情&res=merge&src=tg"
```

## 返回格式

```json
{
  "total": 15,
  "results": [
    {
      "message_id": "12345",
      "unique_id": "tgsearchers3-12345",
      "channel": "tgsearchers3",
      "datetime": "2024-06-10T14:23:45Z",
      "title": "速度与激情全集1-10",
      "content": "速度与激情系列全集，1080P高清...",
      "links": [
        {
          "type": "baidu",
          "url": "https://pan.baidu.com/s/1abcdef",
          "password": "1234",
          "datetime": "2024-06-10T14:23:45Z",
          "work_title": "速度与激情全集"
        }
      ],
      "tags": ["电影", "合集"],
      "images": ["https://cdn1.cdn-telegram.org/file/xxx.jpg"]
    }
  ],
  "merged_by_type": {
    "baidu": [
      {
        "url": "https://pan.baidu.com/s/1abcdef",
        "password": "1234",
        "note": "速度与激情全集1-10",
        "datetime": "2024-06-10T14:23:45Z",
        "source": "tg:tgsearchers3",
        "images": []
      }
    ],
    "quark": []
  }
}
```

## res 参数说明

| 值 | 说明 |
|----|------|
| `merge`（默认）| 只返回 `merged_by_type`，按网盘类型分组 |
| `results` | 只返回 `results`，原始搜索结果列表 |
| `all` | 返回完整响应（`results` + `merged_by_type`）|
