# 个人知识库

> 本地优先，GitHub 同步的多端知识管理系统

## 知识库概览

本知识库涵盖六大领域：

| 领域 | 说明 | 路径 |
|------|------|------|
| 💼 **商业** | 商业策略、市场营销、案例分析 | [knowledge/business](./knowledge/business) |
| 🎯 **运营** | 用户运营、内容运营、数据运营 | [knowledge/operation](./knowledge/operation) |
| 🎬 **短视频剪辑** | PR、剪映、AE、剪辑技巧 | [knowledge/video-editing](./knowledge/video-editing) |
| 💻 **技术** | 前端、后端、AI 技术栈 | [knowledge/tech](./knowledge/tech) |
| 📚 **读书笔记** | 跨领域阅读笔记 | [knowledge/reading](./knowledge/reading) |

## 快速导航

- [知识库索引](./knowledge/_index.md) - 全局知识索引
- [每日日志](./journal) - 对话记录和日常笔记
- [Skills](./skills) - Claude Skills 合集

## 当前状态

- Skills 仓库已收录 `web-access`，路径：`skills/web-access`
- 当前 Skills 清单：`prd-manager`、`claude-api`、`web-access`
- `prd-manager` 现为 PRD 相关主入口，负责生成与版本化管理
- `web-access` 当前同步版本：`2.4.1`
- `web-access` 已包含 `SKILL.md`、`scripts/`、`references/`，可继续按项目需要复制到实际运行环境

## 目录结构

```
myContext/
├── README.md              # 本文件
├── skills/                # Claude Skills
├── knowledge/             # 知识内容
│   ├── inbox/            # 待整理收件箱
│   ├── business/         # 商业
│   ├── operation/        # 运营
│   ├── video-editing/    # 短视频剪辑
│   ├── tech/             # 技术
│   │   ├── frontend/     # 前端
│   │   ├── backend/      # 后端
│   │   └── ai/           # AI
│   └── reading/          # 读书笔记
├── journal/              # 每日日志
└── scripts/              # 工具脚本
```

## 内容存储规范

### 1. 链接文章
- 路径：`knowledge/{分类}/YYYY-MM-DD-简短标题.md`
- 包含：元数据、AI 摘要、关键要点、原文段落

### 2. 截图
- 图片：`knowledge/{分类}/assets/YYYY-MM-DD-截图名.jpg`
- 描述：`knowledge/{分类}/YYYY-MM-DD-截图名.md`

### 3. 文件（PDF/其他）
- 文件：`knowledge/{分类}/assets/文件名.pdf`
- 描述：`knowledge/{分类}/YYYY-MM-DD-文件名.md`

### 4. 自写笔记
- 路径：`knowledge/{分类}/YYYY-MM-DD-标题.md`

## 工作流程

### 添加内容
1. **链接文章**：提供 URL → AI 爬取生成摘要 → 创建文件 → 更新索引
2. **截图**：提供图片 → 压缩保存 → AI 分析 → 创建描述 → 更新索引
3. **文件**：上传文件 → 保存 → AI 分析 → 创建描述 → 更新索引
4. **笔记**：直接创建 markdown 文件

### 每日日志
- 对话结束时自动创建/更新 `journal/YYYY/MM/DD.md`
- 包含：对话主题、关键产出、收集的资料、后续行动

## 工具脚本

- [图片压缩脚本](./scripts/compress-image.sh) - 批量压缩图片

## 使用建议

1. **收件箱**：新内容先放入 `inbox/`，定期整理到对应分类
2. **索引维护**：依赖 AI 自动维护 `_index.md` 文件
3. **标签系统**：使用统一的标签便于检索
4. **定期回顾**：每周回顾知识库，更新索引和关联

---

*最后更新：2026-04-09*
