# 开发者文档

本章节面向希望了解 PanSou 内部实现或参与贡献的开发者。

## 文档目录

| 文档 | 说明 |
|------|------|
| [系统架构](/dev/architecture) | 整体架构设计、模块划分、数据流 |
| [插件开发指南](/dev/plugin-guide) | 如何开发新的搜索插件 |
| [二级缓存设计](/dev/cache) | 分片内存 + 磁盘缓存实现原理 |
| [排序算法](/dev/sorting) | 多维度综合评分排序详解 |

## 技术栈

| 组件 | 技术选型 | 原因 |
|------|---------|------|
| 语言 | Go 1.18+ | 原生并发，单二进制部署 |
| HTTP 框架 | Gin | 高性能路由，中间件生态完善 |
| JSON 库 | Sonic | 比标准库快 3-5 倍 |
| 缓存序列化 | GOB | 比 JSON 快 30%，体积小 20% |
| 认证 | JWT（HS256）| 无状态，不依赖外部存储 |

## 参与贡献

1. Fork 项目：[https://github.com/fish2018/pansou](https://github.com/fish2018/pansou)
2. 新建功能分支：`git checkout -b feature/your-plugin`
3. 开发并测试
4. 提交 Pull Request

> 贡献新插件前，请先阅读 [插件开发指南](/dev/plugin-guide)。
