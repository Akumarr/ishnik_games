// Photo Scavenger Hunt Game Logic

const scavengerItems = [
    { id: 1, description: "Nikhil busting out the finger guns (his signature move) at the Bhaart", icon: "👉👉" },
    { id: 2, description: "A guest shedding a happy tear", icon: "😢" },
    { id: 3, description: "Someone catching some zz's during the ceremony", icon: "😴" },
    { id: 4, description: "A close-up of henna/mehendi", icon: "🎨" },
    { id: 5, description: "Ishanee bawling", icon: "😭" },
    { id: 6, description: "A unique pair of wedding shoes", icon: "👠" },
    { id: 7, description: "The couple smiling at each other", icon: "💕" }
];

// DOM Elements
const scavengerListEl = document.getElementById('scavenger-list');
const completedCountEl = document.getElementById('completed-count');
const totalCountEl = document.getElementById('total-count');
const progressFillEl = document.getElementById('progress-fill');
const resetBtn = document.getElementById('reset-btn');

// Load saved progress from localStorage
let completedItems = JSON.parse(localStorage.getItem('scavengerProgress')) || [];

// Initialize game
function init() {
    totalCountEl.textContent = scavengerItems.length;
    renderScavengerList();
    updateProgress();
    
    resetBtn.addEventListener('click', resetProgress);
}

// Render the scavenger hunt list
function renderScavengerList() {
    scavengerListEl.innerHTML = '';
    
    scavengerItems.forEach(item => {
        const isCompleted = completedItems.includes(item.id);
        
        const itemDiv = document.createElement('div');
        itemDiv.className = `scavenger-item ${isCompleted ? 'completed' : ''}`;
        itemDiv.innerHTML = `
            <div class="scavenger-icon">${item.icon}</div>
            <div class="scavenger-content">
                <div class="scavenger-description">${item.description}</div>
            </div>
            <div class="scavenger-checkbox">
                <input type="checkbox" id="item-${item.id}" ${isCompleted ? 'checked' : ''}>
                <label for="item-${item.id}" class="checkbox-label">
                    <span class="checkmark">${isCompleted ? '✓' : ''}</span>
                </label>
            </div>
        `;
        
        // Add event listener for checkbox
        const checkbox = itemDiv.querySelector(`#item-${item.id}`);
        checkbox.addEventListener('change', () => toggleItem(item.id));
        
        scavengerListEl.appendChild(itemDiv);
    });
}

// Toggle item completion
function toggleItem(itemId) {
    if (completedItems.includes(itemId)) {
        completedItems = completedItems.filter(id => id !== itemId);
    } else {
        completedItems.push(itemId);
        celebrateCapture();
    }
    
    saveProgress();
    renderScavengerList();
    updateProgress();
}

// Update progress bar and count
function updateProgress() {
    const completedCount = completedItems.length;
    const percentage = (completedCount / scavengerItems.length) * 100;
    
    completedCountEl.textContent = completedCount;
    progressFillEl.style.width = `${percentage}%`;
    
    // Check if all completed
    if (completedCount === scavengerItems.length) {
        celebrateCompletion();
    }
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('scavengerProgress', JSON.stringify(completedItems));
}

// Reset all progress
function resetProgress() {
    if (confirm('Are you sure you want to reset all captured moments?')) {
        completedItems = [];
        saveProgress();
        renderScavengerList();
        updateProgress();
    }
}

// Celebrate capturing a moment
function celebrateCapture() {
    // Add a subtle animation or feedback
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.animation = 'none';
    setTimeout(() => {
        progressBar.style.animation = 'pulse 0.5s ease-in-out';
    }, 10);
}

// Celebrate completion
function celebrateCompletion() {
    setTimeout(() => {
        alert('🎉 Congratulations! You\'ve captured all the special moments! 📸');
    }, 500);
}

// Start the game
init();
