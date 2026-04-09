# Claude Skills

> 可复用的 Claude 能力扩展

## Skills 列表

| Skill | 说明 | 路径 |
|-------|------|------|
| PRD 生成器 | 自动生成产品需求文档 | [prd-generator](./prd-generator/) |
| PRD 管理器 | 管理版本化 PRD 文档 | [prd-manager](./prd-manager/) |
| Claude API | Claude API 使用示例 | [claude-api](./claude-api/) |
| web-access | 统一处理搜索、抓取、网页登录与浏览器交互 | [web-access](./web-access/) |

## 当前状态

- 已纳入项目内维护的 Skill 共 `4` 个
- 新增：`web-access`（版本 `2.4.1`）
- 目录状态：`SKILL.md`、`scripts/`、`references/` 已完整同步到仓库

## 使用方法

1. 将需要的 skill 目录复制到项目 `.claude/skills/` 目录
2. 按照各 skill 的 README 使用

## Skill 开发规范

- 每个 skill 独立目录
- 必须包含 `README.md` 说明
- 可包含示例代码和模板文件

---

*Skills 索引：[_index.md](./_index.md)*
