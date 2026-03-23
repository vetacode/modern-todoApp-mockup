'use client';

import { ChevronDown, Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { Task } from '@/app/page';
import TaskItem from './task-item';

export interface Section {
  id: string;
  title: string;
  collapsed: boolean;
  taskIds: string[];
}

interface SectionItemProps {
  section: Section;
  tasks: Task[];
  onToggleCollapse: (id: string) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditSection: (id: string) => void;
  onDeleteSection: (id: string) => void;
  onEditTask: (id: string) => void;
}

export default function SectionItem({
  section,
  tasks,
  onToggleCollapse,
  onToggleTask,
  onDeleteTask,
  onEditSection,
  onDeleteSection,
  onEditTask,
}: SectionItemProps) {
  const sectionTasks = tasks.filter(task => section.taskIds.includes(task.id));
  const activeTasks = sectionTasks.filter(task => !task.completed);
  const completedTasks = sectionTasks.filter(task => task.completed);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="space-y-3">
      {/* Section Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary/10 to-accent/5 rounded-lg border-2 border-primary/30 cursor-pointer hover:border-primary/50 transition-all group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <button
          onClick={() => onToggleCollapse(section.id)}
          className="flex-shrink-0 p-1 hover:bg-primary/20 rounded transition-colors"
        >
          <ChevronDown
            className={`w-5 h-5 text-primary transition-transform duration-200 ${
              section.collapsed ? '-rotate-90' : ''
            }`}
          />
        </button>

        <h3 className="flex-1 font-semibold text-foreground text-sm sm:text-base">
          {section.title}
        </h3>

        <span className="text-xs sm:text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
          {sectionTasks.length}
        </span>

        {isHovering && (
          <div className="flex gap-2 ml-2">
            <button
              onClick={() => onEditSection(section.id)}
              className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-all"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDeleteSection(section.id)}
              className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Section Tasks */}
      {!section.collapsed && sectionTasks.length > 0 && (
        <div className="ml-4 space-y-3 animate-in fade-in duration-200">
          {activeTasks.length > 0 && (
            <div className="space-y-2">
              {activeTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={onToggleTask}
                  onDelete={onDeleteTask}
                  onEdit={onEditTask}
                />
              ))}
            </div>
          )}

          {completedTasks.length > 0 && (
            <div>
              {activeTasks.length > 0 && (
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 mt-4">
                  Completed
                </h4>
              )}
              <div className="space-y-2 opacity-70">
                {completedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggleTask}
                    onDelete={onDeleteTask}
                    onEdit={onEditTask}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!section.collapsed && sectionTasks.length === 0 && (
        <div className="ml-4 p-4 text-center rounded-lg border-2 border-dashed border-border">
          <p className="text-sm text-muted-foreground">No tasks in this section</p>
        </div>
      )}
    </div>
  );
}
