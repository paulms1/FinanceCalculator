var amountBorrowed

var salary

var repaymentRate

var adminFee

var repaymentAmount

var monthlyPayment

var repaymentTime


//Retrieves the values inputted by the user and assigns them to the appropriate global variables
function getInputValues() {
    document.getElementById('calculatorBtn').addEventListener('click', function () {
        amountBorrowed = document.getElementById('amountBorrowed').value
        salary = document.getElementById('salary').value
        repaymentRate = document.getElementById('repaymentPercentage').value / 100
        amountBorrowed = parseFloat(amountBorrowed)
        salary = parseFloat(salary)






        //validation checks go here

         salary = salary || 0
         amountBorrowed = amountBorrowed || 0
         repaymentRate = repaymentRate || 0


    typeChecking(amountBorrowed,salary,repaymentRate)

    })
}

// Does all calculations necessary for functionality

function calculations(amountBorrowed, salary, repaymentRate) {
    adminFee = (amountBorrowed / 100) * 5
    console.log('adminFee', adminFee)
    if (amountBorrowed < 6400) {
        repaymentAmount = amountBorrowed
    } else if (amountBorrowed >= 6400 && amountBorrowed < 7200) {
        repaymentAmount = (+amountBorrowed + 500)
    } else {
        repaymentAmount = (+amountBorrowed + 1000)
    }
    monthlyPayment = (salary / 12) * repaymentRate
    repaymentTime = Math.ceil((repaymentAmount / monthlyPayment))
    if (monthlyPayment > amountBorrowed) {
        monthlyPayment = amountBorrowed
    }

    paymentPercentage = repaymentRate * 100
    adminFee = parseFloat(adminFee).toFixed(2)
    monthlyPayment = parseFloat(monthlyPayment).toFixed(2)
    totalSum = parseFloat(repaymentAmount).toFixed(2)

      if (salary < 1) {
          monthlyPayment = 0.01
      }

    console.log('total', repaymentAmount, 'monthly', monthlyPayment, 'time', repaymentTime)
    document.getElementById('calculationsDisplay').innerHTML = `<p>Based on your finances values your costs will be as follows:</p>
    <p>Admin fee - £${adminFee}</p><p>Total amount repayable - £${totalSum}</p><p>Monthly repayments - £${monthlyPayment}</p><p>Time taken to repay total amount - ${repaymentTime} months</p>`

}

// document.addEventListener('DOMContentLoaded', function () {
//     getInputValues()
// })

// Guards against wrong type of data being sent via inspector manipulation

function typeChecking(amountBorrowed, salary, repaymentRate) {
   // amountBorrowed = amountBorrowed || 0
    if (typeof amountBorrowed === 'number') {
        if (typeof salary === 'number') {
            if (typeof repaymentRate === 'number') {
              validateAndCalculate(amountBorrowed, salary, repaymentRate)
            }
        }
    } else if (amountBorrowed == 0) {
        if (salary == 0) {
            if (repaymentRate == 0) {
                validateAndCalculate(amountBorrowed, salary, repaymentRate)
            }
        }
    } else {
        document.getElementById('messages').innerHTML = `<p>Entered values must be numbers</p>`
    }
}

//Validates inputted data and runs calculation function if all okay, throws error messages if not

function validateAndCalculate(amountBorrowed, salary, repaymentRate) {
    if (amountBorrowed < 1 || amountBorrowed > 8000) {
        document.getElementById('messages').innerHTML = `<p>You must enter an amount to be borrowed between £1-£8,000</p>`
    } else if (salary < 0 || repaymentRate < 0) {
        document.getElementById('messages').innerHTML = `<p>You must enter positive values only!</p>`
        document.getElementById('calculationsDisplay').innerHTML = ``
    } else if (repaymentRate > 1 && salary == 0) {
        salary = 25000
        repaymentRate = 0.1
        document.getElementById('messages').innerHTML = `<p>As you didn't enter a salary, the following calculations have been based on a default salary of £25,000</p>
                                                                           <p>You entered an invalid repayment percentage, the following calculations are based on the minimum rate of 10%</p>`
        calculations(amountBorrowed, salary, repaymentRate)
    } else if (repaymentRate > 1) {
        repaymentRate = 0.1
        document.getElementById('messages').innerHTML = `<p>You entered an invalid repayment percentage, the following calculations are based on the minimum rate of 10%</p>`
        calculations(amountBorrowed, salary, repaymentRate)
    } else if (repaymentRate < 0.1) {
        if (salary == 0) {
            salary = 25000
            repaymentRate = 0.1
            document.getElementById('messages').innerHTML = `<p>As you didn't enter a salary, or entered a salary of less than 1, the following calculations have been based on a default salary of £25,000</p>
                                                                           <p>You entered an invalid repayment percentage, the following calculations are based on the minimum rate of 10%</p>`
            calculations(amountBorrowed, salary, repaymentRate)
        } else {
            repaymentRate = 0.1
            document.getElementById('messages').innerHTML = `<p>You entered an invalid repayment percentage, the following calculations are based on the minimum rate of 10%</p>`
            calculations(amountBorrowed, salary, repaymentRate)
        }
    } else if (repaymentRate == 0) {
        repaymentRate = 0.1
        document.getElementById('messages').innerHTML = `<p>As you didn't enter repayment percentage, the following calculations are based on the minimum rate of 10%</p>`
        calculations(amountBorrowed, salary, repaymentRate)
    } else if (salary == 0) {
        salary = 25000
        console.log('You didn\'t enter a salary, calculations based on default salary of 25000')
        document.getElementById('messages').innerHTML = `<p>As you didn't enter a salary, calculations have been based on default salary of 25000</p>`
        calculations(amountBorrowed, salary, repaymentRate)
    } else {
        calculations(amountBorrowed, salary, repaymentRate)
    }
}

