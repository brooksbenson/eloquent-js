/*
  An animation that features an
  element orbiting around the border
  of another element.
*/

function coordinateToPercentage(c) {
  c += 1;
  return (c / 2) * 100 + '%';
}

const circle = document.querySelector('.circle');
let angle = Math.PI / 2;
function animate(time, pastTime) {
  if (pastTime) angle += (time - pastTime) * 0.001;
  circle.style.top = coordinateToPercentage(Math.sin(angle));
  circle.style.left = coordinateToPercentage(Math.cos(angle));
  requestAnimationFrame(nextTime => animate(nextTime, time));
}
requestAnimationFrame(animate);

/*

HTML HTML HTML

<div class="body">
  <div class="circle">
  </div>
</div>
<style>
  .body {
    background: skyblue;
    border-radius: 50%;
    position: relative;
    height: 400px;
    width: 400px;
  }
  .circle {
    background: red;
    border-radius: 50%;
    height: 10px;
    width: 10px;
    position: relative;
  }
</style>

*/
