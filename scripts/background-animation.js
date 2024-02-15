// Transição do background ao clicar no Pomodoro, Short Break e Long Break

const pomodoro = document.getElementById('pomodoro_button');
const shortBreak = document.getElementById('short_break_button');
const longBreak = document.getElementById('long_break_button');
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

    if (isLongBreakCliked && !isPomodoroClicked && !isAnimationRunning) {
        changeBodyBackground(1, pomodoroToLongBreakGradient, true);
        getButtonsOrder(pomodoro);
    } else if (isShortBreakCliked && !isPomodoroClicked && !isAnimationRunning) {
        changeBodyBackground(1, defaultGradient, true);
        getButtonsOrder(pomodoro);
    }

})

shortBreak.addEventListener('click', () => {
    if (isLongBreakCliked && !isShortBreakCliked && !isAnimationRunning) {
        changeBodyBackground(1, shortBreakToLongBreakGradient, true);
        getButtonsOrder(shortBreak);
    } else if (!isShortBreakCliked && !isAnimationRunning) {
        changeBodyBackground(1, defaultGradient, false, '#3e55a1');
        getButtonsOrder(shortBreak);
    }
})

longBreak.addEventListener('click', () => {
    
    if (isShortBreakCliked && !isLongBreakCliked && !isAnimationRunning) {
        changeBodyBackground(1, shortBreakToLongBreakGradient, false);
        getButtonsOrder(longBreak);
        
    } else if (isPomodoroClicked && !isLongBreakCliked && !isAnimationRunning) {
        changeBodyBackground(1, pomodoroToLongBreakGradient, false);
        getButtonsOrder(longBreak);
    } 

})