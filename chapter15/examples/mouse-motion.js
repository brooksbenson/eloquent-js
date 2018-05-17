/*
  <p>Drag the bar to change its width</p>
  <div style="height: 20px; width: 40px; background: orange">
*/

let lastX;
let bar = document.querySelector('div');
bar.addEventListener('mousedown', e => {
  if (event.button === 0) {
    e.preventDefault();
    lastX = event.clientX;
    window.addEventListener('mousemove', moved);
  }
});

function moved(e) {
  if (e.buttons === 0) {
    window.removeEventListener('mousemove', moved);
  } else {
    let dist = e.clientX - lastX;
    let newWidth = Math.max(10, bar.offsetWidth + dist);
    bar.style.width = newWidth + 'px';
    lastX = event.clientX;
  }
}
