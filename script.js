class Calculator{
    constructor(previousOperandTextElement, currnetOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currnetOperandTextElement = currnetOperandTextElement
        this.clear()
    }

    clear(){
        this.currnetOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        let tmp = this.currnetOperand.toString().slice(0, -1)
        this.currnetOperand = tmp
    }

    appendNumber(number){
        if(number === '.' && this.currnetOperand.includes('.')){
            return
        }
        this.currnetOperand = this.currnetOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        
        if(this.currnetOperand === ''){
            return
        }
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation.toString()
        this.previousOperand = this.currnetOperand + this.operation
        this.currnetOperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currnetOperand)
        if(isNaN(prev) || isNaN(curr)){
            return
        }
        switch(this.operation){
            case '/':
                computation = prev / curr
                break
            case '*':
                computation = prev * curr
                break
            case '-':
                computation = prev - curr
                break
            case '+':
                computation = prev + curr
                break
            default:
                return
        }
        this.currnetOperand = computation
        this.previousOperand = ''
        this.operation = undefined
    }

    updateDisplay(){
        this.currnetOperandTextElement.innerText = this.currnetOperand
        this.previousOperandTextElement.innerText = this.previousOperand 
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currnetOperandTextElement = document.querySelector('[data-current-operand]')
const modeButton = document.querySelector('[data-mode]')


const calculator = new Calculator(previousOperandTextElement, currnetOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})