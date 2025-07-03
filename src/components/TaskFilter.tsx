import React from 'react';
import { Search, Filter, X, Sparkles } from 'lucide-react';
import { TaskFilter as TaskFilterType, TaskSort } from '../types/Task';

interface TaskFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filter: TaskFilterType;
  onFilterChange: (filter: TaskFilterType) => void;
  sortBy: TaskSort;
  onSortChange: (sort: TaskSort) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  tasksCount: {
    all: number;
    completed: number;
    pending: number;
  };
}

export const TaskFilter: React.FC<TaskFilterProps> = ({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
  sortBy,
  onSortChange,
  categories,
  selectedCategory,
  onCategoryChange,
  tasksCount
}) => {
  const filterOptions = [
    { value: 'all' as TaskFilterType, label: 'All Tasks', count: tasksCount.all, color: 'blue' },
    { value: 'pending' as TaskFilterType, label: 'Pending', count: tasksCount.pending, color: 'orange' },
    { value: 'completed' as TaskFilterType, label: 'Completed', count: tasksCount.completed, color: 'green' }
  ];

  const sortOptions = [
    { value: 'created' as TaskSort, label: 'Created Date' },
    { value: 'title' as TaskSort, label: 'Title' },
    { value: 'dueDate' as TaskSort, label: 'Due Date' },
    { value: 'priority' as TaskSort, label: 'Priority' }
  ];

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 transition-colors group-focus-within:text-blue-500" />
        <input
          type="text"
          placeholder="Search tasks by title, description, or category..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-12 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 shadow-sm hover:shadow-md text-lg"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {searchTerm && (
          <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Searching for: <strong>"{searchTerm}"</strong>
            </p>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-3">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-105 shadow-sm hover:shadow-md ${
              filter === option.value
                ? option.color === 'blue'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/50'
                  : option.color === 'orange'
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-200 dark:shadow-orange-900/50'
                  : 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-200 dark:shadow-green-900/50'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {option.label}
            <span className={`px-2 py-1 rounded-full text-xs font-bold min-w-[24px] text-center ${
              filter === option.value
                ? 'bg-white/20 text-white'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
            }`}>
              {option.count}
            </span>
          </button>
        ))}
      </div>

      {/* Sort and Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as TaskSort)}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 text-gray-800 dark:text-white transition-all duration-300 shadow-sm hover:shadow-md"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {categories.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 text-gray-800 dark:text-white transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};