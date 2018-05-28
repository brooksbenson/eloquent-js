/*
  Modify runLevel to handle pausing
*/

function runLevel(level, Display) {
  let display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
  let pause = false;
  let done;
  window.addEventListener('keyup', e => {
    if (e.key != 'Escape') return;
    e.preventDefault();
    pause = !pause;
    if (pause === false) {
      runAnimation(animationFrame);
    }
  });
  function animationFrame(time) {
    state = state.update(time, arrowKeys);
    display.setState(state);
    if (pause) return false;
    else if (state.status == 'playing') {
      return true;
    } else if (ending > 0) {
      ending -= time;
      return true;
    } else {
      display.clear();
      done(state.status);
      return false;
    }
  }
  return new Promise(resolve => {
    /*
      Needed a way to access resolve
      outside of this scope.
    */
    done = resolve;
    runAnimation(animationFrame);
  });
}
