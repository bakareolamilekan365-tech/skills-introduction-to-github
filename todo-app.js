// Todo Check up App with Notifications
// Local storage key
const STORAGE_KEY = 'todoCheckupApp';

// State
let todos = [];
let currentFilter = 'all';

// DOM elements
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
const todoStats = document.getElementById('todoStats');
const clearCompletedBtn = document.getElementById('clearCompleted');
const filterBtns = document.querySelectorAll('.filter-btn');
const enableNotificationsBtn = document.getElementById('enableNotifications');
const notificationStatus = document.getElementById('notificationStatus');

// Initialize app
function init() {
    loadTodos();
    setupEventListeners();
    checkNotificationPermission();
    renderTodos();
    updateStats();
}

// Setup event listeners
function setupEventListeners() {
    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    clearCompletedBtn.addEventListener('click', clearCompleted);
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentFilter = e.target.dataset.filter;
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderTodos();
        });
    });

    enableNotificationsBtn.addEventListener('click', requestNotificationPermission);
}

// Load todos from local storage
function loadTodos() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        todos = JSON.parse(stored);
    }
}

// Save todos to local storage
function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// Add new todo
function addTodo() {
    const text = todoInput.value.trim();
    
    if (text === '') {
        showInlineMessage('Please enter a todo item!');
        return;
    }

    const todo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };

    todos.push(todo);
    saveTodos();
    renderTodos();
    updateStats();
    
    todoInput.value = '';
    todoInput.focus();

    // Send notification for new todo
    sendNotification('New Todo Added', `"${text}" has been added to your list!`);
}

// Delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
    updateStats();
    
    sendNotification('Todo Deleted', 'A todo item has been removed from your list.');
}

// Toggle todo completion
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
        updateStats();
        
        if (todo.completed) {
            sendNotification('Todo Completed! 🎉', `"${todo.text}" has been marked as complete!`);
        }
    }
}

// Clear completed todos
function clearCompleted() {
    const completedCount = todos.filter(t => t.completed).length;
    
    if (completedCount === 0) {
        showInlineMessage('No completed todos to clear!');
        return;
    }

    // Use inline confirmation instead of blocking confirm dialog
    showClearConfirmation(completedCount);
}

