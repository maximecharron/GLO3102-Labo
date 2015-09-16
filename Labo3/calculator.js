//We want to use memoization to make it faster. See http://stackoverflow.com/questions/3959211/fast-factorial-function-in-javascript
var computedFactorial = [];

Math.factorial = function (number) {
    if (number == 0 || number == 1)
        return 1;
    if (computedFactorial[number] > 0)
        return computedFactorial[number];
    return computedFactorial[number] = factorial(number - 1) * number;
}

var Calculator = function () {
    var computedEquation = "";

    var memory;

    this.equals = function() {
        console.log('Equation is :', computedEquation);
        var solution = eval(computedEquation);
        computedEquation = '';
        return solution;
    }

    this.clearEquation = function () {
        computedEquation = "";
        return this;
    }

    this.setMemory = function (memoryValue) {
        memory = memoryValue;
    }

    this.getMemory = function () {
        return memory;
    }

    this.add = function (value) {
        computedEquation += '+'
        if (typeof value !== 'undefined') { //If undefined we do nothing with it.
            computedEquation += parseFloat(value);
        }
        return this;
    }

    this.sub = function (value) {
        computedEquation += '-'
        if (typeof value !== 'undefined') {
            computedEquation += parseFloat(value);
        }
        return this;
    }

    this.multiplication = function (value) {
        computedEquation += '*'
        if (typeof value !== 'undefined') {
            computedEquation += parseFloat(value);
        }
        return this;
    }

    this.divide = function (value) {
        computedEquation += '/'
        if (typeof value !== 'undefined') {
            if (value == 0) {
                throw "Only Chuck Norris can divide by 0.";
            }
            computedEquation += parseFloat(value);
        }
        return this;
    }
    //For the trigo functions, we use the exsiting functions in Math.
    this.sin = function (value) {
        if (typeof value !== 'undefined') {
            computedEquation += 'Math.sin(' + parseFloat(value) + ')';
        }
        return this;
    }

    this.cos = function (value) {
        if (typeof value !== 'undefined') {
            computedEquation += 'Math.cos(' + parseFloat(value) + ')';
        }
        return this;
    }

    this.tan = function () {
        if (typeof value !== 'undefined') {
            computedEquation += 'Math.tan(' + parseFloat(value) + ')';
        }
        return this;
    }

    //We use the existing
    this.factorial = function (value) {
        if (typeof value !== 'undefined') {
            computedEquation += 'Math.factorial(' + parseFloat(value) + ')';
        }
        return this;
    }

}
