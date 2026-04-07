# 工具脚本

> 知识库辅助工具

## 可用脚本

### 图片压缩

两个版本的图片压缩脚本，支持批量压缩和自动命名：

| 脚本 | 依赖 | 说明 |
|------|------|------|
| [compress-image.sh](./compress-image.sh) | ImageMagick | Shell 版本 |
| [compress-image.js](./compress-image.js) | sharp (npm) | Node.js 版本 |

#### Shell 版本使用方法

```bash
# 压缩单张图片
./compress-image.sh ~/Downloads/screenshot.png

# 压缩到指定目录
./compress-image.sh ~/Downloads/screenshot.png ./output/

# 指定压缩质量 (1-100)
./compress-image.sh ~/Downloads/screenshot.png ./output/ 85

# 批量压缩目录
./compress-image.sh ~/Downloads/images/ ./compressed/
```

#### Node.js 版本使用方法

```bash
# 先安装依赖
npm install sharp

# 使用方法与 shell 版本相同
node compress-image.js ~/Downloads/screenshot.png
node compress-image.js ~/Downloads/images/ ./compressed/ 85
```

#### 功能特性

- 自动添加日期前缀 (`YYYY-MM-DD-`)
- 文件名自动清理（小写、空格转连字符）
- 输出统一为 JPEG 格式
- 显示压缩前后大小对比
- 支持批量处理

## 添加新脚本

欢迎添加更多实用脚本，建议：

1. 添加使用说明到本 README
2. 脚本添加详细的注释说明
3. Shell 脚本添加执行权限 (`chmod +x`)
