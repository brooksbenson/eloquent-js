/*
  The code below display a picture of a cat
  that moves around in an elipse.
*/

`
<p style="text-align: center">
  <img src="img/cat.png" style="position: relative" />
</p>
`;
/*
  Diameter: a length of a line passing through
  the center of circle from one side to the other.

  Circumference: the length of a boundary line of
  a circle.

  PI: The *circumference* divided by the *diameter*
  of a circle. This figure is the same for every true
  circle.

  Radius: A line segment that joins the center of
  a circle with any point on its circumference.

  Math.cos & Math.sin: Both functions interpret their
  arguments as a position on a circle. Math.cos gives
  distance in radians horizontally from the center, and 
  Math.sin gives the distance in radians vertically from the
  center. 

  Radians: A unit for measuring angles. The argument
  passed to Math.cos and Math.sin is interpreted as
  radians.
*/

const cat = document.querySelector('img');
let angle = Math.PI / 2;
function animate(time, lastTime) {
  if (lastTime != null) {
    angle += (time - lastTime) * 0.001;
  }
  cat.style.top = Math.sin(angle) * 20 + 'px';
  cat.style.left = Math.cos(angle) * 200 + 'px';
  requestAnimationFrame(newTime => animate(newTime, time));
}
