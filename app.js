// Constants --------------------------------
const OPERATOR_ADD = '+'
const OPERATOR_SUBTRACT = '-'
const OPERATOR_MULTIPLY = '*'
const OPERATOR_DIVIDE = '/'

// Variables --------------------------------
let currentOperand = ''
let previousOperand = ''
let operator = ''

//------------------------ Cached Element References ------------------------
const display = document.querySelector('.display')
const numberButtons = document.querySelectorAll('.number')
const operatorButtons = document.querySelectorAll('.operator')
const equalsButton = document.querySelector('.equals')
const clearButton = document.querySelector('.button.operator:nth-child(1)') // C button

//----------------------------- Event Listeners -----------------------------
numberButtons.forEach((button) => {
  button.addEventListener('click', () => handleNumber(button.innerText))
})

operatorButtons.forEach((button) => {
  button.addEventListener('click', () => handleOperator(button.innerText))
})

equalsButton.addEventListener('click', handleEquals)
clearButton.addEventListener('click', handleClear)

//------------------------------ Functions --------------------------------
function handleNumber(number) {
  currentOperand += number
  updateDisplay()
}

function handleOperator(op) {
  if (currentOperand === '') return // Prevent setting operator without a number
  if (previousOperand !== '') {
    calculate() // Calculate if there is a previous operation
  }
  operator = op
  previousOperand = currentOperand
  currentOperand = ''
}

function handleEquals() {
  if (currentOperand === '' || previousOperand === '') return // Prevent calculation with missing data
  calculate()
  operator = '' // Reset operator
}

function handleClear() {
  currentOperand = ''
  previousOperand = ''
  operator = ''
  updateDisplay()
}

function calculate() {
  let computation
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)

  if (isNaN(prev) || isNaN(current)) return

  switch (operator) {
    case OPERATOR_ADD:
      computation = prev + current
      break
    case OPERATOR_SUBTRACT:
      computation = prev - current
      break
    case OPERATOR_MULTIPLY:
      computation = prev * current
      break
    case OPERATOR_DIVIDE:
      computation = prev / current
      break
    default:
      return
  }

  currentOperand = computation.toString()
  previousOperand = ''
  updateDisplay()
}

function updateDisplay() {
  display.innerText = currentOperand || '0' // Display current operand or '0' if empty
}
