/*
  Find a way to invoke the hasOwnProperty
  method on an object that already has
  a property called hasOwnProperty defined.
*/

let obj = {one: true, two: true, hasOwnProperty: true};

Object.prototype.hasOwnProperty.call(obj, 'one'); //true
//we need a way to somehow "get behind" obj to use the
//hasOwnProperty method