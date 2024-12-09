import React, { useEffect, useState } from 'react';
import { MentionOption } from './index';

interface MentionListProps {
  options: MentionOption[];
  position: { x: number; y: number };
  onSelect: (option: MentionOption) => void;
  onClose: () => void;
}

export const MentionList: React.FC<MentionListProps> = ({
  options,
  position,
  onSelect,
  onClose,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % options.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + options.length) % options.length);
          break;
        case 'Enter':
          e.preventDefault();
          onSelect(options[selectedIndex]);
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [options, selectedIndex, onSelect, onClose]);

  return (
    <div
      className="mention-list"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
      }}
    >
      {options.map((option, index) => (
        <div
          key={option.id}
          className={`mention-list-item ${index === selectedIndex ? 'selected' : ''}`}
          onClick={() => onSelect(option)}
          onMouseEnter={() => setSelectedIndex(index)}
        >
          {option.name}
        </div>
      ))}
    </div>
  );
}; 