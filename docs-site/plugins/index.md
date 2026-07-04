# 插件总览

PanSou 通过插件系统扩展搜索来源。插件需在启动时通过 `ENABLED_PLUGINS` 环境变量显式启用。

## 启用插件

```bash
# 启用多个插件（逗号分隔）
docker run -d --name pansou -p 8888:8888 \
  -e ENABLED_PLUGINS="labi,zhizhen,panta,shandian,duoduo,muou" \
  ghcr.io/fish2018/pansou:latest
```

## 推荐插件组合

| 场景 | 推荐组合 |
|------|---------|
| 基础轻量 | `labi,zhizhen,shandian` |
| 均衡全面 | `labi,zhizhen,panta,shandian,duoduo,muou,wanou,ouge` |
| 完整体验 | 以上 + `qqpd,gying,weibo`（需额外配置）|

## 特殊插件（需额外配置）

以下插件需要登录账号后才能使用，访问对应管理页面完成配置：

| 插件 | 说明 | 管理页面 | 文档 |
|------|------|---------|------|
| `qqpd` | QQ 频道搜索 | `http://localhost:8888/qqpd/你的QQ号` | [查看](/plugins/qqpd) |
| `gying` | Gying 影视站搜索 | `http://localhost:8888/gying/你的用户名` | [查看](/plugins/gying) |
| `weibo` | 微博资源搜索 | `http://localhost:8888/weibo/你的微博用户名` | [查看](/plugins/weibo) |

## 全部插件列表

> 共 70+ 个插件，按首字母排序。星级表示插件优先级（★★ = 等级1，★ = 等级2，无标记 = 等级3/4）。

| 插件名 | 说明 | 优先级 |
|--------|------|--------|
| `ahhhhfs` | A姐分享 | - |
| `aikanzy` | 爱看资源 | - |
| `alupan` | 阿鹿盘搜 | - |
| `ash` | ASH 资源站 | - |
| `bixin` | 币心资源 | - |
| `cldi` | CL 第一 | - |
| `clmao` | CL 猫搜索 | - |
| `clxiong` | CL 熊 | - |
| `cyg` | CYG 资源 | - |
| `daishudj` | 代树DJ | - |
| `ddys` | 低端影视 | - |
| `discourse` | Discourse 论坛搜索 | - |
| `djgou` | DJ 狗 | - |
| `duanjuw` | 断句网 | - |
| `duoduo` | 多多搜索 | ★ |
| `dyyj` | 电影院 | - |
| `dyyjpro` | 电影院Pro | - |
| `erxiao` | 二小 | - |
| `feikuai` | 飞快资源 | - |
| `fox4k` | Fox4K | - |
| `gaoqing888` | 高清888 | - |
| `gying` | Gying 影视 | ★★ |
| `haisou` | 嗨搜 | - |
| `hdmoli` | HD茉莉 | - |
| `hdr4k` | HDR4K | ★★ |
| `huban` | 虎斑搜索 | ★ |
| `hunhepan` | 混合盘 | - |
| `javdb` | JAVDB | - |
| `jikepan` | 极客盘 | - |
| `jsnoteclub` | JS笔记俱乐部 | - |
| `jupansou` | 聚盘搜 | - |
| `jutoushe` | 聚头社 | - |
| `kkmao` | KK猫 | - |
| `kkv` | KKV | - |
| `labi` | 拉比资源 | ★★ |
| `leijing` | 雷晶 | - |
| `libvio` | LibVio | - |
| `lingjisp` | 灵迹SP | - |
| `lou1` | 楼一 | - |
| `meitizy` | 媒体资源 | - |
| `melost` | MeLost | - |
| `miaoso` | 秒搜 | - |
| `mikuclub` | Miku Club | - |
| `mizixing` | 觅资星 | - |
| `muou` | 幕偶 | ★ |
| `nsgame` | NS游戏 | - |
| `nyaa` | Nyaa (动漫) | - |
| `ouge` | 偶哥资源 | ★ |
| `pan666` | 盘666 | - |
| `panlian` | 盘联 | - |
| `pansearch` | 盘搜搜 | - |
| `panta` | 盘他 | ★★ |
| `panwiki` | 盘Wiki | - |
| `panyq` | 盘优选 | - |
| `panzun` | 盘尊 | - |
| `pianku` | 片库 | - |
| `qqpd` | QQ 频道 | ★ |
| `qingying` | 青影 | - |
| `qiwei` | 奇味 | - |
| `quark4k` | 夸克4K | - |
| `quarksoo` | 夸克搜 | - |
| `quarktv` | 夸克TV | - |
| `qupanshe` | 趣盘社 | - |
| `qupansou` | 趣盘搜 | - |
| `sdso` | SDSO | - |
| `shandian` | 闪电资源 | ★ |
| `sousou` | 搜搜 | - |
| `susu` | 速速搜索 | ★★ |
| `thepiratebay` | The Pirate Bay（磁力）| - |
| `u3c3` | U3C3 | - |
| `wanou` | 玩偶资源 | ★ |
| `weibo` | 微博搜索 | ★ |
| `wuji` | 无极 | - |
| `xb6v` | XB6V | - |
| `xdpan` | XD盘 | - |
| `xdyh` | XD影汇 | - |
| `xiaoji` | 小鸡 | - |
| `xiaozhang` | 小章 | - |
| `xinjuc` | 新聚材 | - |
| `xuexizhinan` | 学习指南 | - |
| `xys` | XYS | - |
| `yiove` | 一OVE | - |
| `ypfxw` | 优品分享网 | - |
| `yuhuage` | 鱼花阁 | - |
| `yulinshufa` | 玉林书法 | - |
| `yunso` | 云搜 | - |
| `yunsou` | 云搜索 | - |
| `zhizhen` | 指针资源 | ★★ |
| `zxzj` | ZX资集 | - |
