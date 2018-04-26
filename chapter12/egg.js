/*
  An example Egg program.

  do(
    define(x, 10),
    if(
      >(x, 5),
      print("large"),
      print("small")
    )
  )

  Since Egg has no concept of a block,
  an application called do is needed to
  execute a sequence of actions.

  The atomic elements of Egg:
  - Strings
  - Numbers
  - Bindings
  - Applications
*/

// parsing an expression in egg
function parseExpression(program) {
  program = skipSpace(program);
  let match, expr;
  if (match = /^"([^"]*)"/.exec(program)) {
    expr = { type: 'value', value: match[1] };
  } else if (match = /^\d+\b/.exec(program)) {
    expr = { type: 'value', value: Number(match[0]) };
  } else if (match = /^[^\s(),"]+/.exec(program)) {
    expr = { type: 'word', name: match[0] };
  } else {
    throw new SyntaxError('Unexpected syntax: ', program);
  }

  return parseApply(expr, program.slice(match[0].length));
}

// removing leading whitespace
function skipSpace(string) {
  const first = string.search(/\S/);
  if (first == -1) return '';
  return string.slice(first);
}

// parsing an application
function parseApply(expr, program) {
  program = skipSpace(program);
  if (program[0] != '(') {
    return { expr, rest: program };
  }

  program = skipSpace(program.slice(1));
  expr = { type: 'apply', operator: expr, args: [] };
  while (program[0] != ')') {
    const arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] == ',') {
      program = skipSpace(program.slice(1));
    } else if (program[0] != ')') {
      console.log(expr);
      throw new SyntaxError('Expected "," or ")"');
    }
  }
  return parseApply(expr, program.slice(1));
}

// parsing an egg program and creating a syntax tree
function parse(program) {
  const { expr, rest } = parseExpression(program);
  if (skipSpace(rest).length != 0) {
    throw new SyntaxError('Unexpected text after program');
  }
  return expr;
}


/*
  Eggelicious!
  ------------
  parse('=(a, 10)');
  { 
    type: 'apply',
    operator: { type: 'word', value: '=' },
    args: [ { type: 'word', value: 'a' }, { type: 'value', value: 10 } ] 
  }
*/

// evaluating the result of parse
const specialForms = Object.create(null);
function evaluate(expr, scope) {
  switch (expr.type) {
    case 'value': return expr.value;
    case 'word':
      const { name } = expr
      if (name in scope) return scope[name];
      throw new ReferenceError(`Undefined binding: ${name}`);
    case 'apply':
      const { operator, args } = expr;
      if (operator.type == 'word' && operator.name in specialForms) {
        return specialForms[operator.name](expr.args, scope);
      } else {
        let op = evaluate(operator, scope);
        if (typeof op == 'function') {
          return op(...args.map(arg => evaluate(arg, scope)));
        } else {
          throw new TypeError('Applying a non-function');
        }
      } 
  } 
}

// Adding specialForms
specialForms.if = (args, scope) => {
  if (args.length != 3) {
    throw new SyntaxError('Wrong number of arguments to if');
  } else if (evaluate(args[0], scope) !== false) {
    return evaluate(args[1], scope);
  } else {
    return evaluate(args[2], scope);
  }
};

specialForms.while = (args, scope) => {
  if (args.length != 2) {
    throw new SyntaxError('Wrong number of arguments to while');
  }

  while (evaluate(args[0], scope) !== false) {
    evaluate(args[1], scope);
  }

  return false;
};

specialForms.do = (args, scope) => {
  let value = false;
  for (let arg of args) {
    evaluate(arg, scope);
  }
  return value;
};

specialForms.define = (args, scope) => {
  if (args.length != 2 || args[0].type != 'word') {
    throw new SyntaxError('Incorrect use of define');
  }
  const value = evaluate(args[1], scope);
  scope[args[0].name] = value;
  return value;
};


// The Environment
const topScope = Object.create(null);

topScope.true = true;
topScope.false = false;

// Adding operators to The Environment
for (let op of ['+', '-', '*', '/', '==', '<', '>', '/']) {
  topScope[op] = new Function('a', 'b', `return a ${op} b`);
}

// Adding a way to print values
topScope.print = value => {
  console.log(value);
  return value;
};



run(`
do(define(total, 0),
   define(count, 1),
   while(<(count, 11),
         do(define(total, +(total, count)),
            define(count, +(count, 1)))),
   print(total))
`); // 55

// Functions in Egg
specialForms.fun = (args, scope) => {
  if (args.length === 0) {
    throw new SyntaxError('Functions need a body');
  }
  let body = args[args.length - 1];
  let params = args.slice(0, args.length - 1).map(expr => {
    if (expr.type != 'word') {
      throw new SyntaxError('Parameter names must be words');
    }
    return expr.name;
  });

  return function() {
    if (arguments.length != params.length) {
      throw new TypeError('Wrong number of arguments');
    }
    let localScope = Object.create(scope);
    for (let i = 0; i < arguments.length; i++) {
      localScope[params[i]] = arguments[i];
    }
    return evaluate(body, localScope);
  }
}

run(`
do(define(plusOne, fun(a, +(a, 1))),
   print(plusOne(10)))
`); // 11

run(`
do(define(pow, fun(base, exp,
     if(==(exp, 0),
        1,
        *(base, pow(base, -(exp, 1)))))),
   print(pow(2, 10)))
`); // 1024

// Running Egg programs
function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}

// Exercises

/*
  Add support for arrays in Egg by adding the following
  3 functions to the top scope
  ------------------------------------------------------

  1. array(...values): to construct an array containing the
    argument values.

  2. length(array): to get an array's length

  3. element(array, n): to fetch the nth element from an array
*/

topScope.array = function() {
  return [...arguments];
};

topScope.length = function(array) {
  return array.length;
};

topScope.element = function(array, index) {
  return array[index];
}

// Authors solutions

topEnv.array = (...values) => values;

topEnv.length = array => array.length;

topEnv.element = (array, i) => array[i];