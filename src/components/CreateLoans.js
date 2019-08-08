import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import validate from './validate';
import data from './data';

const renderPrincipal = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      {/* <label>{label}</label> */}
      <div className="ui small ight labeled input ">
          <label htmlFor="amount" className="ui label">$</label>
        <input {...input} type={type} placeholder={label} id="amount" />
        <div className="ui basic label">.00</div>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  )

  const renderName = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      {/* <label>{label}</label> */}
      <div className="ui small right labeled input">
          <label htmlFor="amount" className="ui label">$</label>
        <input {...input} type={type} placeholder={label} id="amount" />
        {touched && error && <span>{error}</span>}
        <div className="ui basic label">.00</div>
      </div>
    </div>
  )

  const renderIncome = ({ input, label, type, meta: { touched, error } }) => 
  (
    <div>
      {/* <label>{label}</label> */}
      <div className="ui big right labeled input">
          <label htmlFor="amount" className="ui label">$</label>
        <input {...input} type={type} placeholder={label} id="amount" />
        <div className="ui basic label">.00</div>
        {touched && error && <div className="ui pointing left red basic label">{error}</div>}
        
      </div>
    </div>
  )

//   const displayError = error => (
//     <div className="ui poiting red basic label">
//       {error}
//     </div>

//   )

  const renderAPR = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      {/* <label>{label}</label> */}
      <div className="ui small right labeled input">
          <label htmlFor="amount" className="ui label"></label>
        <input {...input} type={type} placeholder={label} id="amount" />
        <div className="ui basic label">%</div>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  )

  const renderDelete  = (
    <button class="ui icon button">
    <i class="cloud icon"></i>
    </button>
  )

  

const renderLoans = ({ fields, meta: { touched, error, submitFailed } }) => (
    
    <ul>
        <div>
        
        </div>
        
        <button className="positive ui labeled icon button" type="button" onClick={() => fields.push({})}>Add Loans/Debt
            <i className="plus circle icon"></i>
        </button>
        
        {(touched || submitFailed) && error && <span>{error}</span>}

        

        <table className="ui celled table">
      {/* Add loans group, mapping through the array and giving unique keys*/}
      <thead>
            <tr>
            <th>Name</th>
            <th>Principal</th>
            <th>APR</th>
            </tr>
        </thead>
      <tbody>

    
       
      {fields.map((loan, index) =>
        // <li key={index}>
            <tr key={index}>
        {/* Button to remove a loan */}

        <td>
        <h3> Loan #{index + 1}</h3>
        </td>
        {/* <button
            type="button"
            title="Remove loan"
            component={renderDelete}
            onClick={() => fields.remove(index)}
            /> */}

    
            
          {/* <Field 
            name={`${loan}.name`}
            type="text"
            component={renderName}
            label="Name of Loan"
            />
             */}
             <td>
          <Field 
            name={`${loan}.principal`}
            type="text"
            component={renderPrincipal}
            label="Principal"
        />
        </td>
        <td>
        <Field 
            name={`${loan}.apr`}
            type="number"
            component={renderAPR}
            label="APR"
        />
        </td>
         {/* <button 
        className="circular negative ui icon button" 
        onClick={() => fields.remove(index)} 
        type="button"
        title="Remove loan">
        <i className="trash alternate icon"></i>
        </button>
         */}
        </tr>
        // </li>
      )}
      </tbody>
      </table>
    </ul>
    
  )

const handleClick = (e) => {
   console.log(e)

}
  

const FieldArraysForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit(validate)}>
            <Field name="Income" type="text" component={renderIncome} label=" Income" />
            <FieldArray name= "loans" component={renderLoans}/>
            <div className="ui section divider"></div>
            <div className="ui buttons">
                <button className="ui primary button" type="submit" onClick={() => console.log("hello")} disabled={submitting}>Calculate</button>
                <div className="or"></div>
                <button className="ui button" type="button" disabled={pristine || submitting} onClick={reset}>Reset</button>
            </div>
        </form>
    )
}



export default reduxForm({
    form: 'loanCalc', 
    initialValues: {
        "loans": [
          {}
        ]
      },
    validate,
    data
})(FieldArraysForm)