# 插件开发指南

## 插件优先级

PanSou 使用 4 级优先级系统，直接影响排序权重：

| 等级 | 排序得分 | 适用场景 |
|------|---------|---------|
| 1 | +1000 | 高质量、链接有效性 >90%、稳定可靠 |
| 2 | +500 | 质量良好、有效性 70-90% |
| 3 | 0 | 普通质量、有效性 50-70% |
| 4 | -200 | 质量较低或不稳定 |

## 最小插件模板

```go
package myplugin

import (
    "context"
    "fmt"
    "net/http"
    "net/url"
    "time"

    "pansou/model"
    "pansou/plugin"
    pjson "pansou/util/json"
)

type MyPlugin struct {
    *plugin.BaseAsyncPlugin
}

func init() {
    p := &MyPlugin{
        BaseAsyncPlugin: plugin.NewBaseAsyncPlugin("myplugin", 3),
    }
    plugin.RegisterGlobalPlugin(p)
}

// Search 兼容性入口
func (p *MyPlugin) Search(keyword string, ext map[string]interface{}) ([]model.SearchResult, error) {
    result, err := p.AsyncSearchWithResult(keyword, p.searchImpl, p.MainCacheKey, ext)
    if err != nil {
        return nil, err
    }
    return result.Results, nil
}

func (p *MyPlugin) searchImpl(client *http.Client, keyword string, ext map[string]interface{}) ([]model.SearchResult, error) {
    // 1. 构建请求 URL
    searchURL := fmt.Sprintf("https://api.example.com/search?q=%s", url.QueryEscape(keyword))

    // 2. 带超时的 Context（避免挂起）
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()

    req, err := http.NewRequestWithContext(ctx, "GET", searchURL, nil)
    if err != nil {
        return nil, fmt.Errorf("[%s] 创建请求失败: %w", p.Name(), err)
    }

    // 3. 设置请求头（防反爬）
    req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
    req.Header.Set("Accept", "application/json, text/plain, */*")
    req.Header.Set("Accept-Language", "zh-CN,zh;q=0.9")

    // 4. 发送请求
    resp, err := client.Do(req)
    if err != nil {
        return nil, fmt.Errorf("[%s] 请求失败: %w", p.Name(), err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != 200 {
        return nil, fmt.Errorf("[%s] 状态码: %d", p.Name(), resp.StatusCode)
    }

    // 5. 解析响应（使用项目统一 JSON 库）
    var apiResp struct {
        Data []struct {
            ID    string `json:"id"`
            Title string `json:"title"`
            URL   string `json:"url"`
            Pwd   string `json:"pwd"`
        } `json:"data"`
    }
    if err := pjson.NewDecoder(resp.Body).Decode(&apiResp); err != nil {
        return nil, fmt.Errorf("[%s] JSON 解析失败: %w", p.Name(), err)
    }

    // 6. 转换为标准格式
    results := make([]model.SearchResult, 0, len(apiResp.Data))
    for _, item := range apiResp.Data {
        cloudType := plugin.DetectCloudType(item.URL)
        if cloudType == "" {
            continue
        }
        results = append(results, model.SearchResult{
            UniqueID: fmt.Sprintf("%s-%s", p.Name(), item.ID),
            Title:    item.Title,
            Links: []model.Link{
                {
                    Type:     cloudType,
                    URL:      item.URL,
                    Password: item.Pwd,
                },
            },
        })
    }

    // 7. 关键词过滤（必须执行）
    return plugin.FilterResultsByKeyword(results, keyword), nil
}
```

## 注意事项

| 规则 | 说明 |
|------|------|
| `Channel` 字段 | 插件结果必须为空字符串 `""`，TG 结果才设置频道名 |
| `Links` 不为空 | 系统自动过滤无链接结果 |
| 错误格式 | 使用 `fmt.Errorf("[%s] 描述: %w", p.Name(), err)` |
| 关闭响应体 | 必须 `defer resp.Body.Close()` |
| JSON 库 | 使用 `pansou/util/json` 而非标准库 |

## 磁力搜索插件（跳过 Service 层过滤）

```go
func init() {
    p := &MagnetPlugin{
        // 第三个参数 true = 跳过 Service 层关键词过滤
        BaseAsyncPlugin: plugin.NewBaseAsyncPluginWithFilter("mymagnet", 4, true),
    }
    plugin.RegisterGlobalPlugin(p)
}
```

## 在 main.go 注册导入

```go
import (
    _ "pansou/plugin/myplugin"
    // ... 其他插件
)
```
