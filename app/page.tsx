'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, Trash2, Plus } from 'lucide-react';
import Header from '@/components/header';
import TaskInput from '@/components/task-input';
import TaskList from '@/components/task-list';
import StatsBar from '@/components/stats-bar';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Design the UI for to-do app', completed: true, createdAt: new Date() },
    { id: '2', title: 'Implement task functionality', completed: false, createdAt: new Date() },
    { id: '3', title: 'Add drag and drop feature', completed: false, createdAt: new Date() },
  ]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <Header />

        {/* Stats Bar */}
        <StatsBar completed={completedCount} total={totalCount} />

        {/* Task Input */}
        <TaskInput onAddTask={addTask} />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="text-center py-16">
            <Circle className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              No tasks yet
            </h3>
            <p className="text-sm text-muted-foreground/70">
              Create your first task to get started
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
