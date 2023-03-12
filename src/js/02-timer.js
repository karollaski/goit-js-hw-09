import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const date = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const min = document.querySelector('[data-minutes]');
const sec = document.querySelector('[data-seconds]');
const span = document.querySelector('.value');

let timerId = null;
startBtn.disabled = true;

// opcje do flatpickr date selector
Notiflix.Notify.init({ position: 'center-top' });
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      startBtn.setAttribute('disabled', true);
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};

// zostasowanie biblioteki flatpickr
flatpickr(date, options);

const startCountdown = () => {
  startBtn.disabled = true;
  date.disabled = true;

  timerId = setInterval(() => {
    const chosenDate = new Date(date.value);
    const now = new Date();
    const distance = chosenDate - now;
    const { days, hours, minutes, seconds } = convertMs(distance);

    day.textContent = addLeadingZero(days);
    hour.textContent = addLeadingZero(hours);
    min.textContent = addLeadingZero(minutes);
    sec.textContent = addLeadingZero(seconds);

    if (distance < 1000) {
      clearInterval(timerId);
      date.disabled = false;
    }
  }, 1000);
};

const convertMs = ms => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

addLeadingZero = value => `${value}`.padStart(2, '0');

startBtn.addEventListener('click', startCountdown);
