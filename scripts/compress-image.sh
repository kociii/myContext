#!/bin/bash

# 图片压缩脚本
# 支持批量压缩指定目录图片
# 自动命名格式转换
# 压缩质量控制（默认 80%）

# 使用方法:
#   ./compress-image.sh <输入路径> [输出目录] [质量]
#   ./compress-image.sh ~/Downloads/screenshot.png
#   ./compress-image.sh ~/Downloads/ ./compressed/ 85

set -e

# 默认配置
QUALITY=${3:-80}
DATE_PREFIX=$(date +%Y-%m-%d)

# 检查依赖
command -v convert >/dev/null 2>&1 || {
    echo "错误：需要安装 ImageMagick"
    echo "Mac: brew install imagemagick"
    echo "Ubuntu: sudo apt-get install imagemagick"
    exit 1
}

# 显示帮助
show_help() {
    echo "图片压缩脚本"
    echo ""
    echo "用法:"
    echo "  $0 <输入路径> [输出目录] [质量]"
    echo ""
    echo "参数:"
    echo "  输入路径   - 图片文件或目录路径"
    echo "  输出目录   - 压缩后图片保存位置 (默认: 同输入目录)"
    echo "  质量       - JPEG 压缩质量 1-100 (默认: 80)"
    echo ""
    echo "示例:"
    echo "  $0 ~/Downloads/screenshot.png"
    echo "  $0 ~/Downloads/screenshot.png ./compressed/"
    echo "  $0 ~/Downloads/images/ ./compressed/ 85"
}

# 检查参数
if [ $# -lt 1 ] || [ "$1" == "-h" ] || [ "$1" == "--help" ]; then
    show_help
    exit 0
fi

INPUT_PATH="$1"
OUTPUT_DIR="${2:-$(dirname "$INPUT_PATH")}"

# 确保输出目录存在
mkdir -p "$OUTPUT_DIR"

# 压缩单张图片
compress_image() {
    local input_file="$1"
    local filename=$(basename "$input_file")
    local extension="${filename##*.}"
    local name="${filename%.*}"

    # 转换文件名为小写，空格替换为连字符
    local clean_name=$(echo "$name" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

    # 生成输出文件名（添加日期前缀）
    local output_file="${OUTPUT_DIR}/${DATE_PREFIX}-${clean_name}.jpg"

    # 跳过非图片文件
    if [[ ! "$extension" =~ ^(jpg|jpeg|png|gif|bmp|tiff|webp)$ ]]; then
        echo "跳过非图片文件: $filename"
        return
    fi

    echo "压缩: $filename -> $(basename "$output_file")"

    # 压缩图片
    convert "$input_file" \
        -strip \
        -interlace Plane \
        -quality "$QUALITY" \
        -sampling-factor 4:2:0 \
        "$output_file"

    # 显示压缩结果
    local orig_size=$(du -h "$input_file" | cut -f1)
    local new_size=$(du -h "$output_file" | cut -f1)
    echo "  完成: $orig_size -> $new_size"
}

# 处理输入
if [ -f "$INPUT_PATH" ]; then
    # 单文件
    compress_image "$INPUT_PATH"
elif [ -d "$INPUT_PATH" ]; then
    # 目录
    echo "批量压缩目录: $INPUT_PATH"
    echo "输出目录: $OUTPUT_DIR"
    echo "压缩质量: $QUALITY"
    echo ""

    find "$INPUT_PATH" -maxdepth 1 -type f \( \
        -iname "*.jpg" -o \
        -iname "*.jpeg" -o \
        -iname "*.png" -o \
        -iname "*.gif" -o \
        -iname "*.bmp" -o \
        -iname "*.tiff" -o \
        -iname "*.webp" \
    \) | while read -r file; do
        compress_image "$file"
    done

    echo ""
    echo "批量压缩完成！"
else
    echo "错误: 输入路径不存在: $INPUT_PATH"
    exit 1
fi
