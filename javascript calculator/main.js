var firstNum = "", secondNum = "", 
	operator = "",
	answer = 0,
	firstNumCompleted = false;
	
function display(arg){
	$("#screen").text(arg);
}

function clearAll(){
	firstNum = "", secondNum = "", 
	operator = "",
	answer = 0,
	firstNumCompleted = false;
}

function hasDecimal(str){
	if (str.indexOf(".") == -1){
		return false;
	}
	return true;
}

function equals(){
	answer = calculate(firstNum, operator, secondNum);
	// partial Clear, to await possible next operator
	firstNum = answer;
	firstNumCompleted = true;
	operator = "";
	secondNum = "";
}

function calculate(num1, op, num2){
	//return eval(num1 + op + num2); // or, write some pratice code here later to avoid using 'eval'
	num1 = Number(num1);
	num2 = Number(num2);
	switch(op){
		case "+":
			return num1 + num2;
		case "-":
			return num1 - num2;
		case "/":
			return num1 / num2;
		case "*":
			return num1 * num2;
	}
}
	
$(document).ready(function(){
	
    $("button").click(function(){
		
		switch(this.id) {
			case "clear": 
			case "screen": 
				clearAll();
				display(answer);
				console.log(this.id)
				break;
			case "equals":
				equals();
				display(answer);
				console.log("equals");
				break;
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
			case "0":
				if (firstNumCompleted && operator){
					secondNum = secondNum + this.value;
					display(firstNum + operator + secondNum);
				} else if (firstNumCompleted && !operator){ // Digit after Equals press. Discard old answer, start new firstNum.
					firstNumCompleted = false;
					firstNum = this.value;
					display(firstNum);
				} else {                                    // firstNum not completed, still being built
					firstNum = firstNum + this.value;
					display(firstNum);
				}
				console.log(this.value);
				break;
			case ".":
				if(!firstNumCompleted && !hasDecimal(firstNum)){
					firstNum = firstNum + this.value;
					display(firstNum);
				} else if (firstNumCompleted && !operator){  // after Equals press
					firstNum = "0.";
					display(firstNum);
				} else if (firstNumCompleted && !hasDecimal(secondNum)){ // after Operator press
					secondNum = secondNum + ".";
					display(firstNum + operator + secondNum);
				} else { // firstNum already has a decimal, or secondNum already has a decimal
					// do nothing but refresh display
					display(firstNum + operator + secondNum);
					console.log("Ignoring extra decimal");
				}
				console.log(this.value);
				break;
			case "+":
			case "-":
			case "/":
			case "x":
				if (!firstNumCompleted){
					firstNumCompleted = true;
					operator = this.value;
					display(firstNum + operator);
				} else if (firstNumCompleted && !operator){  // from previous Equals press
					// firstNum is holding previous answer
					operator = this.value;
					display(firstNum + operator);
				} else if (firstNumCompleted && operator && !secondNum){
					operator = this.value;                  // replace previous operator
					display(firstNum + operator);
				} else {                                    // expression is complete. Evaluate and chain for next.
					equals();                               // sets firstNum to answer, operator to ""
					operator = this.value;
					display(firstNum + operator);
				}
				console.log(this.value)
				break;			
			default:
				console.log("switch default");
		}
    });
});