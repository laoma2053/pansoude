# 二级缓存设计

## 架构概览

PanSou 使用分片内存缓存 + 分片磁盘缓存的二级结构：

```
读取请求
    │
    ▼
分片内存缓存（ShardedMemoryCache）
    │ 未命中
    ▼
分片磁盘缓存（ShardedDiskCache）
    │ 命中 → 异步预热到内存
    │ 未命中 → 执行搜索
    ▼
搜索结果
    │
    ├── 立即写入内存缓存
    └── 延迟批量写入磁盘（DelayedBatchWriteManager）
```

## 分片设计

通过分片减少锁竞争，提升并发性能：

```go
// 内存缓存：基于 CPU 核心数动态分片
type ShardedMemoryCache struct {
    shards    []*MemoryCacheShard
    shardMask uint32  // 用于快速取模定位分片
}

// 每个分片独立读写锁
type MemoryCacheShard struct {
    data map[string]*CacheItem
    lock sync.RWMutex
}
```

## 缓存键策略

TG 搜索和插件搜索使用不同前缀，互相隔离：

```go
// TG 搜索缓存键：包含频道列表的哈希
GenerateTGCacheKey(keyword string, channels []string) string

// 插件搜索缓存键：包含插件列表的哈希
GeneratePluginCacheKey(keyword string, plugins []string) string
```

## 写入策略

| 策略 | 触发时机 | 适用场景 |
|------|---------|---------|
| `immediate` | 立即同步写盘 | 数据安全优先 |
| `hybrid`（默认）| 内存立即写，磁盘延迟批量写 | 性能与安全平衡 |

程序终止时（SIGTERM/SIGINT），`DelayedBatchWriteManager` 会自动将所有未写入数据刷盘，防止数据丢失。

## 性能数据

| 场景 | 耗时 |
|------|------|
| 内存缓存命中 | < 1ms |
| 磁盘缓存命中 | < 10ms |
| 缓存未命中（全量搜索）| 4-30s |

## 相关配置

```bash
CACHE_TTL=60              # 缓存有效期（分钟）
CACHE_MAX_SIZE=100        # 最大缓存大小（MB）
CACHE_PATH=./cache        # 磁盘缓存路径
SHARD_COUNT=8             # 分片数量
CACHE_WRITE_STRATEGY=hybrid
```