// Show confirmation for clearing completed todos
function showClearConfirmation(completedCount) {
    const existingConfirm = document.querySelector('.confirm-dialog');
    if (existingConfirm) {
        existingConfirm.remove();
    }
    
    const confirmEl = document.createElement('div');
    confirmEl.className = 'confirm-dialog';
    confirmEl.innerHTML = `
        <div class="confirm-content">
            <p>Clear ${completedCount} completed todo(s)?</p>
            <div class="confirm-buttons">
                <button class="btn-confirm-yes">Yes, Clear</button>
                <button class="btn-confirm-no">Cancel</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(confirmEl);
    
    // Handle yes button
    confirmEl.querySelector('.btn-confirm-yes').addEventListener('click', () => {
        todos = todos.filter(todo => !todo.completed);
        saveTodos();
        renderTodos();
        updateStats();
        confirmEl.remove();
        
        sendNotification('Todos Cleared', `${completedCount} completed todo(s) have been removed.`);
    });
    
    // Handle no button
    confirmEl.querySelector('.btn-confirm-no').addEventListener('click', () => {
        confirmEl.remove();
    });
    
    // Close on outside click
    confirmEl.addEventListener('click', (e) => {
        if (e.target === confirmEl) {
            confirmEl.remove();
        }
    });
}

// Get filtered todos
function getFilteredTodos() {
    switch (currentFilter) {
        case 'active':
            return todos.filter(todo => !todo.completed);
        case 'completed':
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
}

// Render todos
function renderTodos() {
    const filteredTodos = getFilteredTodos();
    
    if (filteredTodos.length === 0) {
        todoList.innerHTML = '<li style="text-align: center; padding: 20px; color: #999;">No todos to display</li>';
        return;
    }

    todoList.innerHTML = filteredTodos.map(todo => {
        const createdDate = new Date(todo.createdAt);
        const timeString = createdDate.toLocaleString();
        
        return `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <input 
                    type="checkbox" 
                    class="todo-checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    onchange="toggleTodo(${todo.id})"
                >
                <span class="todo-text">${escapeHtml(todo.text)}</span>
                <span class="todo-time">${timeString}</span>
                <button class="btn-delete" onclick="deleteTodo(${todo.id})">Delete</button>
            </li>
        `;
    }).join('');
}

// Update statistics
function updateStats() {
    const activeCount = todos.filter(todo => !todo.completed).length;
    const totalCount = todos.length;
    todoStats.textContent = `${activeCount} of ${totalCount} items left`;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show inline message (non-blocking alternative to alert)
function showInlineMessage(message) {
    const existingMessage = document.querySelector('.inline-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageEl = document.createElement('div');
    messageEl.className = 'inline-message';
    messageEl.textContent = message;
    
    const inputSection = document.querySelector('.input-section');
    inputSection.parentNode.insertBefore(messageEl, inputSection.nextSibling);
    
    setTimeout(() => {
        messageEl.classList.add('fade-out');
        setTimeout(() => messageEl.remove(), 300);
    }, 3000);
}

// Check notification permission status
function checkNotificationPermission() {
    if (!('Notification' in window)) {
        notificationStatus.textContent = 'Notifications not supported';
        enableNotificationsBtn.disabled = true;
        return;
    }

    updateNotificationStatus();
}

// Update notification status display
function updateNotificationStatus() {
    const permission = Notification.permission;
    
    switch (permission) {
        case 'granted':
            notificationStatus.textContent = '✅ Notifications enabled';
            enableNotificationsBtn.textContent = '🔔 Notifications Enabled';
            enableNotificationsBtn.disabled = true;
            break;
        case 'denied':
            notificationStatus.textContent = '❌ Notifications blocked';
            enableNotificationsBtn.disabled = true;
            break;
        default:
            notificationStatus.textContent = 'Click to enable notifications';
            break;
    }
}

// Request notification permission
function requestNotificationPermission() {
    if (!('Notification' in window)) {
        showInlineMessage('This browser does not support notifications');
        return;
    }

    Notification.requestPermission().then(permission => {
        updateNotificationStatus();
        
        if (permission === 'granted') {
            sendNotification('Notifications Enabled! 🔔', 'You will now receive updates for your todos!');
        }
    });
}

// Send notification
function sendNotification(title, body) {
    if (!('Notification' in window)) {
        return;
    }

    if (Notification.permission === 'granted') {
        const notification = new Notification(title, {
            body: body,
            icon: '📝',
            badge: '📝',
            tag: 'todo-checkup',
            requireInteraction: false
        });

        // Auto-close notification after 5 seconds
        setTimeout(() => {
            notification.close();
        }, 5000);
    }
}

// Periodic check-up notification (every 30 minutes)
function setupPeriodicCheckup() {
    // Delay first check-up by 30 minutes to avoid immediate notification
    setTimeout(() => {
        // Send first check-up
        const activeCount = todos.filter(todo => !todo.completed).length;
        if (activeCount > 0) {
            sendNotification(
                'Todo Check-up Reminder ⏰',
                `You have ${activeCount} todo(s) waiting to be completed!`
            );
        }
        
        // Then set up recurring check-ups
        setInterval(() => {
            const activeCount = todos.filter(todo => !todo.completed).length;
            
            if (activeCount > 0) {
                sendNotification(
                    'Todo Check-up Reminder ⏰',
                    `You have ${activeCount} todo(s) waiting to be completed!`
                );
            }
        }, 30 * 60 * 1000); // 30 minutes
    }, 30 * 60 * 1000); // Initial 30 minute delay
}

// Initialize the app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Setup periodic check-up notifications
setupPeriodicCheckup();
