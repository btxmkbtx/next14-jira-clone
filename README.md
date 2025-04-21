# package add list

bun add hono@4.6.3

bun add @tanstack/react-query@5.59.0

bun add @hono/zod-validator@0.3.0

bun add node-appwrite@14.0.0

bun add server-only

bun add react-use

bun add nuqs@1.19.1

bun add @tanstack/react-table@8.20.5

bun add react-big-calendar@1.14.1
bun add -D @types/react-big-calendar@1.8.1

bun add @hello-pangea/dnd@17.0.0

```md
# 为什么要使用 hello-pangea/dnd？为什么放弃 react-beautiful-dnd？

react-beautiful-dnd：
由 Atlassian 开发，但已进入维护状态，官方不再积极更新，且在 React 18 严格模式下可能存在兼容性问题
社区推荐迁移到其分支库（如 @hello-pangea/dnd）或其他替代方案。

@hello-pangea/dnd：
是 react-beautiful-dnd 的活跃维护分支，继承了相同的 API 设计，但修复了原库的缺陷并持续更新。
完全支持 React 18，解决了原库在严格模式下的警告和性能问题
```

```md
# 如果需要追加某个 shadcn 空间，以 Textarea 为例

bunx --bun shadcn@2.1.0 add textarea
```
