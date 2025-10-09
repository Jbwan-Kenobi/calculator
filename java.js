let firstNumber = "";
let secondNumber = "";
let firstOperator = "";
let secondOperator = "";
let answer = 0;

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
const keyboard = document.querySelectorAll("buttons");

numbers.forEach(number => {
	number.addEventListener("click", () => {	
		// Divide by 0 response
		if(firstNumber !== "" && firstOperator == "/" && number.textContent == "0") {
			display.textContent = "Really!"
		} else {

			if(firstOperator == "") {
				firstNumber += number.textContent;
				display.textContent = firstNumber;
			} else {
				secondNumber += number.textContent;
				display.textContent = firstNumber + " " + firstOperator + " " + secondNumber;
			};
			//resets calculator when another number is pressed after equals
			/*if(answer !== 0) {
				firstNumber = number.textContent;
				secondNumber = "";
				firstOperator = "";
				answer = 0;
				display.textContent = firstNumber;
				console.log("1st O: " + firstOperator + " 1st N: " + firstNumber + " Ans: " + answer);
			};*/

		};

	});
});

symbols.forEach(symbol => {
	symbol.addEventListener("click", () => {
		//delete last character
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

			/*if(firstOperator !== "" && firstOperator !== "=") {
				display.textContent = display.textContent.slice(0, -3);
				firstOperator = "";
			};*/

			//clear all from the calculator
			if(symbol.textContent == "C" || firstNumber == "") {
				firstNumber = "";
				secondNumber = "";
				firstOperator = "";
				secondOperator = "";
				answer = 0;
				display.textContent = "";
			} else {

				display.textContent += " " + symbol.textContent + " ";

				if(symbol.textContent !== "=" && firstOperator == "") {
					firstOperator = symbol.textContent;
					}
				else {
					secondOperator = symbol.textContent;
				};
				//do the calculation
				if(firstNumber !== "" && secondNumber !== "" && symbol.textContent !== "=") {
					firstNumber = Number(firstNumber);
					secondNumber = Number(secondNumber);
					calc = firstOperator;
					answer = Math.round(operate(firstNumber, secondNumber, calc)*10)/10;
					display.textContent = answer + " " + symbol.textContent + " ";
					firstNumber = answer;
					secondNumber = "";
					firstOperator = secondOperator;
					secondOperator = ""
				};
				//if equals is pressed
				if(symbol.textContent == "=" && secondNumber !=="") {
					firstNumber = Number(firstNumber);
					secondNumber = Number(secondNumber);
					calc = firstOperator;
					answer = Math.round(operate(firstNumber, secondNumber, calc)*10)/10;
					display.textContent = answer;
					firstNumber = answer;
					secondNumber = "";
					firstOperator = "";
					secondOperator = "";
				};

			};

		};

	});
});

document.addEventListener('keydown', (event)=> {
	if(/^-?\d+(\.\d+)?$/.test(event.key) == true) {
	console.log(/^-?\d+(\.\d+)?$/.test(event.key));
		if(firstNumber !== "" && firstOperator == "/" && number.textContent == "0") {
				display.textContent = "Really!"
		} else {

			if(firstOperator == "") {
				firstNumber += event.key;
				display.textContent = firstNumber;
			} else {
				secondNumber += event.key;
				display.textContent = firstNumber + " " + firstOperator + " " + secondNumber;
			};
		};
	} else if (/[+\-*/=()^~%c]/.test(event.key) == true || event.key == "Enter") {
		if(event.key =="Delete" || event.key == "Backspace") {
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

			/*if(firstOperator !== "" && firstOperator !== "=") {
				display.textContent = display.textContent.slice(0, -3);
				firstOperator = "";
			};*/

			//clear all from the calculator
			if(event.key == "c" || firstNumber == "") {
				firstNumber = "";
				secondNumber = "";
				firstOperator = "";
				secondOperator = "";
				answer = 0;
				display.textContent = "";
			} else {

				display.textContent += " " + event.key + " ";

				if(event.key !== "=" && firstOperator == "") {
					firstOperator = event.key;
					}
				else {
					secondOperator = event.key;
				};
				//do the calculation
				if(firstNumber !== "" && secondNumber !== "" && event.key !== "=") {
					firstNumber = Number(firstNumber);
					secondNumber = Number(secondNumber);
					calc = firstOperator;
					answer = Math.round(operate(firstNumber, secondNumber, calc)*10)/10;
					display.textContent = answer + " " + event.key + " ";
					firstNumber = answer;
					secondNumber = "";
					firstOperator = secondOperator;
					secondOperator = ""
				};
				//if equals is pressed
				if(event.key == "=" && secondNumber !==""|| event.key == "Enter" && secondNumber !== "") {
					firstNumber = Number(firstNumber);
					secondNumber = Number(secondNumber);
					calc = firstOperator;
					answer = Math.round(operate(firstNumber, secondNumber, calc)*10)/10;
					display.textContent = answer;
					firstNumber = answer;
					secondNumber = "";
					firstOperator = "";
					secondOperator = "";
				};

			};

		};

	};
	console.log(event.key);
});
    
