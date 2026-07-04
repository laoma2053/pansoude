#!/bin/bash
# 本地构建并部署到 1Panel 服务器
# 用法: ./scripts/deploy.sh root@your-server-ip
# 示例: ./scripts/deploy.sh root@123.45.67.89

set -e

REMOTE="${1:?请提供服务器地址，例如: root@123.45.67.89}"
# 1Panel 默认网站根目录
REMOTE_PATH="/www/wwwroot/pansou-docs"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DOCS_DIR="$(dirname "$SCRIPT_DIR")"

echo "==> 安装依赖..."
cd "$DOCS_DIR"
npm ci

echo "==> 构建文档站..."
npm run build

echo "==> 上传到 $REMOTE:$REMOTE_PATH ..."
rsync -avzr --delete \
  .vitepress/dist/ \
  "$REMOTE:$REMOTE_PATH/"

echo "==> 重载 OpenResty..."
ssh "$REMOTE" "cd /www/server/openresty && ./nginx -s reload" 2>/dev/null || \
  echo "    (OpenResty 重载跳过，手动在 1Panel 面板操作)"

echo "==> 完成！访问 https://docs.your-domain.com 查看效果"
