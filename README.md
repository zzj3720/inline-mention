# Inline Mention Input

一个纯 React 实现的内联 @ 提及输入框组件。这个项目（包括这个 README）完全由 AI 通过两轮对话自动生成，展示了 AI 辅助编程的强大能力。

## 特点

- 🤖 由 AI 自动生成的高质量代码（包括文档）
- 🎯 零依赖，纯 React 实现
- 💡 支持 @ 触发显示选择列表
- ⌨️ 完整的键盘操作支持
- 🎨 优雅的 UI 设计
- 📦 数据视图分离的架构设计

## 技术亮点

- 使用 `contentEditable` 实现富文本编辑
- 完善的光标位置处理
- 整体删除和选择的 mention 项
- 支持键盘（上下键选择，回车确认）和鼠标操作
- 类型完备的 TypeScript 实现

## 项目生成过程

这个项目仅通过与 AI 的两轮对话就完成了所有功能：

1. 第一轮：要求实现一个支持 @ mention 的输入框
2. 第二轮：修复样式和多余 @ 符号的问题

整个过程展示了 AI 在理解需求、架构设计、代码实现等方面的出色能力。

## 组件结构

- `MentionInput`: 主输入框组件
- `MentionList`: 选择列表组件
- `MentionManager`: 数据管理类

## 使用示例

```tsx
const options = [
  { id: '1', name: '张三' },
  { id: '2', name: '李四' },
  { id: '3', name: '王五' }
];

function App() {
  const handleChange = (value: Array<string | MentionOption>) => {
    console.log('Content changed:', value);
  };

  return (
    <MentionInput
      options={options}
      onChange={handleChange}
    />
  );
}
```

## 数据格式

输入框的内容会被解析成一个混合类型的数组：

```typescript
Array<string | { id: string; name: string }>
```

- 普通文本以字符串形式存储
- 提及项以对象形式存储，包含 id 和 name

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## AI 生成说明

这个项目（包括所有代码和文档）是使用 Cursor 编辑器的 AI 功能生成的。整个过程展示了 AI 在以下方面的能力：

1. 需求理解：准确理解了内联 mention 功能的核心需求
2. 架构设计：采用了数据视图分离的设计模式
3. 代码实现：生成了类型完备的 TypeScript 代码
4. 用户体验：考虑了键盘操作、光标处理等细节
5. 代码质量：生成了结构清晰、易于维护的代码
6. 文档编写：自动生成了清晰、结构化的技术文档

这个项目证明了 AI 辅助编程的效率和可行性，展示了 AI 在快速构建高质量功能组件和编写技术文档方面的潜力。
