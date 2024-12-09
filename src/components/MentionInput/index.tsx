import React, { useRef, useState } from 'react';
import { MentionManager } from './MentionManager';
import { MentionList } from './MentionList';
import './styles.css';

export interface MentionOption {
  id: string;
  name: string;
}

interface MentionInputProps {
  options: MentionOption[];
  onChange?: (value: Array<string | MentionOption>) => void;
}

export const MentionInput: React.FC<MentionInputProps> = ({ options, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showList, setShowList] = useState(false);
  const [listPosition, setListPosition] = useState({ x: 0, y: 0 });
  const mentionManager = useRef(new MentionManager());

  // Handle input events
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerHTML;
    mentionManager.current.updateContent(content);
    onChange?.(mentionManager.current.getData());
  };

  // Handle keydown events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === '@') {
      const rect = window.getSelection()?.getRangeAt(0).getBoundingClientRect();
      if (rect) {
        setListPosition({
          x: rect.left,
          y: rect.bottom
        });
        setShowList(true);
      }
    } else if (e.key === 'Escape') {
      setShowList(false);
    }
  };

  // Insert mention at current position
  const insertMention = (option: MentionOption) => {
    const editor = editorRef.current;
    if (!editor) return;

    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    if (!range) return;

    // 删除 @ 符号
    range.setStart(range.startContainer, range.startOffset - 1);
    range.deleteContents();

    const mentionNode = document.createElement('span');
    mentionNode.contentEditable = 'false';
    mentionNode.className = 'mention-item';
    mentionNode.dataset.id = option.id;
    mentionNode.textContent = option.name;  // 移除 @ 前缀
    
    range.insertNode(mentionNode);
    
    // Move cursor after mention
    const newRange = document.createRange();
    newRange.setStartAfter(mentionNode);
    newRange.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(newRange);

    // Insert a space after mention
    const space = document.createTextNode('\u00A0');
    newRange.insertNode(space);
    newRange.setStartAfter(space);
    newRange.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(newRange);

    setShowList(false);
    handleInput({ currentTarget: editor } as React.FormEvent<HTMLDivElement>);
  };

  return (
    <div className="mention-input-container">
      <div
        ref={editorRef}
        className="mention-input"
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
      />
      {showList && (
        <MentionList
          options={options}
          position={listPosition}
          onSelect={insertMention}
          onClose={() => setShowList(false)}
        />
      )}
    </div>
  );
}; 