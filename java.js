let firstNumber = 0;
let secondNumber = 0;
let operator = "";

const add = function(a, b) {
	return  a + b
};

const subtract = function(a, b) {
	return a - b
};

const multiply = function(a, b) {
	return  a * b
};

const divide = function(a, b) {
	return  a / b
};

const operate = function(firstNumber, secondNumber,operator) {
	if(operator = "+") {
		add(firstNumber,secondNumber)
	};
	if(operator = "-") {
		subtract(firstNumber,secondNumber)
	};
	if(operator = "*") {
		multiply(firstNumber,secondNumber)
	};
	if(operator = "/") {
		divide(firstNumber,secondNumber)
	};
};

const numbers = document.querySelectorAll(".number");
var display = document.getElementById("display");

numbers.forEach(number => {
  number.addEventListener("click", () => {
	display.textContent += number.id;
	firstNumber += number.id;
	console.log(firstNumber);
	console.log(display.textContent);
  });
});