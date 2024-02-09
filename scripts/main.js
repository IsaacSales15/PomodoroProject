let start = .2;
let timer = start * 60;
let timerShort = start * 60

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
        //setTimeout(startCountdown(), 1000);
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
    start = 15; 
    timer = start * 60; 
    startCountdown();
});

shortBreak.addEventListener('click', () => {
    start = 5;
    timer = start * 60;  
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

    function shortPause(){
        start = .1;
        timer = start * 60;  
        timerOn = true;
        startCountdown();
        if (timer < 0){
            pomodoroStart();
        }
    }
    function pomodoroStart(){
        start = .2;
        timer = start * 60;
        timerOn = true;
        startCountdown();
    }

// Verificação para reiniciar o timer
    if (timer < 0) {
        shortPause();
    } 
}
