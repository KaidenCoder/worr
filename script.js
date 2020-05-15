const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

//List of words for game
const words = [
    'Therefore I tell you do not worry about your life what you will eat or drink or about your body what you will wear',
    'Is not life more than food and the body more than clothes',
    'Look at the birds of the air they do not sow or reap or store away in barns and yet your heavenly Father feeds them are you not much more valuable than they',
    'Can any one of you by worrying add a single hour to your life',
    'And why do you worry about clothes see how the flowers of the field grow they do not labor or spin',
    'Yet I tell you that not even solomon in all his splendor was dressed like one of these',
    'If that is how God clothes the grass of the field which is here today and tomorrow is thrown into the fire will he not much more clothe you you of little faith',
    'So do not worry saying what shall we eat or what shall we drink or what shall we wear',
    'For the pagans run after all these things and your heavenly Father knows that you need them',
    'But seek first his kingdom and his righteousness and all these things will be given to you as well',
    'Therefore do not worry about tomorrow for tomorrow will worry about itself each day has enough trouble of its own',
];

// Init word
let randomWord;

// Init score
let score = 15;

// Init time
let time = 60;

// Set difficulty
let difficulty = localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') : 'easy';

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') : 'easy';

// Focus on text on start
text.focus()

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generates random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

// Add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// Update Score
function updateScore() {

    score--;
    scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) {
        clearInterval(timeInterval)
        //end game

        gameOver()
        // coronaDestroyed()

    }

    if (score === 0) {
        time++;
    }


}

// Game Over, show end screen
function gameOver() {
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <h2>Your remaining items are ${score}</h2>
        <button onclick="location.reload()">Play Again</button>
    `;

    endgameEl.style.display = 'flex';
}

function coronaDestroyed() {

    endgameEl.innerHTML = `
        <h1>Hoorah!</h1>
        <h2>You have completed Words</h2>
        <button onclick="location.reload()">Play Again</button>
    `;


    endgameEl.style.display = 'flex';
}




addWordToDOM();

// Event listeners


// Typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();


        // Clear
        e.target.value = '';
        if (difficulty === 'hard') {

            time += 30;
        } else if (difficulty === 'medium') {

            time += 40;
        } else {

            time += 50;
        }
        updateTime()
    }

    if (score === 0) {

        coronaDestroyed()
    }
})

// Settings btn click
settingsBtn.addEventListener('click', () =>
    settings.classList.toggle('hide'))

// Settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty)
})

