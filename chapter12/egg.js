/*
  In Egg everything is an expression.
    bindings - any characters ! \w ! keyword
    numbers - sequence of digits
    strings - sequence of chars wrapped in "" and doesn't contain "
    applications
      - parethesis after expression
      - parenthesis contain arguments separated by commas
*/

// parsing an expression in egg
function parseExpression(program) {
  program = skipSpace(program);
  let match, expr;
  if (match = /^"([^"]*)"/.exec(program)) {
    expr = { type: 'value', value: match[1] };
  } else if (match = /^\d+\b/.exec(program)) {
    expr = { type: 'value', value: ~~match[0] };
  } else if (match = /^[^\s(),"]+/.exec(program)) {
    expr = { type: 'word', value: match[0] };
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

// checking if an expression is an application
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
      throw new ReferenceError(`Undefined binding: ${expr.name}`);
    case 'apply':
      const { operator, args } = expr;
      if (operator.type == 'word' && operator.name in specialForms) {
        return specialForms[operator.name](expr.args, scope);
      } else {
        throw new TypeError('Applying a non-function');
      } 
  } 
}

const test = evaluate(parse('+(4,4)'));