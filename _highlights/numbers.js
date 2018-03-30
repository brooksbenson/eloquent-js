/*
  Write an expression that matches only JavaScript
  style numbers. It must support an optional plus 
  or minus sign in front of the number, the decimal
  dot, and exponential notation with an optional sign
  in front of the exponent.

  It is optional for their to be digits in front of or
  after the decimal dot, but the dot cannot exist alone.
*/

let number = /^[-+]?(\d+\.\d+([+-]?e)?\d+|\d+\.|\.\d+|\d+(e[-+]?\d+)?)$/i;
  //My solution implements a 4 part choice pattern
    //1: matches against numbers with a decimal in the "middle".
      //The pattern on the right side of the decimal supports
      //an option for exponential notation.
    //2: matches against numbers with a decimal on the end
    //3: matches against numbers with a decimal at the start
    //4: matches against numbers without a decimal with an option for
      //exponential notation

let authorsNumber = /^(\+|-|)(\d+(\.\d*)?|\.\d+)([eE](\+|-|)\d+)?$/;
/*
  The authors solution is organized into 3 groups.
    1: Matches against a plus, minus, or nill at the
      beginning of the number

    2: A choice pattern that matches against numbers
      without a decimal, numbers with a decimal at the
      end, numbers with a decimal at the start, and
      numbers with a decimal in the "middle".

      The pattern is eloquent because it is able to account for
      the decimal in all three scenarios with very few characters.

    3: Matches against exponential notation after the format of
      the number has been selected by the previous group.
*/