'use client';

import { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { Section } from './section-item';

interface TaskInputProps {
  onAddTask: (title: string, sectionId?: string) => void;
  sections: Section[];
}

export default function TaskInput({ onAddTask, sections }: TaskInputProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    sections.length > 0 ? sections[0].id : undefined
  );
  const [showSectionDropdown, setShowSectionDropdown] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAddTask(input.trim(), selectedSection);
      setInput('');
    }
  };

  const selectedSectionTitle = sections.find(s => s.id === selectedSection)?.title || 'Select section';

  return (
    <form onSubmit={handleSubmit} className="mb-6 sm:mb-8 space-y-3">
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

      {/* Section Selector */}
      {sections.length > 0 && (
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowSectionDropdown(!showSectionDropdown)}
            className="w-full flex items-center justify-between px-4 py-2 bg-secondary/50 border-2 border-border rounded-lg hover:border-primary/50 transition-colors text-sm text-foreground"
          >
            <span className="text-sm">Assign to: <span className="font-medium">{selectedSectionTitle}</span></span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showSectionDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showSectionDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border-2 border-border rounded-lg shadow-lg z-10">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    setSelectedSection(section.id);
                    setShowSectionDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-primary/10 transition-colors ${
                    selectedSection === section.id
                      ? 'bg-primary/20 text-primary font-medium'
                      : 'text-foreground'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </form>
  );
}
