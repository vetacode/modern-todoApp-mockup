'use client';

import { CheckCircle2, Circle, Trash2, Edit2 } from 'lucide-react';
import { Task } from '@/app/page';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 group ${
        task.completed
          ? 'bg-secondary/50 border-border hover:border-border/80'
          : 'bg-card border-border hover:border-primary/50 hover:bg-card'
      }`}
    >
      <button
        onClick={() => onToggle(task.id)}
        className="flex-shrink-0 transition-colors duration-200"
      >
        {task.completed ? (
          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        ) : (
          <Circle className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground hover:text-primary" />
        )}
      </button>

      <span
        className={`flex-1 text-sm sm:text-base transition-all ${
          task.completed
            ? 'text-muted-foreground line-through'
            : 'text-foreground'
        }`}
      >
        {task.title}
      </span>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
        <button
          onClick={() => onEdit(task.id)}
          className="flex-shrink-0 p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-all"
        >
          <Edit2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="flex-shrink-0 p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-all"
        >
          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}
