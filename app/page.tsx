'use client';

import { useState } from 'react';
import { Circle, Plus } from 'lucide-react';
import Header from '@/components/header';
import TaskInput from '@/components/task-input';
import StatsBar from '@/components/stats-bar';
import SectionItem, { Section } from '@/components/section-item';
import EditModal from '@/components/edit-modal';

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
    { id: '4', title: 'Setup database', completed: false, createdAt: new Date() },
    { id: '5', title: 'Deploy to production', completed: false, createdAt: new Date() },
  ]);

  const [sections, setSections] = useState<Section[]>([
    { id: 's1', title: 'Frontend', collapsed: false, taskIds: ['1', '2', '3'] },
    { id: 's2', title: 'Backend', collapsed: false, taskIds: ['4', '5'] },
  ]);

  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    type: 'task' | 'section' | null;
    id: string | null;
    currentValue: string;
  }>({
    isOpen: false,
    type: null,
    id: null,
    currentValue: '',
  });

  const [newSectionInput, setNewSectionInput] = useState('');

  const addTask = (title: string, sectionId?: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    setTasks([newTask, ...tasks]);

    // Add to section if provided
    if (sectionId) {
      setSections(sections.map(section =>
        section.id === sectionId
          ? { ...section, taskIds: [newTask.id, ...section.taskIds] }
          : section
      ));
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    // Remove from all sections
    setSections(sections.map(section => ({
      ...section,
      taskIds: section.taskIds.filter(taskId => taskId !== id),
    })));
  };

  const editTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setEditModal({
        isOpen: true,
        type: 'task',
        id,
        currentValue: task.title,
      });
    }
  };

  const saveTaskEdit = (newTitle: string) => {
    if (editModal.id) {
      setTasks(tasks.map(task =>
        task.id === editModal.id ? { ...task, title: newTitle } : task
      ));
    }
  };

  const addSection = (title: string) => {
    const newSection: Section = {
      id: `s${Date.now().toString()}`,
      title,
      collapsed: false,
      taskIds: [],
    };
    setSections([...sections, newSection]);
  };

  const toggleSectionCollapse = (id: string) => {
    setSections(sections.map(section =>
      section.id === id ? { ...section, collapsed: !section.collapsed } : section
    ));
  };

  const editSection = (id: string) => {
    const section = sections.find(s => s.id === id);
    if (section) {
      setEditModal({
        isOpen: true,
        type: 'section',
        id,
        currentValue: section.title,
      });
    }
  };

  const saveSectionEdit = (newTitle: string) => {
    if (editModal.id) {
      setSections(sections.map(section =>
        section.id === editModal.id ? { ...section, title: newTitle } : section
      ));
    }
  };

  const deleteSection = (id: string) => {
    const section = sections.find(s => s.id === id);
    if (section) {
      // Delete all tasks in this section
      const taskIdsToDelete = section.taskIds;
      setTasks(tasks.filter(task => !taskIdsToDelete.includes(task.id)));
    }
    setSections(sections.filter(section => section.id !== id));
  };

  const handleEditModalSave = (value: string) => {
    if (editModal.type === 'task') {
      saveTaskEdit(value);
    } else if (editModal.type === 'section') {
      saveSectionEdit(value);
    }
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
        <TaskInput onAddTask={addTask} sections={sections} />

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <SectionItem
              key={section.id}
              section={section}
              tasks={tasks}
              onToggleCollapse={toggleSectionCollapse}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onEditSection={editSection}
              onDeleteSection={deleteSection}
              onEditTask={editTask}
            />
          ))}
        </div>

        {/* Add Section */}
        <div className="mt-8 space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (newSectionInput.trim()) {
                addSection(newSectionInput.trim());
                setNewSectionInput('');
              }
            }}
            className="flex items-center gap-3 px-4 py-3 bg-card rounded-lg border-2 border-border hover:border-primary/50 transition-colors"
          >
            <Plus className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              value={newSectionInput}
              onChange={(e) => setNewSectionInput(e.target.value)}
              placeholder="Add a new section..."
              className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground text-sm sm:text-base"
            />
            <button
              type="submit"
              disabled={!newSectionInput.trim()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </form>
        </div>

        {/* Empty State */}
        {tasks.length === 0 && sections.length === 0 && (
          <div className="text-center py-16">
            <Circle className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              No tasks yet
            </h3>
            <p className="text-sm text-muted-foreground/70">
              Create your first section and start adding tasks
            </p>
          </div>
        )}

        {/* Edit Modal */}
        <EditModal
          isOpen={editModal.isOpen}
          title={editModal.type === 'task' ? 'Edit Task' : 'Edit Section'}
          currentValue={editModal.currentValue}
          onSave={handleEditModalSave}
          onClose={() => setEditModal({ isOpen: false, type: null, id: null, currentValue: '' })}
          placeholder={editModal.type === 'task' ? 'Enter task text...' : 'Enter section name...'}
        />
      </div>
    </main>
  );
}
