// Transição do background ao clicar no Pomodoro, Short Break e Long Break

const pomodoroButton = document.getElementById('pomodoro_button');
const shortBreakButton = document.getElementById('short_break_button');
const longBreakButton = document.getElementById('long_break_button');
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

// As configurações padrões do Pomodoro
let timeInSeconds;
let gradient;
let reverseAnimation;
let fifthColor;

/* Função para mudar a cor do body a partir de uma ação.

timeInSeconds -> definir o tempo da animação em segundo.
gradient -> array das cores.
reverseAnimation -> booleano para definir se a animação será inversa ou não, para não mudar o gradiente.
fifthColor -> definir a última cor da animação, também para não mudar o por completo gradiente. */

function changeBodyBackground(timeInSeconds, gradient, reverseAnimation, fifthColor) {
    if (timeInSeconds === undefined && gradient === undefined && reverseAnimation === undefined && fifthColor === undefined) {
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
        document.body.style.animation = '';
        document.body.style.animationPlayState = '';
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
        return [isPomodoroClicked, isShortBreakCliked, isLongBreakCliked];
        
}

// Transições do background após o clique
pomodoroButton.addEventListener('click', () => {

    if (isLongBreakCliked && !isPomodoroClicked) {
        changeBodyBackground(1, pomodoroToLongBreakGradient, true);
        timeInSeconds = 1;
        gradient = pomodoroToLongBreakGradient;
        reverseAnimation = true;
    } else if (!isPomodoroClicked) {
        changeBodyBackground(1, defaultGradient, true);
        timeInSeconds = 1;
        gradient = defaultGradient;
        reverseAnimation = true;
    }

    [isPomodoroClicked, isShortBreakCliked, isLongBreakCliked] = getButtonsOrder(pomodoroButton);
})

shortBreakButton.addEventListener('click', () => {
    if (isLongBreakCliked && !isShortBreakCliked) {
        changeBodyBackground(1, shortBreakToLongBreakGradient, true);
        timeInSeconds = 1;
        gradient = shortBreakToLongBreakGradient;
        reverseAnimation = true;
    } else if (!isShortBreakCliked) {
        changeBodyBackground(1, defaultGradient, false, '#3e55a1');
        timeInSeconds = 1;
        gradient = defaultGradient;
        reverseAnimation = false;
        fifthColor = '#3e55a1';
    }
    [isPomodoroClicked, isShortBreakCliked, isLongBreakCliked] = getButtonsOrder(shortBreakButton);
})

longBreakButton.addEventListener('click', () => {
    
    if (isShortBreakCliked && !isLongBreakCliked) {
        changeBodyBackground(1, shortBreakToLongBreakGradient, false)
        timeInSeconds = 1;
        gradient = shortBreakToLongBreakGradient;
        reverseAnimation = false;
        
    } else if (isPomodoroClicked && !isLongBreakCliked) {
        changeBodyBackground(1, pomodoroToLongBreakGradient, false);
        timeInSeconds = 1;
        gradient = pomodoroToLongBreakGradient;
        reverseAnimation = false;
    } 

    [isPomodoroClicked, isShortBreakCliked, isLongBreakCliked] = getButtonsOrder(longBreakButton);
})

// Animação do background acompanhada com o timer 

let startButtonContent = startTimerButton.innerHTML;

let isTimerRunning = false;

startTimerButton.addEventListener('click', () => {
    changeBodyBackground(timeInSeconds, gradient, !reverseAnimation, fifthColor);
})
