let ages = new Map();
ages.set('Boris', 39);
ages.set('Angela', 23);
ages.set('Jackson', 61);
ages.set(1, 14);

ages.has('Rob'); //false
ages.has('Angela'); //true
ages.get('Jackson'); //61
ages.has(1); //true

let obj = {};
ages.set(obj, 'obj');
ages.has(obj); //true