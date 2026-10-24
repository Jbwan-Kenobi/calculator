let firstNumber = "";
let secondNumber = "";
let firstOperator = "";
let secondOperator = "";
let answer = 0;
let state = "empty";

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

			if(state === "resultShown") {
    			// reset for new calculation
    			firstNumber = "";
    			secondNumber = "";
    			firstOperator = "";
    			answer = 0;
    			state = "empty";
			}

			if(firstOperator == "") {
				firstNumber += number.textContent;
				display.textContent = firstNumber;
				state = "typingFirst"
			} else {
				secondNumber += number.textContent;
				display.textContent = firstNumber + " " + firstOperator + " " + secondNumber;
				state = "typingSecond"
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
				state = "empty"
			} else {

				display.textContent += " " + symbol.textContent + " ";

				if(symbol.textContent !== "=" && firstOperator == "") {
					firstOperator = symbol.textContent;
					state = "operatorSelected"
					}
				else {
					secondOperator = symbol.textContent;
					state = "operatorSelected"
				};
				//do the calculation
				if(firstNumber !== "" && secondNumber !== "" && symbol.textContent !== "=") {
					firstNumber = Number(firstNumber);
					secondNumber = Number(secondNumber);
					calc = firstOperator;
					answer = Math.round(operate(firstNumber, secondNumber, calc)*10)/10;
					display.textContent = answer + " " + symbol.textContent + " ";
					firstNumber = answer.toString();
					secondNumber = "";
					firstOperator = secondOperator;
					secondOperator = ""
					state = "resultShown"
				};
				//if equals is pressed
				if(symbol.textContent == "=" && secondNumber !=="") {
					firstNumber = Number(firstNumber);
					secondNumber = Number(secondNumber);
					calc = firstOperator;
					answer = Math.round(operate(firstNumber, secondNumber, calc)*10)/10;
					display.textContent = answer;
					firstNumber = answer.toString();
					secondNumber = "";
					firstOperator = "";
					secondOperator = "";
					state = "resultShown"
				};

			};

		};

	});
});

document.addEventListener('keydown', (event)=> {
	if(/\d+|\./.test(event.key) == true) {
	console.log(/^-?\d+(\.\d+)?$/.test(event.key));
		if(firstNumber !== "" && firstOperator == "/" && event.key == "0") {
				display.textContent = "Really!"
		} else {

			if(state === "resultShown") {
    			// reset for new calculation
    			firstNumber = "";
    			secondNumber = "";
    			firstOperator = "";
    			answer = 0;
				display.textContent = "";
    			state = "empty";
			}

			if(firstOperator == "") {
				firstNumber += event.key;
				display.textContent = firstNumber;
				state = "typingFirst";
			} else {
				secondNumber += event.key;
				display.textContent = firstNumber + " " + firstOperator + " " + secondNumber;
				state = "typingSecond";
			};
		};
	} else if(event.key === "Delete" || event.key === "Backspace") {
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
			
		} else if (/[-+*/=cC]/.test(event.key) == true || event.key === "Enter") {

			/*if(firstOperator !== "" && firstOperator !== "=") {
				display.textContent = display.textContent.slice(0, -3);
				firstOperator = "";
			};*/

			//clear all from the calculator
			if(event.key.toLowerCase() === "c" || firstNumber === "") {
				firstNumber = "";
				secondNumber = "";
				firstOperator = "";
				secondOperator = "";
				answer = 0;
				display.textContent = "";
				state = "empty";
			} else {

				if (event.key !== "Enter") {
					display.textContent += " " + event.key + " ";
			}
				if(event.key !== "=" && event.key !== "Enter") {
					if (firstOperator == "") {
						firstOperator = event.key;
						state = "operatorSelected";
					} else {
						secondOperator = event.key;
						state = "operatorSelected";
					}
				};
				//do the calculation
				if(firstNumber !== "" && secondNumber !== "" && event.key !== "=" && event.key !== "Enter") {
					firstNumber = Number(firstNumber);
					secondNumber = Number(secondNumber);
					calc = firstOperator;
					answer = Math.round(operate(firstNumber, secondNumber, calc)*10)/10;
					display.textContent = answer + " " + event.key + " ";
					firstNumber = answer.toString();
					secondNumber = "";
					firstOperator = secondOperator;
					secondOperator = ""
					state = "resultShown";
				};
				//if equals is pressed
				if(event.key == "=" && secondNumber !==""|| event.key == "Enter" && secondNumber !== "") {
					firstNumber = Number(firstNumber);
					secondNumber = Number(secondNumber);
					calc = firstOperator;
					answer = Math.round(operate(firstNumber, secondNumber, calc)*10)/10;
					display.textContent = answer;
					firstNumber = answer.toString();
					secondNumber = "";
					firstOperator = "";
					secondOperator = "";
					state = "resultShown";
				};

			

		};

	};
	console.log(event.key);
});
    
