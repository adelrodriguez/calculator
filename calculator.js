$(document).ready(function() {
	var displayNum = '0';
	var log = "";
	var operation = [];

	// calculator variable that 
	var calculator = {
		changeDisplay: function(input) {
			// establish a limit of 10 digits
			if (displayNum.length < 11 && displayNum.length > 0) {
				// if calculator display is 0, replace with input
				// there's an exception if we have a dot
				if (displayNum === '0' && input !== '.') {
					displayNum = input;
				}
				else {
					displayNum += input;
				}
			}

			if (displayNum.length === 0) {
				displayNum = '0';
			}
			
			$(".result span").text(displayNum);
		},
		clearDisplay: function() {
			displayNum = '';
			calculator.changeDisplay('');
		},
		changeLog: function(input) {
			log += displayNum + " " + input + " ";
			$(".log span").text(log);
		},
		clearLog: function() {
			log = '';
			$(".log span").text(log);
		},
		storeValue: function(symbol) {
			// operations are pushed into an array of four elements
			// first element is the previous number, second element is the first operator
			// third element is the current number, fourth element is the second operator
			operation.push(parseFloat(displayNum, 10), symbol);
			if (operation.length === 4) {
				calculator.calculate();
			}
		}, 
		clearValues: function() {
			operation.splice(0, operation.length);
		},
		calculate: function() {
			var result;

			switch(operation[1]) {
				case '+':
					result = operation[0] + operation[2];
					break;
				case '-':
					result = operation[0] - operation[2];
					break;
				case '×':
					result = operation[0] * operation[2];
					break;
				case '÷':
					result = operation[0] / operation[2];
					break;
			}

			// limit the number of digits of the result
			result = Math.round(result * 100) / 100;
			if (result > 999999999999) {
				result = result.toExponential(7);
			}

			// depending if the second operator is an equal sign or and other operation
			// choose between displaying the result or storing the result in the array
			if (operation[3] === '=') {
				displayNum = result.toString();
				calculator.changeDisplay('');
			} else {
				operation.splice(0, operation.length - 1);
				operation.unshift(result);
			}
		}
	};

	// initialize the calculator at 0
	function init() {
		calculator.changeDisplay('0');
	}
	
	init();

	$(".number").click(function() {
		calculator.changeDisplay($(this).val());
	});

	$(".dot").click(function() {
		// limit input of only one dot
		if (displayNum.indexOf($(this).val()) === -1) {
			calculator.changeDisplay($(this).val());
		}
	});

	$(".backspace").click(function() {
		if (displayNum.length > 0) {
			// remove last character from string
			displayNum = displayNum.substring(0, displayNum.length - 1);
			calculator.changeDisplay('');
		}
	});

	$(".clear-entry").click(function() {
		calculator.clearDisplay();
	});

	$(".all-clear").click(function() {
		calculator.clearLog();
		calculator.clearDisplay();
		calculator.clearValues();
	});

	// change from positive to negative and viceversa by adding a '-' sign
	$(".pos-neg").click(function() {
		if (displayNum.indexOf('-') === 0) {
			displayNum = displayNum.substring(1, displayNum.length);
		} else {
			displayNum = '-' + displayNum;
		}

		calculator.changeDisplay('');
	});

	$(".operator").click(function() {
		calculator.changeLog($(this).val());
		calculator.storeValue($(this).val());
		calculator.clearDisplay();
	});

	$(".equals").click(function() {
		calculator.changeLog($(this).val());
		calculator.storeValue($(this).val());
		calculator.clearValues();
		calculator.clearLog();
	});
});