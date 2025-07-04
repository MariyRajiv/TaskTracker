# 📝 Personal Task Tracker

A beautiful, feature-rich task management application built with React.js and TypeScript. This application provides a clean, intuitive interface for managing your daily tasks with advanced filtering, search capabilities, and a stunning dark/light mode toggle.

![Task Tracker Preview](https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Features

### 🔐 **Simple Authentication**
- Username-based login (no password required)
- Persistent login state using localStorage
- Welcome dashboard with personalized greeting

### 📋 **Task Management**
- ✅ **Create Tasks**: Add tasks with title, description, due date, priority, and category
- ✏️ **Edit Tasks**: Inline editing with pre-filled forms
- 🗑️ **Delete Tasks**: Beautiful confirmation modal with backdrop blur
- ✔️ **Toggle Status**: Mark tasks as complete/pending with smooth animations
- 🏷️ **Categories**: Organize tasks with custom categories
- 🚩 **Priority Levels**: Low, Medium, High priority with color coding
- 📅 **Due Dates**: Set and track task deadlines with overdue indicators

### 🔍 **Advanced Filtering & Search**
- 🔎 **Smart Search**: Search by title, description, or category
- 📊 **Filter Tabs**: All Tasks, Pending, Completed with live counts
- 🔄 **Sorting Options**: Sort by creation date, title, due date, or priority
- 📂 **Category Filter**: Filter tasks by specific categories
- 📈 **Search Results**: Real-time search results counter

### 🎨 **Beautiful UI/UX**
- 🌙 **Dark/Light Mode**: Stunning gradient backgrounds with smooth transitions
- 📱 **Responsive Design**: Perfect on mobile, tablet, and desktop
- ✨ **Animations**: Smooth hover effects, transitions, and micro-interactions
- 🎯 **Visual Feedback**: Clear distinction between completed, pending, and overdue tasks
- 🌈 **Color-Coded**: Priority levels and task states with beautiful gradients

### 💾 **Data Persistence**
- 🔄 **Auto-Save**: All tasks automatically saved to localStorage
- 🔒 **Persistent State**: Tasks, user data, and theme preferences persist across sessions
- 📊 **Real-time Updates**: Instant UI updates with data synchronization

## 🏗️ Project Structure

```
task-tracker/
├── src/
│   ├── components/           # React Components
│   │   ├── Header.tsx       # App header with user info and controls
│   │   ├── Login.tsx        # Authentication component
│   │   ├── TaskForm.tsx     # Task creation and editing form
│   │   ├── TaskItem.tsx     # Individual task display component
│   │   ├── TaskList.tsx     # Task list with stats and empty states
│   │   └── TaskFilter.tsx   # Search, filter, and sort controls
│   ├── types/               # TypeScript Type Definitions
│   │   └── Task.ts         # Task, User, and Filter type definitions
│   ├── utils/               # Utility Functions
│   │   └── localStorage.ts  # Local storage management functions
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   ├── index.css           # Global styles and Tailwind imports
│   └── vite-env.d.ts       # Vite environment types
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🛠️ Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Hooks (useState, useEffect, useMemo)
- **Data Persistence**: Browser localStorage
- **Development**: ESLint for code quality

## 📱 Key Components

### 🔑 **Login Component**
- Beautiful gradient background
- Username input with validation
- Loading animation and smooth transitions
- Automatic redirect to dashboard

### 📝 **TaskForm Component**
- Expandable form with smooth animations
- All task properties (title, description, due date, priority, category)
- Edit mode with pre-filled data
- Real-time priority preview

### 🎯 **TaskItem Component**
- Visual status indicators (completed, pending, overdue)
- Priority and category badges
- Action menu with edit/delete options
- Beautiful confirmation modal for deletions
- Hover effects and micro-interactions

### 🔍 **TaskFilter Component**
- Real-time search with instant results
- Filter tabs with task counts
- Sort dropdown with multiple options
- Category filter (when categories exist)
- Search results feedback

### 📊 **TaskList Component**
- Statistics cards (pending, completed, overdue)
- Empty state with helpful messaging
- Responsive grid layout
- Smooth animations for task updates

## 🎨 Design Features

### 🌈 **Color System**
- **Light Mode**: Blue to purple gradient backgrounds
- **Dark Mode**: Gray gradient with blue accents
- **Priority Colors**: Blue (low), Orange (medium), Red (high)
- **Status Colors**: Green (completed), Red (overdue), Blue (pending)

### ✨ **Animations**
- Smooth transitions (300-500ms duration)
- Hover scale effects (1.02x - 1.1x)
- Fade-in animations for modals
- Loading spinners and micro-interactions

### 📱 **Responsive Design**
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly buttons and interactions
- Optimized for all screen sizes

## 💡 Usage Tips

1. **Quick Task Creation**: Click the "Add New Task" button for instant task creation
2. **Smart Search**: Use the search bar to find tasks by any text content
3. **Priority Management**: Use color-coded priority levels to organize importance
4. **Category Organization**: Create categories to group related tasks
5. **Dark Mode**: Toggle between light and dark themes for comfortable viewing
6. **Due Date Tracking**: Set due dates to track deadlines and identify overdue tasks

## 🔮 Future Enhancements

- 📊 Task analytics and productivity insights
- 🔄 Task templates for recurring activities
- 📎 File attachments for tasks
- 🔔 Browser notifications for due dates
- 📤 Export/import functionality
- 👥 Collaboration features
- 🌐 Cloud synchronization


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---
