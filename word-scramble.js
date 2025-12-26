// Wedding Word Scramble Game Logic

const words = [
    { word: "saptapadi", hint: "Seven sacred steps around the fire" },
    { word: "kanyadaan", hint: "Giving away of the bride by her father" },
    { word: "varmala", hint: "Exchange of garlands between bride and groom" },
    { word: "haldi", hint: "Turmeric ceremony before the wedding" },
    { word: "mehndi", hint: "Henna art applied to bride's hands and feet" },
    { word: "sangeet", hint: "Pre-wedding music and dance celebration" },
    { word: "baraat", hint: "Groom's wedding procession" },
    { word: "mandap", hint: "Sacred canopy where wedding ceremony takes place" },
    { word: "bidaai", hint: "Bride's emotional farewell from her family" },
    { word: "sindoor", hint: "Red vermillion powder in bride's hair parting" },
    { word: "mangalsutra", hint: "Sacred necklace tied by groom" },
    { word: "gathbandhan", hint: "Tying of the bride's and groom's garments" },
    { word: "havan", hint: "Sacred fire ceremony" },
    { word: "pheras", hint: "Circling the sacred fire" },
    { word: "ashirwad", hint: "Blessings from elders" },
    { word: "madhuparka", hint: "Welcoming drink of honey and yogurt" },
    { word: "muhurat", hint: "Auspicious time for the ceremony" },
    { word: "vidaai", hint: "Bride's departure from parental home" },
    { word: "jaimala", hint: "Another name for garland exchange" },
    { word: "grihapravesh", hint: "Bride's first entry into new home" },
    { word: "tilak", hint: "Ceremonial mark on the forehead" },
    { word: "shagun", hint: "Auspicious gifts and blessings" },
    { word: "chooda", hint: "Bridal bangles worn by Punjabi brides" },
    { word: "kalash", hint: "Sacred pot used in ceremonies" },
    { word: "aarti", hint: "Ritual of waving lighted lamps" }
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
    hintEl.textContent = `💡 Hint: ${currentWord.hint}`;
    
    // Clear input and feedback
    guessInput.value = '';
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
    guessInput.focus();
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
