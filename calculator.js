let runningTotal = 0; //aggregate total at the top 
let buffer = "0"; //keep track of what is typed
let previousOperator; // 12 + 3 where + is the previous operator
const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(parseInt(value))) { //if number pressed
    handleSymbol(value);
  } else { //if symbol pressed
    handleNumber(value);
  }
  rerender(); //render what is pressed
}

function handleNumber(value) { //handler for above number||symbol pressed 
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleMath(value) { //handler for value pressed 
  if (buffer === "0") {
    // do nothing
    return;
  }

  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;

  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

function handleSymbol(value) { //symbol handler 
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        // need two numbers to do math
        return;
      }
      flushOperation(parseInt(buffer)); //flush the operation when = pressed
      previousOperator = null;
      buffer = +runningTotal;
      runningTotal = 0;
      break;
    case "←": //deletion 
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleMath(value);
      break;
  }
}

function rerender() {
  screen.innerText = buffer;
}

function init() { //event listener for calc buttons. function must get an event!
  document.querySelector(".calc-buttons").addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
  });
}

init();