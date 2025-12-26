// Shaadi Mad Libs Game Logic

// DOM Elements
const inputForm = document.getElementById('input-form');
const storyDisplay = document.getElementById('story-display');
const storyText = document.getElementById('story-text');
const generateBtn = document.getElementById('generate-btn');
const resetBtn = document.getElementById('reset-btn');

// Input fields
const adjectiveInput = document.getElementById('adjective');
const pluralNounInput = document.getElementById('pluralNoun');
const liquidInput = document.getElementById('liquid');
const nounInput = document.getElementById('noun');
const activityInput = document.getElementById('activity');
const foodInput = document.getElementById('food');
const verbInput = document.getElementById('verb');
const bodyPartInput = document.getElementById('bodyPart');

// Initialize game
function init() {
    generateBtn.addEventListener('click', generateStory);
    resetBtn.addEventListener('click', resetForm);
    
    // Allow Enter key to submit
    const inputs = [adjectiveInput, pluralNounInput, liquidInput, nounInput, 
                   activityInput, foodInput, verbInput, bodyPartInput];
    
    inputs.forEach((input, index) => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                } else {
                    generateStory();
                }
            }
        });
    });
}

// Validate all inputs are filled
function validateInputs() {
    const inputs = [
        { field: adjectiveInput, name: 'Adjective' },
        { field: pluralNounInput, name: 'Plural Noun' },
        { field: liquidInput, name: 'Liquid' },
        { field: nounInput, name: 'Noun' },
        { field: activityInput, name: 'Activity' },
        { field: foodInput, name: 'Type of Food' },
        { field: verbInput, name: 'Verb ending in -ing' },
        { field: bodyPartInput, name: 'Body Part' }
    ];
    
    for (let input of inputs) {
        if (!input.field.value.trim()) {
            alert(`Please fill in the ${input.name} field!`);
            input.field.focus();
            return false;
        }
    }
    
    return true;
}

// Generate the story
function generateStory() {
    if (!validateInputs()) {
        return;
    }
    
    // Get values
    const adjective = adjectiveInput.value.trim();
    const pluralNoun = pluralNounInput.value.trim();
    const liquid = liquidInput.value.trim();
    const noun = nounInput.value.trim();
    const activity = activityInput.value.trim();
    const food = foodInput.value.trim();
    const verb = verbInput.value.trim();
    const bodyPart = bodyPartInput.value.trim();
    
    // Create the story
    const story = `
        <p>It all started when a/an <strong>${adjective}</strong> guy liked a photo of a girl hiking with a bunch of <strong>${pluralNoun}</strong>. They finally met at a coffee shop where they bonded over a steaming cup of <strong>${liquid}</strong>.</p>
        
        <p>The romance heated up at her first hockey game where she cheered like a <strong>${noun}</strong>. Soon, she was filling his weekends with <strong>${activity}</strong>, turning him into a social butterfly. Their love was finally put to the test in Iceland. They almost turned into <strong>${food}</strong> during a storm, but they survived by <strong>${verb}</strong> together. When the time came, he got down on one <strong>${bodyPart}</strong> and asked her to continue a life of adventures with him. They knew they would have many adventures together!</p>
    `;
    
    // Display the story
    storyText.innerHTML = story;
    inputForm.style.display = 'none';
    storyDisplay.style.display = 'block';
    
    // Add animation
    storyDisplay.style.animation = 'fadeIn 0.5s ease-in';
}

// Reset the form
function resetForm() {
    // Clear all inputs
    adjectiveInput.value = '';
    pluralNounInput.value = '';
    liquidInput.value = '';
    nounInput.value = '';
    activityInput.value = '';
    foodInput.value = '';
    verbInput.value = '';
    bodyPartInput.value = '';
    
    // Show form, hide story
    storyDisplay.style.display = 'none';
    inputForm.style.display = 'block';
    
    // Focus on first input
    adjectiveInput.focus();
}

// Start the game
init();
