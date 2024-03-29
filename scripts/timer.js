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
            document.querySelector("link[rel*='icon']").href = 'favicon/blue-tomato.png';
            pomodoro.classList.remove('button_actived');
            shortBreak.classList.add('button_actived');
            shortBreakEvent();
            currentInterval = 'shortBreak';
            timer = shortBreakStart;
            break;
        case 'shortBreak':
            document.querySelector("link[rel*='icon']").href = 'favicon/red-tomato.png';
            pomodoro.classList.add('button_actived');
            shortBreak.classList.remove('button_actived');
            pomodoroEvent();
            currentInterval = 'pomodoro';
            timer = pomodoroStart;
            break;
        case 'longBreak':
            document.querySelector("link[rel*='icon']").href = 'favicon/red-tomato.png';
            pomodoro.classList.add('button_actived');
            longBreak.classList.remove('button_actived');
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
    changeButtonClass()
});

longBreak.addEventListener('click', () => {
    clearInterval(countdownInterval); 
    timerOn = false;
    currentInterval = 'longBreak'; 
    timer = longBreakStart;
    countdownEl.innerHTML = '15:00'; 
    startButton.innerHTML = 'Start';
    changeButtonClass()
});

shortBreak.addEventListener('click', () => {
    clearInterval(countdownInterval); 
    timerOn = false;
    currentInterval = 'shortBreak';
    timer = shortBreakStart;  
    countdownEl.innerHTML = '05:00';
    startButton.innerHTML = 'Start'; 
    changeButtonClass()
});

// Cada vez mais próximo de saber o que só os loucos sabem - By: SALES, Isaac.

function changeButtonClass() {
    switch (currentInterval) {
        case 'pomodoro' : 
            document.querySelector("link[rel*='icon']").href = 'favicon/red-tomato.png'
            pomodoro.classList.add('button_actived');
            shortBreak.classList.remove('button_actived');
            longBreak.classList.remove('button_actived');
            break;
        case 'shortBreak' :
            document.querySelector("link[rel*='icon']").href = 'favicon/blue-tomato.png'
            pomodoro.classList.remove('button_actived');
            shortBreak.classList.add('button_actived');
            longBreak.classList.remove('button_actived');
            break;
        case 'longBreak' :
            document.querySelector("link[rel*='icon']").href = 'favicon/blue-tomato.png'
            pomodoro.classList.remove('button_actived');
            shortBreak.classList.remove('button_actived');
            longBreak.classList.add('button_actived');
            break;
    }
}

// Transição do background ao clicar no Pomodoro, Short Break e Long Break
const body = document.querySelector('body');

// Gradientes de cores (obrigatoriamente 5 cores) 
const defaultGradient = ['#b22222', '#913046', '#713f6a', '#504d8d', '#3e55a1'];
const shortBreakToLongBreakGradient = [ '#3e55a1', '#4e65b0', '#5e75bf', '#6e84ce', '#7e94dd'];
const pomodoroToLongBreakGradient = [ '#b22222', '#a53f51', '#985b80', '#8b78ae', '#7e94dd'];
const startTimerButton = document.getElementById('start_button');

// Booleanos para a verificação da ordem dos botões
let isPomodoroClicked = true;
let isShortBreakCliked;
let isLongBreakCliked;
let isAnimationRunning;

/* Função para mudar a cor do body a partir de uma ação.

timeInSeconds -> definir o tempo da animação em segundo.
gradient -> array das cores.
reverseAnimation -> booleano para definir se a animação será inversa ou não, para não mudar o gradiente.
fifthColor -> definir a última cor da animação, também para não mudar o por completo gradiente. */
function changeBodyBackground(timeInSeconds, gradient, reverseAnimation, fifthColor) {
    
    isAnimationRunning = true;

    let finalBackgroundColor;
    
    // Verifica se a cor final foi definida
    if (fifthColor !== undefined) {
        gradient[4] = fifthColor;
    }
    
    // Verifica se a animação será invertida
    let animationName;
    
    if (!reverseAnimation) {
        animationName = 'backgroudTrasition';
        finalBackgroundColor = gradient[4];
    } else {
        animationName = 'reverseBackgroudTrasition';
        finalBackgroundColor = gradient[0];
    }
    // Muda o valor das variáveis do CSS
    document.documentElement.style.setProperty('--first-color', gradient[0]);
    document.documentElement.style.setProperty('--second-color', gradient[1]);
    document.documentElement.style.setProperty('--third-color', gradient[2]);
    document.documentElement.style.setProperty('--fourth-color', gradient[3]);
    document.documentElement.style.setProperty('--fifth-color', gradient[4]);
    
    // Define as propriedades do animation
    document.body.style.animation = `${animationName} ${timeInSeconds}s linear`;
    document.body.style.backgroundColor = finalBackgroundColor;

    // Espera a animação acabar para retirar as propriedades do animation
    setTimeout(() => {
        body.style.animation = '';
        isAnimationRunning = false; },
        1000*timeInSeconds);
}

// Retorna um array com três booleanos, onde o true corresponde a posição do botão que foi clicado.
function getButtonsOrder(elementName) {
    
    switch (elementName) {
        case pomodoro :
            isPomodoroClicked = true;
            isShortBreakCliked = false;
            isLongBreakCliked = false;
            break;
        case shortBreak :
            isPomodoroClicked = false;
            isShortBreakCliked = true;
            isLongBreakCliked = false;
            break;
        case longBreak :
            isPomodoroClicked = false;
            isShortBreakCliked = false;
            isLongBreakCliked = true;
            break;
        }        
}

// Transições do background após o clique
pomodoro.addEventListener('click', () => {

    pomodoroEvent()

})

function pomodoroEvent() {
    if (isLongBreakCliked && !isPomodoroClicked && !isAnimationRunning) {
        changeBodyBackground(1, pomodoroToLongBreakGradient, true);
        getButtonsOrder(pomodoro);
    } else if (isShortBreakCliked && !isPomodoroClicked && !isAnimationRunning) {
        changeBodyBackground(1, defaultGradient, true);
        getButtonsOrder(pomodoro);
    }
}

shortBreak.addEventListener('click', () => {
    shortBreakEvent()
})

function shortBreakEvent() {
    if (isLongBreakCliked && !isShortBreakCliked && !isAnimationRunning) {
        changeBodyBackground(1, shortBreakToLongBreakGradient, true);
        getButtonsOrder(shortBreak);
    } else if (!isShortBreakCliked && !isAnimationRunning) {
        changeBodyBackground(1, defaultGradient, false, '#3e55a1');
        getButtonsOrder(shortBreak);
    }
}

longBreak.addEventListener('click', () => {
    
    if (isShortBreakCliked && !isLongBreakCliked && !isAnimationRunning) {
        changeBodyBackground(1, shortBreakToLongBreakGradient, false);
        getButtonsOrder(longBreak);
        
    } else if (isPomodoroClicked && !isLongBreakCliked && !isAnimationRunning) {
        changeBodyBackground(1, pomodoroToLongBreakGradient, false);
        getButtonsOrder(longBreak);
    } 

})
