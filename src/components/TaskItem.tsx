import React, { useState } from 'react';
import { 
  Check, 
  Edit, 
  Trash2, 
  Calendar, 
  Flag, 
  Tag, 
  Clock,
  MoreHorizontal
} from 'lucide-react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onEditTask,
  onDeleteTask
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleDelete = () => {
    onDeleteTask(task.id);
    setShowDeleteConfirm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    medium: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
    high: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
  };

  return (
    <>
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] ${
        task.completed 
          ? 'border-green-200 dark:border-green-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 opacity-75' 
          : isOverdue 
            ? 'border-red-200 dark:border-red-700 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20'
            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-gradient-to-r from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-900/10'
      }`}>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <button
              onClick={() => onToggleComplete(task.id)}
              className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                task.completed
                  ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-200 dark:shadow-green-900/50'
                  : 'border-gray-300 dark:border-gray-600 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 hover:shadow-md'
              }`}
            >
              {task.completed && <Check className="w-4 h-4" />}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold transition-all duration-300 ${
                    task.completed 
                      ? 'text-gray-500 dark:text-gray-400 line-through' 
                      : 'text-gray-800 dark:text-white'
                  }`}>
                    {task.title}
                  </h3>
                  
                  {task.description && (
                    <p className={`text-sm mt-2 leading-relaxed ${
                      task.completed 
                        ? 'text-gray-400 dark:text-gray-500 line-through' 
                        : 'text-gray-600 dark:text-gray-300'
                    }`}>
                      {task.description}
                    </p>
                  )}
                </div>

                <div className="relative ml-4">
                  <button
                    onClick={() => setShowActions(!showActions)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>

                  {showActions && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setShowActions(false)}
                      />
                      <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-700 rounded-xl shadow-xl border border-gray-200 dark:border-gray-600 z-20 overflow-hidden">
                        <button
                          onClick={() => {
                            onEditTask(task);
                            setShowActions(false);
                          }}
                          className="w-full px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center gap-3 transition-colors"
                        >
                          <Edit className="w-4 h-4 text-blue-500" />
                          Edit Task
                        </button>
                        <button
                          onClick={() => {
                            setShowDeleteConfirm(true);
                            setShowActions(false);
                          }}
                          className="w-full px-4 py-3 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Task
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-2 mt-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
                  <Flag className="w-3 h-3 inline mr-1" />
                  {task.priority.toUpperCase()}
                </span>

                {task.category && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 rounded-full text-xs font-medium border border-purple-200 dark:border-purple-800">
                    <Tag className="w-3 h-3 inline mr-1" />
                    {task.category}
                  </span>
                )}

                {task.dueDate && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    isOverdue 
                      ? 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800' 
                      : 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
                  }`}>
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {formatDate(task.dueDate)}
                    {isOverdue && ' (Overdue)'}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Created {formatDate(task.createdAt)}
                </span>
                {task.updatedAt !== task.createdAt && (
                  <span>Updated {formatDate(task.updatedAt)}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700 animate-in zoom-in-95 duration-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Delete Task
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Are you sure you want to delete <strong>"{task.title}"</strong>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-red-200 dark:hover:shadow-red-900/50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};