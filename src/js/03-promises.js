import Notiflix from 'notiflix';

const form = document.querySelector('.form');

const submitForm = event => {
  event.preventDefault();

  const { delay, step, amount } = event.currentTarget.elements;

  for (let i = 0; i < amount.value; i++) {
    let position = i + 1;
    let delays = Number(delay.value) + step.value * i;

    createPromise(position, delays)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
};

form.addEventListener('submit', submitForm);

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
