// Variaveis constantes
const pomodoroStart = .2 * 60; 
const shortBreakStart = .1 * 60; 
const longBreakStart = .05 * 60;

// Variaveis let
let timer = pomodoroStart;
let currentInterval = "pomodoro"; 
let timerOn = false;
let countdownInterval;
let audioStart = document.getElementById('alarm_audio')

// Elementos visuais
const countdownEl = document.getElementById('minutes');
const startButton = document.getElementById('start_button');
const longBreak = document.getElementById('long_break_button');
const shortBreak = document.getElementById('short_break_button');
const pomodoro = document.getElementById('pomodoro_button');
const titleEl = document.getElementById('titleTimer');

// Função para iniciar o Count Down
function startCountdown() {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
// Escreve os números na tela
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    titleEl.innerHTML = `${currentInterval} - ${minutes}:${seconds}`;
    timer--;
// If para verificar se o timer é menor que zero
    if (timer < 0) {
        startNextInt();
    }
}

startButton.addEventListener('click', () => {
    // If para verificar se o timerOn está true
    if (!timerOn) {
        timerOn = true;
        countdownInterval = setInterval(startCountdown, 1000);
        startButton.innerHTML = 'Pause';
    } else {
        timerOn = false;
        clearInterval(countdownInterval);
        startButton.innerHTML = 'Start';
    }
});

// Switch case para o timer reiniciar quando chegar a 0
function startNextInt(){
    switch (currentInterval) {
        case 'pomodoro':
            currentInterval = 'shortBreak';
            timer = shortBreakStart;
            break;
        case 'shortBreak':
            currentInterval = 'pomodoro';
            timer = pomodoroStart;
            break;
        case 'longBreak':
            currentInterval = 'pomodoro';
            timer = pomodoroStart;
            break;
        default:
            currentInterval = 'pomodoro';
            timer = pomodoroStart;
            break;
    }
    clearInterval(countdownInterval);
    audioStart.play();
    timerOn = false;
    startButton.innerHTML = 'Start'; 
    startCountdown();
}

// Botões Pomodoro
pomodoro.addEventListener('click', () => {
    clearInterval(countdownInterval); 
    timerOn = false;
    currentInterval = 'pomodoro'; 
    timer = pomodoroStart;
    countdownEl.innerHTML = '25:00'; 
    startButton.innerHTML = 'Start';
});

longBreak.addEventListener('click', () => {
    clearInterval(countdownInterval); 
    timerOn = false;
    currentInterval = 'longBreak'; 
    timer = longBreakStart;
    countdownEl.innerHTML = '15:00'; 
    startButton.innerHTML = 'Start';
});

shortBreak.addEventListener('click', () => {
    clearInterval(countdownInterval); 
    timerOn = false;
    currentInterval = 'shortBreak';
    timer = shortBreakStart;  
    countdownEl.innerHTML = '05:00';
    startButton.innerHTML = 'Start'; 
});

// Cada vez mais próximo de saber o que só os loucos sabem - By: SALES, Isaac.