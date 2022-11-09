let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
//   clear existing timers
  clearInterval(countdown);
  
 const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  
//   round out the seconds
 countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
//    check if we should stop it
     if(secondsLeft < 0){
      clearInterval(countdown);
      return;
    }
//    display it
displayTimeLeft(secondsLeft);
 }, 1000);
}

// shows the time remainding from countdown in minutes and seconds 
//   haven't added hours yet
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
//   show timer in tab
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
//   conversion to 12hr instead of 24hr
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}


function startTimer(){
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

// Add eventlistener to listen for click and submit
buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
  
})