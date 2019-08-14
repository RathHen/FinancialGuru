import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import validate from './validate';
import _ from 'lodash';


class loans extends Component {

    constructor(props) {
        super(props);
      }

    renderPrincipal = ({ input, label, type, meta: { touched, error } }) => (
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
    
     renderName = ({ input, label, type, meta: { touched, error } }) => (
        <div>
          {/* <label>{label}</label> */}
          <div className="ui input">
            <input {...input} type={type} placeholder={label} id="amount" />
            {touched && error && <span>{error}</span>}
            
          </div>
        </div>
      )
    
      renderIncome = ({ input, label, type, meta: { touched, error } }) => 
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
    
      renderAPR = ({ input, label, type, meta: { touched, error } }) => (
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
    
      renderDelete  = (
        <button class="ui icon button">
        <i class="cloud icon"></i>
        </button>
      )

    renderLoans = ({ fields, meta: { touched, error, submitFailed } }) => (
    
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
                <th>Minimum Payment</th>
                </tr>
            </thead>
          <tbody>
    
        
           
          {fields.map((loan, index) =>
            // <li key={index}>
                <tr key={index}>
            {/* Button to remove a loan */}

            <td>
              
            {/* <h3> Loan #{index + 1} </h3> */}
            <Field 
                name={`${loan}.name`}
                type="text"
                component={this.renderName}
                label="Enter Name..."
            />
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
                component={this.renderPrincipal}
                label="Enter Principal..."
            />
            </td>
            <td>
            <Field 
                name={`${loan}.apr`}
                type="number"
                component={this.renderAPR}
                label="APR..."
            />
            </td>
            <td>
            <Field 
                name={`${loan}.min`}
                type="number"
                component={this.renderPrincipal}
                label="Minimum Payment..."
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

    checkNotDone(data){
      //checks that there is still principal left in any of the loans
      console.log(data)
      
      const totalPrincipal = data.reduce((acc, loan) => acc + Number(loan.principal), 0);
      console.log(totalPrincipal)
      if (totalPrincipal > 0) {
        return true;
      } else {
        return false;
      }
    }







    renderChart(props) {
       if (this.props.submitSucceeded ) {
        const income = this.props.info.form.loans.values.Income;
        const baseData = this.props.info.form.loans.values.loans
        var test = [];
        var val = _.cloneDeep(baseData);

        var finalData = [];
        var payment = 0;
        var sortedVal = _.sortBy(val, ['apr']).reverse();
        // for (var i = 0; i < sortedVal.length; i++) { 
        //   console.log(sortedVal[i].name)
        //   console.log(sortedVal[i].principal)
        // }
        // While loop to check that loan principal still > 0
        while (this.checkNotDone(sortedVal)){
          // new payment month
          payment += 1;
          var zero = 0;
          var totalMinApplied = 0;
          // apply the min to each loan applicable, then adjust loan principal.
          sortedVal.forEach(function(item) {
            var principal = Number(item.principal);
            
            var min = Number(item.min);
            if (principal >= min) {
              item.principal = (principal - min).toString();
              totalMinApplied += min;
            } else { 
              totalMinApplied += principal;
              item.principal = zero.toString();;
            }
          })
          var leftOverIncome = Number(income) - totalMinApplied;
          // Apply leftOverIncome to highest APR, array is already sorted highest apr to lowest
          sortedVal.forEach(function(item) {
            var principal = Number(item.principal);
          
            if (principal !== 0 || leftOverIncome !== 0){
              // Applying income for the loan in scenarios where leftoverincome >= loan principal, carry the leftoverincome to 
              // the next loan
              if (leftOverIncome >= principal){
                leftOverIncome -= principal;
                item.principal = zero.toString();
              } else {
                //  when leftoverincome < loan principal, set incomeleft to 0 and adjust principal, while loop restarts after since loan principal remains
                item.principal = Number(principal - leftOverIncome);
                leftOverIncome = 0;
              }
            }
          })

          // for (var i = 0; i < sortedVal.length; i++) { 
          //     console.log(sortedVal[i].name + ": "+ sortedVal[i].principal )
          //     console.log("loop")

          //   }





          // create a new object to push into final data so this payment cycle is recorded
          var paymentData = new Object();
          // sortedVal.forEach(function(item) {
          //   var loanName = item.name;
          //   paymentData.loanName = Number(item.principal);
          // })
          // console.log(paymentData)
          // finalData.push(paymentData);
          // console.log(finalData);
          // paymentData[payment] = payment;
          for (var i = 0; i < sortedVal.length; i++) { 
            console.log(sortedVal[i].name + ": "+ sortedVal[i].principal )
            var loanName= sortedVal[i].name;
            paymentData[loanName] = Number(sortedVal[i].principal);
            // console.log("loop")

          }


        // console.log("restart loop")
        finalData.push(paymentData);



        }
       console.log(finalData)
        
        return ( 

        <div> {income} </div>
        );
        
       } else {
            return (

                <div className="ui placeholder segment">
                <div className="ui icon header">
                    <i className="hand point up outline icon"></i>
                    Please Click Calculate
                </div>
                <div className="ui active centered inline loader"></div>
                
                
                </div>
           );
        }
    }

    render(){
        // console.log("this.props")
        // console.log(this.props)
        // console.log(this.props)
     
        const { handleSubmit, pristine, reset, submitting } = this.props
        return  (
        <div>
            <form onSubmit={handleSubmit(validate)}>
                    <Field name="Income" type="text" component={this.renderIncome} label=" Income" />
                    <FieldArray name= "loans" component={this.renderLoans}/>
                    <div className="ui section divider"></div>
                    <div className="ui buttons">
                        <button className="ui primary button" type="submit"  disabled={submitting}>Calculate</button>
                        <div className="or"></div>
                        <button className="ui button" type="button" disabled={pristine || submitting} onClick={reset}>Reset</button>
                    </div>
                </form>
                {this.renderChart()}
                </div>
               
        );
        }
    };



const mapStateToProps = (state) => {
    return {
        info: state
    }
};


loans = connect(
    mapStateToProps
)(loans);

export default reduxForm({
    form: 'loans',
    initialValues: {
        "loans": [
          {}
        ]
      },
      validate 
})(loans);