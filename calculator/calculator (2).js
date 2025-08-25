
'use strict'

const screen = document.querySelector("#screen");

function appendNumber(num){
	screen.value += num;
}

function appendOperator(op){
	screen.value += op;
}

function clearAll(){
	screen.value = "";
}

function backspace() {
	screen.value = screen.value.slice(0, -1);
}

function calculate() {
	try{
		screen.value = eval(screen.value);
	}
	catch(error){
		screen.value = "ERROR";
	}
}