'use client';

import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { Task } from '@/app/page';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Active Tasks */}
      {activeTasks.length > 0 && (
        <div>
          <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Active Tasks ({activeTasks.length})
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {activeTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 mt-6 sm:mt-8">
            Completed ({completedTasks.length})
          </h3>
          <div className="space-y-2 sm:space-y-3 opacity-70">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
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

      <button
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 p-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all duration-200"
      >
        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}
