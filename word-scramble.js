// Wedding Word Scramble Game Logic

const words = [
    { word: "kanyadaan", hint: "The gift of trust - families offer blessings as couple joins hands" },
    { word: "baraat", hint: "Celebratory arrival procession with music and dance" },
    { word: "mangalsutra", hint: "Sacred necklace symbolizing love and protection" },
    { word: "pheras", hint: "Walking around the sacred fire, each round representing a vow" },
    { word: "kashiyatra", hint: "Playful renunciation where groom is persuaded to embrace married life" }
];

let currentWord = {};
let score = 0;
let level = 1;
let usedWords = [];

// DOM Elements
const scrambledWordEl = document.getElementById('scrambled-word');
const hintEl = document.getElementById('hint');
const guessInput = document.getElementById('guess-input');
const submitBtn = document.getElementById('submit-btn');
const skipBtn = document.getElementById('skip-btn');
const newGameBtn = document.getElementById('new-game-btn');
const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');
const feedbackEl = document.getElementById('feedback');

// Initialize game
function init() {
    score = 0;
    level = 1;
    usedWords = [];
    updateDisplay();
    loadNewWord();
    
    // Event listeners
    submitBtn.addEventListener('click', checkAnswer);
    skipBtn.addEventListener('click', skipWord);
    newGameBtn.addEventListener('click', init);
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
}

// Scramble a word
function scrambleWord(word) {
    let scrambled = word.split('');
    for (let i = scrambled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [scrambled[i], scrambled[j]] = [scrambled[j], scrambled[i]];
    }
    // Make sure scrambled word is different from original
    let scrambledStr = scrambled.join('');
    if (scrambledStr === word && word.length > 1) {
        return scrambleWord(word);
    }
    return scrambledStr;
}

// Load a new word
function loadNewWord() {
    // Filter out used words
    const availableWords = words.filter(w => !usedWords.includes(w.word));
    
    if (availableWords.length === 0) {
        showFeedback("🎉 Congratulations! You've completed all words!", "success");
        usedWords = [];
        return;
    }
    
    // Select random word
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    currentWord = availableWords[randomIndex];
    
    // Display scrambled word
    scrambledWordEl.textContent = scrambleWord(currentWord.word).toUpperCase();
    hintEl.textContent = `💡 Hint (phoneticized English spelling): ${currentWord.hint}`;
    
    // Clear input and feedback
    guessInput.value = '';
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
    guessInput.focus();
}

// Calculate Levenshtein distance for spelling leniency
function getLevenshteinDistance(a, b) {
    const matrix = [];
    
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    
    return matrix[b.length][a.length];
}

// Check if spelling is close enough (allow 1-2 character differences based on word length)
function isSpellingCloseEnough(userGuess, correctWord) {
    const distance = getLevenshteinDistance(userGuess, correctWord);
    const threshold = correctWord.length <= 6 ? 1 : 2; // Allow 1 mistake for short words, 2 for longer
    return distance <= threshold;
}

// Check answer
function checkAnswer() {
    const userGuess = guessInput.value.trim().toLowerCase();
    
    if (!userGuess) {
        showFeedback("Please enter a word!", "error");
        return;
    }
    
    if (userGuess === currentWord.word) {
        score += 10;
        level++;
        usedWords.push(currentWord.word);
        updateDisplay();
        showFeedback("✅ Correct! Well done!", "success");
        setTimeout(loadNewWord, 1500);
    } else if (isSpellingCloseEnough(userGuess, currentWord.word)) {
        score += 10;
        level++;
        usedWords.push(currentWord.word);
        updateDisplay();
        showFeedback(`✅ Close enough! The exact spelling is: ${currentWord.word.toUpperCase()}`, "success");
        setTimeout(loadNewWord, 1500);
    } else {
        showFeedback("❌ Incorrect! Try again.", "error");
    }
}

// Skip word
function skipWord() {
    showFeedback(`The word was: ${currentWord.word.toUpperCase()}`, "info");
    usedWords.push(currentWord.word);
    setTimeout(loadNewWord, 2000);
}

// Show feedback
function showFeedback(message, type) {
    feedbackEl.textContent = message;
    feedbackEl.className = `feedback ${type}`;
}

// Update display
function updateDisplay() {
    scoreEl.textContent = score;
    levelEl.textContent = level;
}

// Start the game
init();
