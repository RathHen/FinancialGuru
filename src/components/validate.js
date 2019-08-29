import React from 'react';

const validate = values => {
  // console.log(values)
    const errors = {}
    let inc = 0;
    let min = 0;
    if(!values.Income) {
      errors.Income = 'Required'
    } else {
      inc = Number(values.Income);
    }

    if (!values.loans || !values.loans.length) {
      errors.loans = { _error: 'At least one loan must be entered' }
    } else {
      const loansArrayErrors = []
      values.loans.forEach((loan, loanIndex) => {
        const loanErrors = {}
        if (!loan || !loan.principal) {
          loanErrors.principal = 'Required'
          loansArrayErrors[loanIndex] = loanErrors
        }
        if (!loan || !loan.apr) {
          loanErrors.apr = 'Required'
          loansArrayErrors[loanIndex] = loanErrors
        }
        if (!loan || !loan.name) {
          loanErrors.name = 'Required'
          loansArrayErrors[loanIndex] = loanErrors
        }
        if (!loan || !loan.min) {
          loanErrors.min = 'Required'
          loansArrayErrors[loanIndex] = loanErrors
        } else {
          min += Number(loan.min);
        }
      })
      if(loansArrayErrors.length) {
        errors.loans = loansArrayErrors
      }
      if (min > inc){
       
        errors.Income = 'Income lower than Minimum Payments'
     
      }
    }
    return errors
  }
  

  export default validate

  