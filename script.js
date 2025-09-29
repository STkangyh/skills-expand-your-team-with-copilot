// Team Task Manager - JavaScript Implementation
// Demonstrates GitHub Copilot assistance in writing interactive functionality

class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.taskCounter = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
        this.initializeEventListeners();
        this.renderTasks();
        this.updateStats();
    }

    // Load tasks from localStorage
    loadTasks() {
        const savedTasks = localStorage.getItem('teamTasks');
        return savedTasks ? JSON.parse(savedTasks) : this.getDefaultTasks();
    }

    // Save tasks to localStorage
    saveTasks() {
        localStorage.setItem('teamTasks', JSON.stringify(this.tasks));
    }

    // Get default sample tasks to demonstrate the application
    getDefaultTasks() {
        return [
            {
                id: 1,
                text: 'Set up project repository with GitHub Copilot',
                priority: 'high',
                completed: true,
                createdAt: new Date('2024-01-15T10:00:00')
            },
            {
                id: 2,
                text: 'Design user interface with AI assistance',
                priority: 'medium',
                completed: true,
                createdAt: new Date('2024-01-15T11:30:00')
            },
            {
                id: 3,
                text: 'Implement task management functionality',
                priority: 'high',
                completed: false,
                createdAt: new Date('2024-01-15T14:00:00')
            },
            {
                id: 4,
                text: 'Add responsive design features',
                priority: 'medium',
                completed: false,
                createdAt: new Date('2024-01-15T15:30:00')
            },
            {
                id: 5,
                text: 'Write documentation and examples',
                priority: 'low',
                completed: false,
                createdAt: new Date('2024-01-15T16:00:00')
            }
        ];
    }

    // Initialize event listeners
    initializeEventListeners() {
        // Task form submission
        const taskForm = document.getElementById('taskForm');
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Allow Enter key to submit
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });
    }

    // Add a new task
    addTask() {
        const taskInput = document.getElementById('taskInput');
        const prioritySelect = document.getElementById('prioritySelect');
        
        const taskText = taskInput.value.trim();
        if (!taskText) return;

        const newTask = {
            id: this.taskCounter++,
            text: taskText,
            priority: prioritySelect.value,
            completed: false,
            createdAt: new Date()
        };

        this.tasks.unshift(newTask); // Add to beginning of array
        this.saveTasks();
        this.renderTasks();
        this.updateStats();

        // Clear the form
        taskInput.value = '';
        prioritySelect.value = 'low';
        taskInput.focus();

        // Show success feedback
        this.showNotification('Task added successfully!', 'success');
    }

    // Toggle task completion status
    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            
            const status = task.completed ? 'completed' : 'reopened';
            this.showNotification(`Task ${status}!`, 'info');
        }
    }

    // Delete a task
    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.showNotification('Task deleted!', 'warning');
        }
    }

    // Set the current filter
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.renderTasks();
    }

    // Get filtered tasks based on current filter
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'completed':
                return this.tasks.filter(task => task.completed);
            case 'pending':
                return this.tasks.filter(task => !task.completed);
            default:
                return this.tasks;
        }
    }

    // Render tasks to the DOM
    renderTasks() {
        const taskList = document.getElementById('taskList');
        const filteredTasks = this.getFilteredTasks();

        if (filteredTasks.length === 0) {
            taskList.innerHTML = `
                <li class="task-item" style="text-align: center; border-left: none; background: #f9f9f9;">
                    <span style="color: #666; font-style: italic;">
                        ${this.currentFilter === 'all' ? 'No tasks yet. Add one above!' : `No ${this.currentFilter} tasks.`}
                    </span>
                </li>
            `;
            return;
        }

        taskList.innerHTML = filteredTasks.map(task => `
            <li class="task-item ${task.completed ? 'completed' : ''} ${task.priority}-priority">
                <div class="task-content">
                    <span class="task-text">${this.escapeHtml(task.text)}</span>
                    <span class="priority-badge priority-${task.priority}">${task.priority}</span>
                </div>
                <div class="task-actions">
                    <button class="complete-btn" onclick="taskManager.toggleTask(${task.id})" 
                            title="${task.completed ? 'Mark as pending' : 'Mark as complete'}">
                        ${task.completed ? '↩️' : '✅'}
                    </button>
                    <button class="delete-btn" onclick="taskManager.deleteTask(${task.id})" 
                            title="Delete task">
                        🗑️
                    </button>
                </div>
            </li>
        `).join('');
    }

    // Update statistics display
    updateStats() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(task => task.completed).length;
        const pendingTasks = totalTasks - completedTasks;
        const productivityRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        document.getElementById('totalTasks').textContent = totalTasks;
        document.getElementById('completedTasks').textContent = completedTasks;
        document.getElementById('pendingTasks').textContent = pendingTasks;
        document.getElementById('productivityRate').textContent = `${productivityRate}%`;
    }

    // Escape HTML to prevent XSS attacks
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Show notification to user
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#48bb78' : type === 'warning' ? '#ed8936' : '#4299e1'};
            color: white;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 1000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Animate out and remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Clear all completed tasks
    clearCompleted() {
        const completedCount = this.tasks.filter(task => task.completed).length;
        if (completedCount === 0) {
            this.showNotification('No completed tasks to clear!', 'info');
            return;
        }

        if (confirm(`Are you sure you want to delete ${completedCount} completed task${completedCount > 1 ? 's' : ''}?`)) {
            this.tasks = this.tasks.filter(task => !task.completed);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.showNotification(`Cleared ${completedCount} completed task${completedCount > 1 ? 's' : ''}!`, 'success');
        }
    }

    // Export tasks as JSON
    exportTasks() {
        const dataStr = JSON.stringify(this.tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'team-tasks.json';
        link.click();
        
        this.showNotification('Tasks exported successfully!', 'success');
    }
}

// Initialize the task manager when the page loads
let taskManager;

document.addEventListener('DOMContentLoaded', () => {
    taskManager = new TaskManager();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter to add task quickly
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            document.getElementById('taskInput').focus();
        }
        
        // Escape to clear task input
        if (e.key === 'Escape') {
            const taskInput = document.getElementById('taskInput');
            taskInput.value = '';
            taskInput.blur();
        }
    });
});

// Make functions available globally for onclick handlers
window.taskManager = taskManager;