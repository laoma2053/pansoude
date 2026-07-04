# 源码编译

## 环境要求

- Go 1.18+
- Git

## 编译步骤

```bash
# 1. 克隆仓库
git clone https://github.com/fish2018/pansou.git
cd pansou

# 2. 下载依赖
go mod download

# 3. 编译（Linux 静态二进制）
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
  go build -ldflags="-s -w -extldflags '-static'" -o pansou .

# 4. 运行
./pansou
```

## 跨平台编译

```bash
# macOS
GOOS=darwin GOARCH=amd64 go build -o pansou-mac .

# Windows
GOOS=windows GOARCH=amd64 go build -o pansou.exe .

# Linux ARM64（树莓派等）
CGO_ENABLED=0 GOOS=linux GOARCH=arm64 go build -o pansou-arm64 .
```

## 配置环境变量

启动前设置必要环境变量：

```bash
export PORT=8888
export CHANNELS="tgsearchers3"
export ENABLED_PLUGINS="labi,zhizhen,shandian"

./pansou
```

## 使用 Supervisor 管理进程

生产环境建议用 Supervisor 管理，详见 [Nginx 参考配置](/guide/nginx)。
