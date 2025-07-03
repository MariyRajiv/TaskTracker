import React, { useState, useEffect, useMemo } from 'react';
import { Task, User, TaskFilter, TaskSort } from './types/Task';
import { Login } from './components/Login';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskFilter as TaskFilterComponent } from './components/TaskFilter';
import {
  saveTasksToStorage,
  loadTasksFromStorage,
  saveUserToStorage,
  loadUserFromStorage,
  clearUserFromStorage
} from './utils/localStorage';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [sortBy, setSortBy] = useState<TaskSort>('created');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Load data on app start
  useEffect(() => {
    const savedUser = loadUserFromStorage();
    const savedTasks = loadTasksFromStorage();
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';

    if (savedUser) setUser(savedUser);
    setTasks(savedTasks);
    setIsDarkMode(savedDarkMode);
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  // Save tasks when they change
  useEffect(() => {
    if (user) {
      saveTasksToStorage(tasks);
    }
  }, [tasks, user]);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    saveUserToStorage(newUser);
  };

  const handleLogout = () => {
    setUser(null);
    clearUserFromStorage();
    setTasks([]);
    setEditingTask(null);
  };

  const handleAddTask = (task: Task) => {
    setTasks(prev => [task, ...prev]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  // Get unique categories
  const categories = useMemo(() => {
    const categorySet = new Set(
      tasks.filter(task => task.category).map(task => task.category!)
    );
    return Array.from(categorySet).sort();
  }, [tasks]);

  // Filter and sort tasks with enhanced search
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    // Apply search filter - search by title, description, and category
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        (task.description && task.description.toLowerCase().includes(searchLower)) ||
        (task.category && task.category.toLowerCase().includes(searchLower))
      );
    }

    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(task => 
        filter === 'completed' ? task.completed : !task.completed
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(task => task.category === selectedCategory);
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'created':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [tasks, searchTerm, filter, selectedCategory, sortBy]);

  const tasksCount = useMemo(() => ({
    all: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length
  }), [tasks]);

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <Header
        user={user}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center py-6">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
              Welcome back, {user.username}! 👋
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Let's get things done today
            </p>
          </div>

          {/* Task Form */}
          <TaskForm
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            editingTask={editingTask}
            onCancelEdit={() => setEditingTask(null)}
          />

          {/* Task Filter */}
          <TaskFilterComponent
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filter={filter}
            onFilterChange={setFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            tasksCount={tasksCount}
          />

          {/* Search Results Info */}
          {searchTerm && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <p className="text-blue-700 dark:text-blue-300">
                Found <strong>{filteredAndSortedTasks.length}</strong> task{filteredAndSortedTasks.length !== 1 ? 's' : ''} matching "<strong>{searchTerm}</strong>"
              </p>
            </div>
          )}

          {/* Task List */}
          <TaskList
            tasks={filteredAndSortedTasks}
            onToggleComplete={handleToggleComplete}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </main>
    </div>
  );
}

export default App;