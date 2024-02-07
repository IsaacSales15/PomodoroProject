const start = 25;
let timer = start * 60;

const countdownEl = document.getElementById('minutes');

const startButton = document.querySelector('button')

let timerOn = false;


startButton.addEventListener('click', () => {
    upCountDown();
    setInterval(upCountDown,1000);
})

function upCountDown() {
    let minutes = Math.floor(timer/60);
    let seconds = timer % 60;
    if (seconds < 10 && seconds >= 0) {
        seconds = '0' + seconds;
    }
    if (minutes < 10 && minutes >= 0) {
        minutes = '0' + minutes;
    }

    countdownEl.innerHTML = `${minutes}:${seconds}`;
    timer--;
    
}