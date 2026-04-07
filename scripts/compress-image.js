#!/usr/bin/env node

/**
 * 图片压缩脚本 (Node.js 版本)
 * 支持批量压缩指定目录图片
 * 自动命名格式转换
 * 压缩质量控制（默认 80%）
 *
 * 使用方法:
 *   node compress-image.js <输入路径> [输出目录] [质量]
 *   node compress-image.js ~/Downloads/screenshot.png
 *   node compress-image.js ~/Downloads/ ./compressed/ 85
 *
 * 依赖安装:
 *   npm install sharp
 */

const fs = require('fs');
const path = require('path');

// 检查 sharp 是否安装
try {
    var sharp = require('sharp');
} catch (e) {
    console.error('错误：需要安装 sharp 模块');
    console.error('请运行: npm install sharp');
    process.exit(1);
}

// 配置
const args = process.argv.slice(2);
const QUALITY = parseInt(args[2]) || 80;
const DATE_PREFIX = new Date().toISOString().split('T')[0];

// 支持的图片格式
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'];

// 显示帮助
function showHelp() {
    console.log('图片压缩脚本 (Node.js)');
    console.log('');
    console.log('用法:');
    console.log('  node compress-image.js <输入路径> [输出目录] [质量]');
    console.log('');
    console.log('参数:');
    console.log('  输入路径   - 图片文件或目录路径');
    console.log('  输出目录   - 压缩后图片保存位置 (默认: 同输入目录)');
    console.log('  质量       - JPEG 压缩质量 1-100 (默认: 80)');
    console.log('');
    console.log('示例:');
    console.log('  node compress-image.js ~/Downloads/screenshot.png');
    console.log('  node compress-image.js ~/Downloads/screenshot.png ./compressed/');
    console.log('  node compress-image.js ~/Downloads/images/ ./compressed/ 85');
}

// 检查参数
if (args.length < 1 || args[0] === '-h' || args[0] === '--help') {
    showHelp();
    process.exit(0);
}

const INPUT_PATH = args[0];
const OUTPUT_DIR = args[1] || path.dirname(INPUT_PATH);

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 格式化文件名
function formatFilename(filename) {
    const name = path.parse(filename).name;
    return name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '');
}

// 格式化文件大小
function formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 压缩单张图片
async function compressImage(inputFile) {
    const filename = path.basename(inputFile);
    const extension = path.extname(filename).toLowerCase();
    const cleanName = formatFilename(filename);
    const outputFile = path.join(OUTPUT_DIR, `${DATE_PREFIX}-${cleanName}.jpg`);

    // 检查是否为图片
    if (!IMAGE_EXTENSIONS.includes(extension)) {
        console.log(`跳过非图片文件: ${filename}`);
        return;
    }

    console.log(`压缩: ${filename} -> ${path.basename(outputFile)}`);

    try {
        const originalStats = fs.statSync(inputFile);

        await sharp(inputFile)
            .jpeg({
                quality: QUALITY,
                progressive: true,
                mozjpeg: true
            })
            .toFile(outputFile);

        const newStats = fs.statSync(outputFile);
        const origSize = formatSize(originalStats.size);
        const newSize = formatSize(newStats.size);
        const ratio = ((1 - newStats.size / originalStats.size) * 100).toFixed(1);

        console.log(`  完成: ${origSize} -> ${newSize} (节省 ${ratio}%)`);
    } catch (err) {
        console.error(`  错误: ${err.message}`);
    }
}

// 获取目录中的所有图片
function getImagesInDir(dir) {
    return fs.readdirSync(dir)
        .filter(file => {
            const ext = path.extname(file).toLowerCase();
            return IMAGE_EXTENSIONS.includes(ext);
        })
        .map(file => path.join(dir, file));
}

// 主程序
async function main() {
    const stats = fs.statSync(INPUT_PATH);

    if (stats.isFile()) {
        // 单文件
        await compressImage(INPUT_PATH);
    } else if (stats.isDirectory()) {
        // 目录
        console.log(`批量压缩目录: ${INPUT_PATH}`);
        console.log(`输出目录: ${OUTPUT_DIR}`);
        console.log(`压缩质量: ${QUALITY}`);
        console.log('');

        const images = getImagesInDir(INPUT_PATH);

        if (images.length === 0) {
            console.log('目录中没有找到图片文件');
            return;
        }

        for (const image of images) {
            await compressImage(image);
        }

        console.log('');
        console.log('批量压缩完成！');
    } else {
        console.error(`错误: 输入路径不存在: ${INPUT_PATH}`);
        process.exit(1);
    }
}

main().catch(err => {
    console.error(`错误: ${err.message}`);
    process.exit(1);
});
