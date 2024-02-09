// Variáveis
let start = 25;
let timer = start * 60;

// Elementos visuais
const countdownEl = document.getElementById('minutes');
const startButton = document.getElementById('start_button');
const longBreak = document.getElementById('short_pomodoro');
const shortBreak = document.getElementById('medium_pomodoro');
const pomodoro = document.getElementById('long_pomodoro')

// Outras variaveis
let timerOn = false;
let countdownInterval;

startButton.addEventListener('click', () => {
    // If para verificar se o timerOn está true
    if (!timerOn) {
        timerOn = true;
        startCountdown();
        countdownInterval = setInterval(startCountdown, 1000);
        startButton.innerHTML = 'Pause';
    } else {
        timerOn = false;
        clearInterval(countdownInterval);
        startButton.innerHTML = 'Start';
    }
});

// Botões Pomodoro
pomodoro.addEventListener('click', () => {
    timer = 25 * 60; 
    start = 25; 
    startCountdown();
});

longBreak.addEventListener('click', () => {
    timer = 15 * 60; 
    start = 15; 
    startCountdown();
});

shortBreak.addEventListener('click', () => {
    timer = 5 * 60; 
    start = 5; 
    startCountdown();
});

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

    countdownEl.innerHTML = `${minutes}:${seconds}`;
    timer--;

// Verificação para reiniciar o timer
    if (timer < 0) {
        clearInterval(countdownInterval);
        timerOn = false;
        timer = start * 60; 
    }
}
