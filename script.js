const buttonsContainer = document.getElementById("buttons");
const display = document.getElementById("display");

const buttons = [
  "7",
  "8",
  "9",
  "÷",
  "4",
  "5",
  "6",
  "×",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "=",
  "+",
  "C",
];

let currentInput = "";
let lastResult = null;

const renderButtons = () => {
  buttonsContainer.innerHTML = "";
  buttons.forEach((btn) => {
    const buttonEl = document.createElement("button");
    buttonEl.textContent = btn;
    if ("÷×-+=C".includes(btn)) buttonEl.classList.add("operation");
    if (btn === "0") buttonEl.classList.add("zero");
    buttonsContainer.appendChild(buttonEl);

    buttonEl.addEventListener("click", () => handleButtonClick(btn));
  });
};

const updateDisplay = (text) => {
  display.textContent = text || "0";
};

const calculateResult = () => {
  let expression = currentInput.replace(/÷/g, "/").replace(/×/g, "*");

  try {
    const result = Function('"use strict";return (' + expression + ")")();
    return result;
  } catch {
    return "Error";
  }
};

const handleButtonClick = (btn) => {
  if (btn === "C") {
    currentInput = "";
    lastResult = null;
    updateDisplay(currentInput);
    return;
  }

  if (btn === "=") {
    const result = calculateResult();
    updateDisplay(result);
    lastResult = result;
    currentInput = result.toString();
    return;
  }

  const operators = ["+", "-", "×", "÷"];
  const lastChar = currentInput.slice(-1);

  if (operators.includes(btn)) {
    if (currentInput === "" && btn !== "-") return;
    if (operators.includes(lastChar)) {
      currentInput = currentInput.slice(0, -1) + btn;
      updateDisplay(currentInput);
      return;
    }
  }

  currentInput += btn;
  updateDisplay(currentInput);
};

renderButtons();
updateDisplay("0");
