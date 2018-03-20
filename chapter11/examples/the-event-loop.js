try {
  setTimeout(() => {throw new Error('Whoosh')}, 1000);
} catch (e) {
  // This will not run
  console.log('caught!');
}

//The callback passed to setTimeout is added
//to an asychronous call stack, so if it raises
//an exception, the catch block won't catch
//the error.

