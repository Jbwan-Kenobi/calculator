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
	}
	return answer
};

function result(solution) {
		if(solution ==="Really!") return;
		
 		display.textContent = (Math.round(solution * 10) / 10).toString();
		firstNumber = solution.toString();
		secondNumber = "";
		firstOperator = "";
		secondOperator = "";
		state = "resultShown";
};

function chainCalculate(solution) {
		if(solution ==="Really!") return;
		
		display.textContent = Math.round(solution*10)/10 + " " + secondOperator + " ";
		firstNumber = solution.toString();
		secondNumber = "";
		firstOperator = secondOperator;
		secondOperator = "";
		state = "chainResult";
};

function backspace() {
	if(firstOperator == "" && secondNumber == "") {
		firstNumber = firstNumber.slice(0, -1);
		display.textContent = display.textContent.slice(0, -1);
		if(firstNumber.length < 1) {
			state = "empty"
			} else {
			state = "typingFirst"
			}
	} else if(firstNumber !== "" && firstOperator !== "" && secondNumber =="") {
			firstOperator = ""
			display.textContent = display.textContent.slice(0, -3);
			state = "typingFirst"
	} else {
		secondNumber = secondNumber.slice(0, -1);
		display.textContent = display.textContent.slice(0, -1);
		if(secondNumber.length < 1) {
		state = "operatorSelected"
		} else {
		state = "typingSecond"
		};			 
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
			backspace();
		} else {
			//clear all from the calculator
			if(symbol.textContent == "C") {
				allClear();
			} else {
				//if equals is pressed
				if(symbol.textContent === "=") {
					if (secondNumber === "") {
					} else {
						result(calculate())
						}					
				} else {
					if(firstNumber === "") {
					} else {
						display.textContent += " " + symbol.textContent + " ";

						if(firstOperator === "") {
							firstOperator = symbol.textContent;
							state = "operatorSelected"
						} else {
							secondOperator = symbol.textContent;
							state = "operatorSelected"
						};
						//do the calculation
						if(firstNumber !== "" && secondNumber !== "") {
						chainCalculate(calculate());
						};

					};
				};
			};
		};
	});
});

document.addEventListener('keydown', (event)=> {
	if(/\d+|\./.test(event.key) == true) {
			if(state === "resultShown") {
    			// reset for new calculation
    			firstNumber = "";
    			secondNumber = "";
    			firstOperator = "";
    			answer = 0;
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
	} else if(event.key === "Delete" || event.key === "Backspace") {
			backspace()
			
		} else if (/[-+*/=cC]/.test(event.key) == true || event.key === "Enter") {
			//clear all from the calculator
			if(event.key.toLowerCase() === "c") {
				allClear()
			} else {
				if(event.key === "=" || event.key === "Enter") {
					if (secondNumber === "") {
					} else {
						result(calculate())
						}					
				} else {
				if(firstNumber ===""){
				} else { 
						display.textContent += " " + event.key + " ";
												
						if (firstOperator == "") {
							firstOperator = event.key;
							state = "operatorSelected";
						} else {
							secondOperator = event.key;
							state = "operatorSelected";
						}
						//do the calculation
						if(firstNumber !== "" && secondNumber !== "") {
							chainCalculate(calculate());
						};	
					};			
				};
			};
		};
});

    
