/*
  <textarea>Type something here</textarea>
*/

const textarea = document.querySelector('textarea');
let timeout;
textarea.addEventListener('input', e => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    console.log('fire');
  }, 250);
});

let scheduled = null;
window.addEventListener('mousemove', () => {
  if (!scheduled) {
    setTimeout(() => {
      document.body.textContent = `Mouse at ${scheduled.pageX}, ${
        scheduled.pageY
      }`;
      scheduled = null;
    }, 250);
  }
  scheduled = event;
});
