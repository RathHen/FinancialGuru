import React from 'react';

const validate = values => {
  console.log(values)
    const errors = {}
    if(!values.Income) {
      errors.Income = 'Required'
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
      })
      if(loansArrayErrors.length) {
        errors.loans = loansArrayErrors
      }
    }
    return errors
  }
  

  export default validate

  