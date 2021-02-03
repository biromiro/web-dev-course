const updateValue = (calculator, result) => {
  if (calculator.firstNumber === '0') calculator.firstNumber = ''
  if (calculator.secondNumber === '0') calculator.secondNumber = ''
  result.innerText =
    calculator.state === 'FIRSTNUM'
      ? calculator.firstNumber === ''
        ? '0'
        : calculator.firstNumber
      : calculator.secondNumber === ''
      ? '0'
      : calculator.secondNumber
}

const updateNumber = (calculator, number, result) => {
  console.log(number)
  if (calculator.state == 'FIRSTNUM') {
    calculator.firstNumber += number
  } else {
    calculator.secondNumber += number
  }
  console.log(
    `First Number = ${calculator.firstNumber}, Second Number = ${calculator.secondNumber}`
  )
  updateValue(calculator, result)
}

function getResult(calculator) {
  switch (calculator.op) {
    case '*':
      return (
        parseFloat(
          calculator.firstNumber === '' ? '0' : calculator.firstNumber
        ) *
        parseFloat(
          calculator.secondNumber === '' ? '0' : calculator.secondNumber
        )
      ).toString()
    case '/':
      return (
        parseFloat(
          calculator.firstNumber === '' ? '0' : calculator.firstNumber
        ) /
        parseFloat(
          calculator.secondNumber === '' ? '0' : calculator.secondNumber
        )
      ).toString()
    case '-':
      return (
        parseFloat(
          calculator.firstNumber === '' ? '0' : calculator.firstNumber
        ) -
        parseFloat(
          calculator.secondNumber === '' ? '0' : calculator.secondNumber
        )
      ).toString()
    case '+':
      return (
        parseFloat(
          calculator.firstNumber === '' ? '0' : calculator.firstNumber
        ) +
        parseFloat(
          calculator.secondNumber === '' ? '0' : calculator.secondNumber
        )
      ).toString()
  }
  return '0'
}

const uponOperation = (calculator, operation, result) => {
  console.log(operation)
  if (operation.classList.contains('equals')) {
    calculator.firstNumber =
      calculator.state === 'FIRSTNUM'
        ? calculator.firstNumber
        : getResult(calculator)
    calculator.secondNumber = '0'
    calculator.state = 'FIRSTNUM'
  } else if (operation.classList.contains('backspace')) {
    if (calculator.state === 'FIRSTNUM') {
      calculator.firstNumber = calculator.firstNumber.substr(
        0,
        calculator.firstNumber.length - 1
      )
    } else {
      calculator.secondNumber = calculator.secondNumber.substr(
        0,
        calculator.secondNumber.length - 1
      )
    }
  } else if (operation.classList.contains('delete')) {
    if (calculator.state === 'FIRSTNUM') calculator.firstNumber = '0'
    else calculator.secondNumber = '0'
  } else if (operation.classList.contains('multiply')) {
    calculator.op = '*'
    calculator.state = 'SECONDNUM'
  } else if (operation.classList.contains('divide')) {
    calculator.op = '/'
    calculator.state = 'SECONDNUM'
  } else if (operation.classList.contains('plus')) {
    calculator.op = '+'
    calculator.state = 'SECONDNUM'
  } else if (operation.classList.contains('minus')) {
    calculator.op = '-'
    calculator.state = 'SECONDNUM'
  }
  updateValue(calculator, result)
}

let calculator = {
  state: 'FIRSTNUM',
  firstNumber: '',
  secondNumber: '',
  op: '*'
}

const numbers = document.querySelectorAll('.number')
const operations = document.querySelectorAll('.operation')
const result = document.querySelector('.screen')

numbers.forEach((element) => {
  element.addEventListener('click', function (element) {
    console.log(element)
    updateNumber(calculator, element.target.innerText, result)
  })
})

operations.forEach((element) => {
  element.addEventListener('click', function (element) {
    if (element.target.tagName === 'I')
      uponOperation(calculator, element.target.parentElement, result)
    else uponOperation(calculator, element.target, result)
  })
})
