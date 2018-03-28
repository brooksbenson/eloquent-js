class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }

  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value) {
    this.celcius = (value - 32) / 1.8;
  }

  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

const temp100 = Temperature.fromFahrenheit(100);
temp100 instanceof Temperature; //true