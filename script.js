let isRunning = false;
let timer;
let startTime;
let elapsedTime = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('start-stop');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

// Format time as mm:ss:ms
function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

// Update the display
function updateTime() {
    const now = Date.now();
    elapsedTime = now - startTime;
    display.textContent = formatTime(elapsedTime);
}

// Start/Stop the timer
startStopButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startStopButton.textContent = 'Start';
        startStopButton.classList.remove('stop');
        lapButton.textContent = 'Reset';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        isRunning = true;
        startStopButton.textContent = 'Stop';
        startStopButton.classList.add('stop');
        lapButton.textContent = 'Lap';
    }
});

// Lap or Reset
lapButton.addEventListener('click', () => {
    if (isRunning) {
        // Prepend lap time
        const lapTime = document.createElement('li');
        lapTime.innerHTML = `Lap ${lapsList.children.length + 1} <span>${formatTime(elapsedTime)}</span>`;
        lapsList.prepend(lapTime);
    } else {
        // Reset the stopwatch
        clearInterval(timer);
        elapsedTime = 0;
        display.textContent = '00:00:00';
        lapsList.innerHTML = '';
    }
});
