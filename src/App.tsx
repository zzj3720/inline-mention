import { MentionInput, MentionOption } from './components/MentionInput';
import './App.css';

// 示例用户数据
const users: MentionOption[] = [
  { id: '1', name: '张三' },
  { id: '2', name: '李四' },
  { id: '3', name: '王五' },
  { id: '4', name: '赵六' },
  { id: '5', name: '钱七' },
];

function App() {
  const handleChange = (value: Array<string | MentionOption>) => {
    console.log('内容变化:', value);
  };

  return (
    <div className="app">
      <h1>@ 提及输入框示例</h1>
      <div className="demo-container">
        <h2>使用说明：</h2>
        <ul>
          <li>输入 @ 符号可以触发用户列表</li>
          <li>使用上下键选择用户</li>
          <li>按回车键或点击选择用户</li>
          <li>按 ESC 键关闭列表</li>
        </ul>
        <div className="input-container">
          <h3>开始输入：</h3>
          <MentionInput
            options={users}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
