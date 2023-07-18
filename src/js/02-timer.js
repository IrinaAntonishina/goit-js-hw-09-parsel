
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    start: document.querySelector('button[data-start]'),
    day: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    min: document.querySelector('[data-minutes]'),
    sec: document.querySelector('[data-seconds]'),
}

let differenceDate = 0;
let timerId = null;
let formatDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      dateHandler(selectedDates[0])}
    
  };

  flatpickr("#datetime-picker", options);
  
const render = function ({days, hours, minutes, seconds}) {
  refs.day.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.min.textContent = addLeadingZero(minutes);
  refs.sec.textContent = addLeadingZero(seconds);
}

  
const startHandler = function (){
  timerId = setInterval(() => {
    differenceDate -= 1000;
    
    if (refs.min.textContent <= 0 && refs.sec.textContent <= 0){
      clearInterval(timerId)
    }else{
      formatDate = convertMs(differenceDate);
      render(formatDate);
    }
  }, 1000);

    }
     
    
  refs.start.addEventListener('click', startHandler)

  refs.start.setAttribute("disabled", true)
  
  const dateHandler = function (dateInFuture){
    const dateNow = Date.now();
    differenceDate = dateInFuture.getTime() - dateNow;
    
    if(dateInFuture < dateNow){
        alert('Please choose a date in the future')
        refs.start.setAttribute("disabled", true)
    }
    if(dateInFuture > dateNow){
      refs.start.removeAttribute("disabled")
      formatDate = convertMs(differenceDate);
      render(formatDate)
    }    
}

const addLeadingZero = function (number){
  return String(number).padStart(2, 0);
}
  
function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  

