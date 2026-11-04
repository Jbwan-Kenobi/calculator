let firstNumber = "";
let secondNumber = "";
let firstOperator = "";
let secondOperator = "";
let state = "empty";

const allClear = function () {
	firstNumber = "";
	secondNumber = "";
	firstOperator = "";
	secondOperator = "";
	state = "empty";
	display.textContent = "";
};

const add = function (a, b) {
	return a + b
};

const subtract = function (a, b) {
	return a - b
};

const multiply = function (a, b) {
	return a * b
};

const divide = function (a, b) {
	if (b === 0) {
		return "Really!"
	}
	return a / b
};

const operate = function (firstNumber, secondNumber, operator) {
	if (operator === "+") {
		return add(firstNumber, secondNumber)
	};
	if (operator === "-") {
		return subtract(firstNumber, secondNumber)
	};
	if (operator === "*") {
		return multiply(firstNumber, secondNumber)
	};
	if (operator === "/") {
		return divide(firstNumber, secondNumber)
	};
	return "unknown operator";
};

function calculate() {
	firstNumber = Number(firstNumber);
	secondNumber = Number(secondNumber);
	answer = operate(firstNumber, secondNumber, firstOperator);

	if (answer === "Really!") {
		display.textContent = "Really!";
		firstNumber = "";
		secondNumber = "";
		firstOperator = "";
		secondOperator = ""
		state = "error";
	}
	return answer
};

function result(solution) {
	if (solution === "Really!") return;

	display.textContent = (Math.round(solution * 100) / 100).toString();
	firstNumber = solution.toString();
	secondNumber = "";
	firstOperator = "";
	secondOperator = "";
	state = "resultShown";
};

function chainCalculate(solution) {
	if (solution === "Really!") return;

	display.textContent = Math.round(solution * 100) / 100 + " " + secondOperator + " ";
	firstNumber = solution.toString();
	secondNumber = "";
	firstOperator = secondOperator;
	secondOperator = "";
	state = "chainResult";
};

function backspace() {
	if (state === "resultShown" || state === "error") {
		allClear();
	} else if (firstOperator === "" && secondNumber === "") {
		firstNumber = firstNumber.slice(0, -1);
		display.textContent = display.textContent.slice(0, -1);
		if (firstNumber.length < 1) {
			state = "empty"
		} else {
			state = "typingFirst"
		}
	} else if (firstNumber !== "" && firstOperator !== "" && secondNumber === "") {
		firstOperator = ""
		secondOperator = ""
		display.textContent = display.textContent.slice(0, -3);
		state = "typingFirst"
	} else {
		secondNumber = secondNumber.slice(0, -1);
		display.textContent = display.textContent.slice(0, -1);
		if (secondNumber.length < 1) {
			state = "operatorSelected"
		} else {
			state = "typingSecond"
		};
	}
};

function inputNumber(enteredNumber) {
	if (state === "resultShown") {
		if (enteredNumber === ".") return
		// reset for new calculation
		firstNumber = "";
		secondNumber = "";
		firstOperator = "";
		state = "empty";
	}
	if (firstOperator === "") {
		if (enteredNumber === "." && (firstNumber === "" || firstNumber.includes(".")))
			return
		firstNumber += enteredNumber;
		display.textContent = firstNumber;
		state = "typingFirst";

	} else {
		if (enteredNumber === "." && (secondNumber === "" || secondNumber.includes(".")))
			return
		secondNumber += enteredNumber;
		display.textContent = firstNumber + " " + firstOperator + " " + secondNumber;
		state = "typingSecond";
	}
};

function inputSymbol(enteredSymbol) {
	if (enteredSymbol === "Del" || enteredSymbol === "Delete" || enteredSymbol === "Backspace") {
		backspace();
	} else if (enteredSymbol.toLowerCase() === "c") {
		allClear();
	} else if (enteredSymbol === "=" || enteredSymbol === "Enter") {
		if (secondNumber !== "") {
			result(calculate());
		}
	} else {
		if (firstNumber !== "") {
			if (secondNumber === "") {
				if (firstOperator === "") {
					display.textContent += " " + enteredSymbol + " ";
				} else {
					display.textContent = display.textContent.slice(0, -3);
					display.textContent += " " + enteredSymbol + " ";
				}
				firstOperator = enteredSymbol;
			} else {
				secondOperator = enteredSymbol;
			}
			state = "operatorSelected";
		}
		if (secondNumber !== "") {
			chainCalculate(calculate());
		}

	}
};

const numbers = document.querySelectorAll(".number");
const symbols = document.querySelectorAll(".symbol");
var display = document.getElementById("display");

numbers.forEach(number => {
	number.addEventListener("click", () => {
		inputNumber(number.textContent)
	});
});

symbols.forEach(symbol => {
	symbol.addEventListener("click", () => {
		inputSymbol(symbol.textContent)
	});
});

document.addEventListener('keydown', (event) => {
	if (/^[\d.]$/.test(event.key) == true) {
		inputNumber(event.key)

	} else if (event.key === "Delete" || event.key === "Backspace") {
		inputSymbol(event.key)

	} else if (/^[-+*/=cC]$/.test(event.key) == true || event.key === "Enter") {
		inputSymbol(event.key)
	};
});
