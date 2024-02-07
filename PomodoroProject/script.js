const start = 25;
let timer = start * 60;

const countdownEl = document.getElementById('minutes');

setInterval(upCountDown,1000);

function upCountDown() {
    const minutes = Math.floor(timer/60);
    let seconds = timer % 60;
    if (seconds == 0) {
        seconds = '00'
    }
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    timer--;
    
}