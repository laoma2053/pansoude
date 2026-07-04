---
layout: home

hero:
  name: PanSou
  text: 高性能网盘资源搜索 API
  tagline: 支持 TG 频道搜索 + 70+ 插件扩展，并发搜索、智能排序、二级缓存，一键 Docker 部署
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/quickstart
    - theme: alt
      text: API 文档
      link: /api/
    - theme: alt
      text: GitHub
      link: https://github.com/fish2018/pansou

features:
  - icon: ⚡
    title: 高性能并发搜索
    details: 工作池设计，并发执行多个 TG 频道及插件搜索；MacBook Pro 8GB 可支持 500 用户同时访问。

  - icon: 🧩
    title: 70+ 插件生态
    details: 异步插件架构，4 秒快速响应 + 30 秒后台完整处理，轻松扩展任意搜索来源。

  - icon: 🗄️
    title: 二级缓存
    details: 分片内存缓存 + 分片磁盘缓存，GOB 序列化，重复查询响应时间 < 10ms。

  - icon: 📊
    title: 智能多维排序
    details: 插件等级（52%）+ 时间新鲜度（26%）+ 关键词匹配（22%）综合评分，优质内容优先。

  - icon: 🔐
    title: 认证系统（可选）
    details: 基于 JWT 的无状态认证，默认关闭，私有部署时一行环境变量开启，零侵入性。

  - icon: 🐳
    title: 一键 Docker 部署
    details: 提供前后端集成镜像与纯 API 镜像，docker run 即可启动，支持 Docker Compose。
---

## 支持的网盘类型

<div class="cloud-types">

| 类型标识 | 网盘名称 | 类型标识 | 网盘名称 |
|---------|---------|---------|---------|
| `baidu` | 百度网盘 | `aliyun` | 阿里云盘 |
| `quark` | 夸克网盘 | `uc` | UC 网盘 |
| `tianyi` | 天翼云盘 | `mobile` | 移动云盘 |
| `115` | 115 网盘 | `pikpak` | PikPak |
| `xunlei` | 迅雷网盘 | `123` | 123 网盘 |
| `guangya` | 光鸭云盘 | `magnet` | 磁力链接 |
| `ed2k` | 电驴链接 | `others` | 其他 |

</div>

## 快速体验

```bash
# 一键启动（前后端集成版）
docker run -d --name pansou -p 80:80 ghcr.io/fish2018/pansou-web

# 搜索示例
curl -X POST http://localhost/api/search \
  -H "Content-Type: application/json" \
  -d '{"kw": "速度与激情"}'
```

<style>
.cloud-types table {
  width: 100%;
}
</style>
