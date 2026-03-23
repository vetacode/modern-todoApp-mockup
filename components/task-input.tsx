'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

interface TaskInputProps {
  onAddTask: (title: string) => void;
}

export default function TaskInput({ onAddTask }: TaskInputProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAddTask(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 sm:mb-8">
      <div
        className={`flex items-center gap-3 px-4 py-3 bg-card rounded-lg border-2 transition-all duration-200 ${
          isFocused
            ? 'border-primary shadow-lg shadow-primary/20'
            : 'border-border hover:border-primary/50'
        }`}
      >
        <Plus className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Add a new task..."
          className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground text-sm sm:text-base"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>
    </form>
  );
}
