function firstElement(arr) {
  if (arr.length === 0) {
    throw new Error('firstElement called with []');
  }
  return arr[0];
}