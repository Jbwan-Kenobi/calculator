let firstNumber = "";
let secondNumber = "";
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
	if(operator ==="+") {
		return add(firstNumber,secondNumber)
	};
	if(operator === "-") {
		return subtract(firstNumber,secondNumber)
	};
	if(operator === "*") {
		return multiply(firstNumber,secondNumber)
	};
	if(operator === "/") {
		return divide(firstNumber,secondNumber)
	};
	return "unknown operator";
};

const numbers = document.querySelectorAll(".number");
const symbols = document.querySelectorAll(".symbol");
var display = document.getElementById("display");

numbers.forEach(number => {
	number.addEventListener("click", () => {	
		display.textContent += number.textContent;
		if(operator == "") {
			firstNumber += number.textContent;
		} else {
			secondNumber += number.textContent;
		};
	});
});

symbols.forEach(symbol => {
	symbol.addEventListener("click", () => {	

		if(symbol.textContent == "C"){
			firstNumber = "";
			secondNumber = "";
			operator = "";
			display.textContent = "";
		} else {

			display.textContent += " " + symbol.textContent + " ";

			if(symbol.textContent !== "=") {
				operator = symbol.textContent;
				symbols.forEach(symbol => {
				symbol.disable = true;
				});
			};

			if(symbol.textContent == "=") {
				firstNumber = Number(firstNumber);
				secondNumber = Number(secondNumber);
				let answer = operate(firstNumber, secondNumber, operator);
				display.textContent = answer;
				firstNumber = answer;
				secondNumber = "";
				console.log("first: " + firstNumber, " second: " + secondNumber, "operator: " + operator + " Answer: " + answer)
			};

		};

	});
});