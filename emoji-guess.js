// Guess the Ritual - Hindu Wedding Rituals Game Logic

const emojiQuestions = [
    { emoji: "🔥👣👣👣", answer: "Saptapadi", options: ["Saptapadi", "Kanyadaan", "Sindoor", "Mangalsutra"], wordMeaning: "'Sapta' means seven, 'Padi' means steps", meaning: "Seven sacred steps around the holy fire, each representing a vow for a blessed marriage." },
    { emoji: "💐➡️💐", answer: "Varmala", options: ["Varmala", "Mehndi", "Baraat", "Bidaai"], wordMeaning: "'Var' means groom, 'Mala' means garland", meaning: "The exchange of floral garlands between bride and groom, symbolizing acceptance and respect." },
    { emoji: "🧣🔗", answer: "Gathbandhan", options: ["Gathbandhan", "Saptapadi", "Haldi", "Pheras"], wordMeaning: "'Gath' means knot, 'Bandhan' means bond/tie", meaning: "Tying the bride's and groom's garments together, symbolizing their eternal bond and union." },
    { emoji: "🧎‍♂️🌸👋", answer: "Kanyadaan", options: ["Kanyadaan", "Varmala", "Aarti", "Ashirwad"], wordMeaning: "'Kanya' means daughter/maiden, 'Daan' means gift/donation", meaning: "The bride's father gives away his daughter to the groom, entrusting her care to him." },
    { emoji: "📿❤️💫", answer: "Mangalsutra", options: ["Mangalsutra", "Sindoor", "Maang Tikka", "Chooda"], wordMeaning: "'Mangal' means auspicious, 'Sutra' means thread/string", meaning: "A sacred necklace tied by the groom around the bride's neck, symbolizing their marital bond." },
    { emoji: "🎶💃🕺", answer: "Sangeet", options: ["Sangeet", "Mehndi", "Havan", "Shagun"], wordMeaning: "'Sangeet' means music/musical gathering", meaning: "A pre-wedding celebration filled with music, dance, and joyful festivities with family and friends." },
];

let currentQuestion = {};
let score = 0;
let streak = 0;
let usedQuestions = [];

// DOM Elements
const emojiDisplayEl = document.getElementById('emoji-display');
const questionEl = document.getElementById('question');
const optionsGridEl = document.getElementById('options-grid');
const scoreEl = document.getElementById('score');
const streakEl = document.getElementById('streak');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const newGameBtn = document.getElementById('new-game-btn');

// Initialize game
function init() {
    score = 0;
    streak = 0;
    usedQuestions = [];
    updateDisplay();
    loadNewQuestion();
    
    // Event listeners
    nextBtn.addEventListener('click', loadNewQuestion);
    newGameBtn.addEventListener('click', init);
}

// Load a new question
function loadNewQuestion() {
    // Hide next button
    nextBtn.style.display = 'none';
    
    // Filter out used questions
    const availableQuestions = emojiQuestions.filter(q => !usedQuestions.includes(q.answer));
    
    if (availableQuestions.length === 0) {
        showFeedback(`🎉 Game Complete! Final Score: ${score}`, "success");
        emojiDisplayEl.textContent = "🏁";
        questionEl.textContent = "You've answered all questions!";
        optionsGridEl.innerHTML = '';
        return;
    }
    
    // Select random question
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[randomIndex];
    
    // Display emoji and question
    emojiDisplayEl.textContent = currentQuestion.emoji;
    questionEl.textContent = "What is this Hindu wedding ritual?";
    
    // Display options
    displayOptions();
    
    // Clear feedback
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
}

// Display answer options
function displayOptions() {
    optionsGridEl.innerHTML = '';
    
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option, button));
        optionsGridEl.appendChild(button);
    });
}

// Check answer
function checkAnswer(selectedOption, button) {
    // Disable all buttons
    const allButtons = optionsGridEl.querySelectorAll('.option-button');
    allButtons.forEach(btn => btn.disabled = true);
    
    if (selectedOption === currentQuestion.answer) {
        button.classList.add('correct');
        score += 10;
        streak++;
        updateDisplay();
        
        // Show meaning after correct answer
        const meaningText = `✅ Correct!\n\n📖 ${currentQuestion.wordMeaning}\n\n${currentQuestion.meaning}`;
        showFeedback(meaningText, "success");
        
        // Add bonus points for streak
        if (streak >= 5) {
            score += 5;
            const streakText = `✅ Correct! 🔥 ${streak} streak bonus! +5 points\n\n📖 ${currentQuestion.wordMeaning}\n\n${currentQuestion.meaning}`;
            showFeedback(streakText, "success");
            updateDisplay();
        }
    } else {
        button.classList.add('incorrect');
        // Highlight correct answer
        allButtons.forEach(btn => {
            if (btn.textContent === currentQuestion.answer) {
                btn.classList.add('correct');
            }
        });
        streak = 0;
        updateDisplay();
        
        // Show meaning after wrong answer
        const wrongText = `❌ Wrong! The correct answer was: ${currentQuestion.answer}\n\n📖 ${currentQuestion.wordMeaning}\n\n${currentQuestion.meaning}`;
        showFeedback(wrongText, "error");
    }
    
    // Mark question as used
    usedQuestions.push(currentQuestion.answer);
    
    // Show next button
    nextBtn.style.display = 'block';
}

// Show feedback
function showFeedback(message, type) {
    feedbackEl.textContent = message;
    feedbackEl.className = `feedback ${type}`;
}

// Update display
function updateDisplay() {
    scoreEl.textContent = score;
    streakEl.textContent = streak;
}

// Start the game
init();
