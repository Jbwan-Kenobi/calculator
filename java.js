let firstNumber = "";
let secondNumber = "";
let firstOperator = "";
let secondOperator = "";
let answer = 0;
let state = "empty";

const allClear = function() {
	firstNumber = "";
	secondNumber = "";
	firstOperator = "";
	secondOperator = "";
	answer = 0;
	state = "empty";
	display.textContent = "";
};

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
	if(b === 0) {
		return "Really!"
	}
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

function calculate() {
	firstNumber = Number(firstNumber);
	secondNumber = Number(secondNumber);
	calc = firstOperator;
	answer = operate(firstNumber, secondNumber, calc);

	if (answer === "Really!") {
    		display.textContent = "Really!";
    		firstNumber = "";
		secondNumber = "";
		firstOperator = "";
		secondOperator = ""
		state = "empty";    						
	} else {
    		display.textContent = (Math.round(answer * 10) / 10).toString();
		firstNumber = answer.toString();
		secondNumber = "";
		firstOperator = "";
		secondOperator = ""
		state = "resultShown";
	}
};

function chainCalculate() {
	firstNumber = Number(firstNumber);
	secondNumber = Number(secondNumber);
	calc = firstOperator;
	answer = operate(firstNumber, secondNumber, calc);
	
	if (answer === "Really!") {
		display.textContent = "Really!";
		firstNumber = "";
		secondNumber = "";
		firstOperator = "";
		secondOperator = ""
		state = "empty"
	} else {
		display.textContent = Math.round(answer*10)/10 + " " + secondOperator + " ";
		firstNumber = answer.toString();
		secondNumber = "";
		firstOperator = secondOperator;
		secondOperator = "";
		state = "chainResult";
	}
};

const numbers = document.querySelectorAll(".number");
const symbols = document.querySelectorAll(".symbol");
var display = document.getElementById("display");
const keyboard = document.querySelectorAll("buttons");

numbers.forEach(number => {
	number.addEventListener("click", () => {
			if(state === "resultShown") {
    			// reset for new calculation
    			firstNumber = "";
    			secondNumber = "";
    			firstOperator = "";
    			answer = 0;
    			state = "empty";
			}
			if(firstOperator === "") {
				if(number.textContent === ".") {
					if(firstNumber.includes(".")) {				
				} else {
					firstNumber += number.textContent;
					display.textContent = firstNumber;
					state = "typingFirst";
					}
				} else {
					firstNumber += number.textContent;
					display.textContent = firstNumber;
					state = "typingFirst";
					} 
			} else {
				if(number.textContent === ".") {
					if(secondNumber.includes(".")) {				
				} else {
					secondNumber += number.textContent;
					display.textContent = firstNumber + " " + firstOperator + " " + secondNumber;
					state = "typingSecond"
				}
				} else {
					secondNumber += number.textContent;
					display.textContent = firstNumber + " " + firstOperator + " " + secondNumber;
					state = "typingSecond"
					} 
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
				allClear();

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
					chainCalculate();
				};
				//if equals is pressed
				if(symbol.textContent === "=" && secondNumber !=="") {
					calculate();
				};

			};

		};

	});
});

document.addEventListener('keydown', (event)=> {
	if(/\d+|\./.test(event.key) == true) {
	console.log(/^-?\d+(\.\d+)?$/.test(event.key));
		if(firstNumber !== "" && firstOperator == "/" && event.key.startsWith === "0") {
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

			if(firstOperator === "") {
				if(event.key === ".") {
					if(firstNumber.includes(".")) {				
					} else {
						firstNumber += event.key;
						display.textContent = firstNumber;
						state = "typingFirst";
					}
					} else {
						firstNumber += event.key;
						display.textContent = firstNumber;
						state = "typingFirst";
					} 
			} else {
				if(event.key === ".") {
					if(secondNumber.includes(".")) {				
					} else {
						secondNumber += event.key;
						display.textContent = firstNumber + " " + firstOperator + " " + secondNumber;
						state = "typingSecond"
					}
					} else {
						secondNumber += event.key;
						display.textContent = firstNumber + " " + firstOperator + " " + secondNumber;
						state = "typingSecond"
					} 
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
				allClear()
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
					answer = operate(firstNumber, secondNumber, calc);
					if (answer === "Really!") {
    						display.textContent = "Really!";
    						firstNumber = "";
							secondNumber = "";
							firstOperator = "";
							secondOperator = ""
							state = "empty";    						
					} else {
    						display.textContent = (Math.round(answer * 10) / 10).toString() + " " + event.key + " ";
							firstNumber = answer.toString();
							secondNumber = "";
							firstOperator = secondOperator;
							secondOperator = ""
							state = "resultShown";
							}
				};				
				//if equals is pressed
				if(event.key == "=" && secondNumber !==""|| event.key == "Enter" && secondNumber !== "") {
					calculate();
				};

		};

	};
	console.log(event.key);
});
    
