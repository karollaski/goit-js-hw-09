const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let newColor = null;

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

stopBtn.setAttribute('disabled', '');

const bodyChangeColor = () => {
  body.style.backgroundColor = getRandomHexColor();
};

const startColorSwitcher = element => {
  element.target.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled');

  newColor = setInterval(bodyChangeColor, 1000);
};

const stopColorSwitcher = element => {
  element.target.setAttribute('disabled', true);
  startBtn.removeAttribute('disabled');

  clearInterval(newColor);
};

startBtn.addEventListener('click', startColorSwitcher);
stopBtn.addEventListener('click', stopColorSwitcher);
