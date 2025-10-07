let firstNumber = "";
let secondNumber = "";
let firstOperator = "";
let secondOperator = "";

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
		/*display.textContent += number.textContent;*/
		if(firstOperator == "") {
			firstNumber += number.textContent;
			display.textContent = firstNumber;
		} else {
			secondNumber += number.textContent;
			display.textContent += secondNumber;
		};
	});
});

symbols.forEach(symbol => {
	symbol.addEventListener("click", () => {	
		console.log(firstOperator)

		if(symbol.textContent =="Del") {
			if(firstOperator == "" && secondNumber == "") {
				firstNumber = firstNumber.slice(0, -1);
				display.textContent = display.textContent.slice(0, -1);
			} else if(firstNumber !== "" && firstOperator !== "" && secondNumber =="") {
				firstOperator = ""
				display.textContent = display.textContent.slice(0, -3);
			} else {
				secondNumber = secondNumber.slice(0, -1);
				display.textContent = display.textContent.slice(0, -1);
			};
			
		} else {

			if(symbol.textContent == "C" || firstNumber == "") {
				firstNumber = "";
				secondNumber = "";
				firstOperator = "";
				display.textContent = "";
			} else {

				display.textContent += " " + symbol.textContent + " ";

				if(symbol.textContent !== "=" && firstOperator == "") {
					firstOperator = symbol.textContent;
					}
				else {
					secondOperator = symbol.textContent;
				};

				if(firstNumber !== "" && secondNumber !== "" && symbol.textContent !== "="){
					firstNumber = Number(firstNumber);
					secondNumber = Number(secondNumber);
					calc = firstOperator;
					let answer = Math.round(operate(firstNumber, secondNumber, calc)*10)/10;
					display.textContent = answer + " " + symbol.textContent + " ";
					firstNumber = answer;
					secondNumber = "";
					firstOperator = secondOperator;
					secondOperator = ""
					console.log("1st " + firstNumber + " 2nd " + secondNumber + " =Op " + firstOperator)
				};

				if(symbol.textContent == "=" && secondNumber !=="") {
					firstNumber = Number(firstNumber);
					secondNumber = Number(secondNumber);
					calc = firstOperator;
					let answer = Math.round(operate(firstNumber, secondNumber, calc)*10)/10;
					display.textContent = answer;
					firstNumber = answer;
					secondNumber = "";
					firstOperator = "";
					secondOperator = "";
					console.log("=1st " + firstNumber + " =2nd " + secondNumber + " =Op " + firstOperator)
				};

			};

		};

	});
});