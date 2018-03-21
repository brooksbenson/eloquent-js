try {
  setTimeout(() => {throw new Error('Whoosh')}, 1000);
} catch (e) {
  // This will not run
  console.log('caught!');
}

/*
  The callback passed to setTimeout is added
  to a queue to be called once the timer has
  ended. The script that runs the code will
  have ended within the span of the timer,
  so the catch statement wont be on the call
  stack when the callback gets executed.
*/