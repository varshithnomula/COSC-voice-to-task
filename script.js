document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const micBtn = document.getElementById('mic-btn');
    const statusElement = document.getElementById('status');
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    
    // Check if browser supports SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition;
    
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        
        // Initialize speech recognition
        micBtn.addEventListener('click', toggleSpeechRecognition);
        
        // Speech recognition events
        recognition.onstart = () => {
            micBtn.classList.add('listening');
            statusElement.textContent = 'Listening... Speak now';
        };
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.trim();
            taskInput.value = transcript;
            statusElement.textContent = `I heard: "${transcript}"`;
            
            // Automatically add the task after a short delay
            setTimeout(() => {
                addTask();
            }, 1000);
        };
        
        recognition.onerror = (event) => {
            micBtn.classList.remove('listening');
            statusElement.textContent = `Error occurred: ${event.error}`;
        };
        
        recognition.onend = () => {
            micBtn.classList.remove('listening');
        };
    } else {
        micBtn.style.display = 'none';
        statusElement.textContent = 'Speech recognition is not supported by your browser.';
    }
    
    // Add task button event
    addBtn.addEventListener('click', addTask);
    
    // Add task on Enter key press
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Toggle speech recognition
    function toggleSpeechRecognition() {
        if (micBtn.classList.contains('listening')) {
            recognition.stop();
        } else {
            recognition.start();
        }
    }
    
    // Add task function
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText !== '') {
            // Create task item
            createTaskElement(taskText);
            
            // Clear input
            taskInput.value = '';
            statusElement.textContent = 'Task added successfully';
            
            // Save tasks to local storage
            saveTasks();
        }
    }
    
    // Create task element
    function createTaskElement(text) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        
        const taskTextSpan = document.createElement('span');
        taskTextSpan.className = 'task-text';
        taskTextSpan.textContent = text;
        
        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';
        
        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete-btn';
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
        completeBtn.title = 'Mark as completed';
        completeBtn.addEventListener('click', () => {
            taskTextSpan.classList.toggle('completed');
            saveTasks();
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.title = 'Delete task';
        deleteBtn.addEventListener('click', () => {
            taskItem.remove();
            saveTasks();
        });
        
        taskActions.appendChild(completeBtn);
        taskActions.appendChild(deleteBtn);
        
        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(taskActions);
        
        taskList.appendChild(taskItem);
    }
    
    // Save tasks to local storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(item => {
            const taskText = item.querySelector('.task-text').textContent;
            const isCompleted = item.querySelector('.task-text').classList.contains('completed');
            tasks.push({ text: taskText, completed: isCompleted });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Load tasks from local storage
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            tasks.forEach(task => {
                createTaskElement(task.text);
                if (task.completed) {
                    const lastTask = taskList.lastElementChild;
                    lastTask.querySelector('.task-text').classList.add('completed');
                }
            });
        }
    }
    
    // Load saved tasks when page loads
    loadTasks();
});