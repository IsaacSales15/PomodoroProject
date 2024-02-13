// Transição do background ao clicar no Pomodoro, Short Break e Long Break

const pomodoroButton = document.getElementById('pomodoro_button');
const shortBreakButton = document.getElementById('short_break_button');
const longBreakButton = document.getElementById('long_break_button');
const currentMinutes = document.getElementById('minutes').innerText;
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

// As configurações padrões do Pomodoro
let currentTimeInSeconds;
let currentGradient;
let currentReverseAnimation;
let currentFifthColor;


function getCurrentStyles(gradient, reverseAnimation, fifthColor) {
    currentGradient = gradient;
    currentReverseAnimation = reverseAnimation;
    currentFifthColor = fifthColor;
}

function isStylesUndefined() {
    return [currentTimeInSeconds, currentGradient, currentFifthColor].every(style => style === undefined);
}

/* Função para mudar a cor do body a partir de uma ação.

timeInSeconds -> definir o tempo da animação em segundo.
gradient -> array das cores.
reverseAnimation -> booleano para definir se a animação será inversa ou não, para não mudar o gradiente.
fifthColor -> definir a última cor da animação, também para não mudar o por completo gradiente. */
function changeBodyBackground(timeInSeconds, gradient, reverseAnimation, fifthColor) {
    
    isAnimationRunning = true;
    
    getCurrentStyles(gradient, reverseAnimation, fifthColor);

    if (isStylesUndefined()) {
        timeInSeconds = 12;
        gradient = defaultGradient;
        reverseAnimation = false;
    }

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
        isAnimationRunning = false;
        wasTimerStarted = false;
    }, 1000*timeInSeconds);
}

// Retorna um array com três booleanos, onde o true corresponde a posição do botão que foi clicado.
function getButtonsOrder(elementName) {
    
    switch (elementName) {
        case pomodoroButton :
            isPomodoroClicked = true;
            isShortBreakCliked = false;
            isLongBreakCliked = false;
            break;
            case shortBreakButton :
                isPomodoroClicked = false;
            isShortBreakCliked = true;
            isLongBreakCliked = false;
            break;
            case longBreakButton :
                isPomodoroClicked = false;
            isShortBreakCliked = false;
            isLongBreakCliked = true;
            break;
        }        
}

// Transições do background após o clique
pomodoroButton.addEventListener('click', () => {

    if (isLongBreakCliked && !isPomodoroClicked && !isAnimationRunning) {
        changeBodyBackground(1, pomodoroToLongBreakGradient, true);
        getButtonsOrder(pomodoroButton);
    } else if (isShortBreakCliked && !isPomodoroClicked && !isAnimationRunning) {
        changeBodyBackground(1, defaultGradient, true);
        getButtonsOrder(pomodoroButton);
    }

})

shortBreakButton.addEventListener('click', () => {
    if (isLongBreakCliked && !isShortBreakCliked && !isAnimationRunning) {
        changeBodyBackground(1, shortBreakToLongBreakGradient, true);
        getButtonsOrder(shortBreakButton);
    } else if (!isShortBreakCliked && !isAnimationRunning) {
        changeBodyBackground(1, defaultGradient, false, '#3e55a1');
        getButtonsOrder(shortBreakButton);
    }
})

longBreakButton.addEventListener('click', () => {
    
    if (isShortBreakCliked && !isLongBreakCliked && !isAnimationRunning) {
        changeBodyBackground(1, shortBreakToLongBreakGradient, false);
        getButtonsOrder(longBreakButton);
        
    } else if (isPomodoroClicked && !isLongBreakCliked && !isAnimationRunning) {
        changeBodyBackground(1, pomodoroToLongBreakGradient, false);
        getButtonsOrder(longBreakButton);
    } 

})

// Animação do background acompanhada com o timer 

let startButtonisStart = true;
let wasTimerStarted = false;

// O start é apertado pela primeira vez, o timer é pausado, o timer é despausado, o timer encerrado 
startTimerButton.addEventListener('click', () => {

    // Verifica se o timer ja está rodando e se ele vai pausar ou continuar
    if (wasTimerStarted && startButtonisStart) {
        body.style.animationPlayState = 'paused';
        startButtonisStart = !startButtonisStart;
    } else if (wasTimerStarted && !startButtonisStart) {
        body.style.animationPlayState = 'running';
        startButtonisStart = !startButtonisStart;
    } else if (!wasTimerStarted && isPomodoroClicked && !isAnimationRunning) {
        changeBodyBackground(5, currentGradient, !currentReverseAnimation, currentFifthColor);
        wasTimerStarted = true;
    } else if (!wasTimerStarted && isShortBreakCliked && !isAnimationRunning) {
        changeBodyBackground(6, currentGradient, !currentReverseAnimation, currentFifthColor);
        wasTimerStarted = true;
    } else if (!wasTimerStarted && isLongBreakCliked && !isAnimationRunning) {
        changeBodyBackground(7, currentGradient, !currentReverseAnimation, currentFifthColor);
        wasTimerStarted = true;
    }
})
