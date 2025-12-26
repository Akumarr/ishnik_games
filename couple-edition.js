// Who's Most Likely To? - Couple Edition Game Logic

const questions = [
    "Plan the honeymoon",
    "Start crying during a movie",
    "Forget an anniversary",
    "Burn the house down trying to cook a new recipe",
    "Fall asleep first",
    "Say 'I love you' first",
    "Hog all the blankets in the middle of the night"
];

let currentQuestionIndex = 0;
let partnerAScore = 0;
let partnerBScore = 0;
let partnerAName = "Nikhil";
let partnerBName = "Ishanee";
let answers = []; // Track all answers for poll counter

// DOM Elements
const questionTextEl = document.getElementById('question-text');
const questionNumEl = document.getElementById('question-num');
const totalQuestionsEl = document.getElementById('total-questions');
const partnerABtn = document.getElementById('partner-a-btn');
const partnerBBtn = document.getElementById('partner-b-btn');
const partnerAScoreEl = document.getElementById('partner-a-score');
const partnerBScoreEl = document.getElementById('partner-b-score');
const partnerALabelEl = document.getElementById('partner-a-label');
const partnerBLabelEl = document.getElementById('partner-b-label');
const partnerAChoiceLabelEl = document.getElementById('partner-a-choice-label');
const partnerBChoiceLabelEl = document.getElementById('partner-b-choice-label');
const questionCardEl = document.getElementById('question-card');
const resultsScreenEl = document.getElementById('results-screen');
const restartBtn = document.getElementById('restart-btn');
const finalPartnerANameEl = document.getElementById('final-partner-a-name');
const finalPartnerBNameEl = document.getElementById('final-partner-b-name');
const finalPartnerAScoreEl = document.getElementById('final-partner-a-score');
const finalPartnerBScoreEl = document.getElementById('final-partner-b-score');

// Initialize game
function init() {
    currentQuestionIndex = 0;
    partnerAScore = 0;
    partnerBScore = 0;
    answers = []; // Reset answers
    
    // Set total questions
    totalQuestionsEl.textContent = questions.length;
    
    // Event listeners (remove existing ones first to avoid duplicates)
    partnerABtn.removeEventListener('click', handlePartnerA);
    partnerBBtn.removeEventListener('click', handlePartnerB);
    restartBtn.removeEventListener('click', restart);
    
    partnerABtn.addEventListener('click', handlePartnerA);
    partnerBBtn.addEventListener('click', handlePartnerB);
    restartBtn.addEventListener('click', restart);
    
    // Load first question
    loadQuestion();
    updateDisplay();
}

// Handler functions to avoid duplicate listeners
function handlePartnerA() {
    selectAnswer('A');
}

function handlePartnerB() {
    selectAnswer('B');
}

// Load current question
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }
    
    questionNumEl.textContent = currentQuestionIndex + 1;
    questionTextEl.textContent = `Who's most likely to ${questions[currentQuestionIndex]}?`;
    
    // Reset button states
    partnerABtn.disabled = false;
    partnerBBtn.disabled = false;
    partnerABtn.classList.remove('selected');
    partnerBBtn.classList.remove('selected');
}

// Handle answer selection
function selectAnswer(partner) {
    // Disable buttons
    partnerABtn.disabled = true;
    partnerBBtn.disabled = true;
    
    // Add selected class
    if (partner === 'A') {
        partnerABtn.classList.add('selected');
        partnerAScore++;
    } else {
        partnerBBtn.classList.add('selected');
        partnerBScore++;
    }
    
    // Track answer for poll counter
    answers.push({
        question: questions[currentQuestionIndex],
        answer: partner
    });
    
    updateDisplay();
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1000);
}

// Update score display
function updateDisplay() {
    partnerAScoreEl.textContent = partnerAScore;
    partnerBScoreEl.textContent = partnerBScore;
}

// Show results
function showResults() {
    questionCardEl.style.display = 'none';
    resultsScreenEl.style.display = 'block';
    
    finalPartnerANameEl.textContent = partnerAName;
    finalPartnerBNameEl.textContent = partnerBName;
    finalPartnerAScoreEl.textContent = partnerAScore;
    finalPartnerBScoreEl.textContent = partnerBScore;
    
    // Display poll counter
    displayPollCounter();
}

// Display poll counter with all answers
function displayPollCounter() {
    const pollCounterEl = document.getElementById('poll-counter');
    pollCounterEl.innerHTML = '<h3>📊 Poll Results</h3>';
    
    const pollList = document.createElement('div');
    pollList.className = 'poll-list';
    
    answers.forEach(item => {
        const pollItem = document.createElement('div');
        pollItem.className = 'poll-item';
        
        const questionDiv = document.createElement('div');
        questionDiv.className = 'poll-question';
        questionDiv.textContent = item.question;
        
        const answerDiv = document.createElement('div');
        answerDiv.className = 'poll-answer';
        answerDiv.textContent = item.answer === 'A' ? partnerAName : partnerBName;
        
        pollItem.appendChild(questionDiv);
        pollItem.appendChild(answerDiv);
        pollList.appendChild(pollItem);
    });
    
    pollCounterEl.appendChild(pollList);
}

// Restart game
function restart() {
    resultsScreenEl.style.display = 'none';
    questionCardEl.style.display = 'block';
    init();
}

// Start the game
init();
