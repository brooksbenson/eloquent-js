// this variable is available to every execution context
// this variable is stored in the execution contexts object

// this variable is assigned to the global object in a regular function call
// this variable is assigned to an object in a method call
// this keyword is not assigned a value until a function where it is defined is invoked

console.log(this); //window object

var car = {
    make: "BMW",
    model: "X3",
    year: 2009,
    describe: function() {
        console.log(`This ${this.make}, ${this.model} was made in ${this.year}`); //This BMW, X3, was made in 2009.
        function displayWindow() {
            console.log(this); //window object
        }
    }
};

//Method sharing

var car2 = {
    make: "Volkswagon",
    model: "Jetta",
    year: 2016
};

car2.describe = car.describe;
car2.describe(); //This Volkswagon, Jetta, was made in 2009.

//this variable refers to the car2 object




