import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import validate from './validate';
import _ from 'lodash';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';


class loans extends Component {
    componentDidMount() {
      document.body.classList.add('background-red');
  }


    renderPrincipal = ({ input, label, type, meta: { touched, error } }) => (
        <div>
          {/* <label>{label}</label> */}
          <div className="ui small ight labeled input ">
              <label htmlFor="amount" className="ui label">$</label>
            <input {...input} type={type} placeholder={label} id="amount" />
            <div className="ui basic label">.00</div>
            <div>
            {touched && error && <div className="ui left pointing red basic label">{error}</div>}
            </div>
          </div>
          
        </div>
      )
    
     renderName = ( { input, label, type, meta: { touched, error } }) => (
        <div>
            
         
          
          {/* <label>{label}</label> */}
          <div className="ui input">
            <input {...input} type={type} placeholder={label} id="amount" />
            <div>
            {touched && error && <div className="ui left pointing red basic label">{error}</div>}
            </div>
          
          </div>
          
        </div>
        
        
      )
    
      renderIncome = ({ input, label, type, meta: { touched, error } }) => 
      (
        <div>
          <br>
          </br>
          <h1 style= {{color: "Black", fontWeight: "bold"}}>Payment Calculator</h1>
          <p>A calculator that allows you to enter multiple loans and provide the most optimal payment plan to save you money and time!</p>
          {/* <label>{label}</label> */}
          <br></br>
          <h2>My disposable Monthly Income Is...</h2>
          <div className="ui small right labeled input">
              <label htmlFor="amount" className="ui label">$</label>
            <input {...input} type={type} placeholder={label} id="amount" />
            <div className="ui basic label">.00</div>
            <div>
            {touched && error && <div className="ui left pointing red basic label">{error}</div>}
            </div>
          </div>
          
        </div>
      )
    
    //   const displayError = error => (
    //     <div className="ui poiting red basic label">
    //       {error}
    //     </div>
    
    //   )

    bugPatch(props){
      if (props.submitSucceeded) {
        // console.log(true)
        return true
      }
      else {
          return false
        }
    }
    
    renderAPR = ({ input, label, type, meta: { touched, error } }) => (
        <div>
          {/* <label>{label}</label> */}
          <div className="ui small right labeled input">
              <label htmlFor="amount" className="ui label"></label>
            <input {...input} type={type} placeholder={label} id="amount" />
            <div className="ui basic label">%</div>
            <div>
            {touched && error && <div className="ui left pointing red basic label">{error}</div>}
            </div>
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
            
    
            <table className="ui inverted teal celled table">
          {/* Add loans group, mapping through the array and giving unique keys*/}
          <thead>
                <tr>
                <th className="three wide">Name</th>
                <th className="three wide">Principal</th>
                <th className="three wide">APR</th>
                <th >Minimum Payment</th>
                </tr>
            </thead>
          <tbody>
    
        
           
          {fields.map((loan, index) =>
            // <li key={index}>
                <tr key={index}>
            {/* Button to remove a loan */}

            <td>
              
            {/* <h3> Loan #{index + 1} </h3> */}
            
                  {/* <button 
                  className="circular negative ui icon button" 
                  onClick={() => fields.remove(index)} 
                  type="button"
                  title="Remove loan"
                  disabled={this.bugPatch(this.props)}>
                  <i className="trash alternate icon"></i>
                  </button> */}
         
              <Field 
                  name={`${loan}.name`}
                  type="text"
                  component={this.renderName}
                  label="Enter Name..."
                  disabled={this.bugPatch(this.props)}
              />
           
            </td>
            {/* <button
                type="button"
                title="Remove loan"
                component={this.renderDelete}
                onClick={() => fields.remove(index)}
                disabled={this.bugPatch(this.props)}
                /> */}
               
        
                
            
                 <td>
              <Field 
                name={`${loan}.principal`}
                type="number"
                component={this.renderPrincipal}
                label="Enter Principal..."
                disabled={this.bugPatch(this.props)}
            />
            </td>
            <td>
            <Field 
                name={`${loan}.apr`}
                type="text"
                component={this.renderAPR}
                label="Ex 3.65%"
                disabled={this.bugPatch(this.props)}
            />
            </td>
            <td>
            <Field 
                name={`${loan}.min`}
                type="number"
                component={this.renderPrincipal}
                label="Minimum Payment..."
                disabled={this.bugPatch(this.props)}
            />
            </td>
            {/* <button 
          className="circular negative ui icon button" 
          onClick={() => fields.remove(index)} 
          type="button"
          title="Remove loan"
          disabled={this.bugPatch(this.props)}>
          <i className="trash alternate icon"></i>
          </button> */}
            
            </tr>
            // </li>
          )}

          </tbody>

          
          </table>

          <button className="positive ui labeled icon button" disabled={this.bugPatch(this.props)} type="button" onClick={() => fields.push({})}>Add Loans or Debt
                <i className="plus circle icon"></i>
            </button>
            
            {(touched || submitFailed) && error && <span>{error}</span>}
        </ul>
        
      )

    checkNotDone(data){
      //checks that there is still principal left in any of the loans
      const totalPrincipal = data.reduce((acc, loan) => acc + Number(loan.principal), 0);
      // console.log(totalPrincipal)
      if (totalPrincipal > 0) {
        return true;
      } else {
        return false;
      }
    }


    createLines(data){
      var randomColor = require('randomcolor');

      //go through a object loans and give a unique color to each
      //create an array that does not have the name 
    
      var formateArray = _.cloneDeep(data[0]);
      var result = []; 
      delete formateArray["payment"];
      // console.log(formateArray)
      //looping through the objects properties 
      for (var loan in formateArray ) {
      //  console.log(loan)
       //grabbing the key to pass datakey
       result.push(<Line key ={loan} type="monotone" dataKey={loan} stroke={randomColor()} />);
      }
      return result;
    }

    amortizationLoanNames(sortedVal){
      
      var nameArray = [];
      sortedVal.forEach(function (item) {
        nameArray.push(<th key={item.name}>{item.name}</th>)
    });
    return nameArray;
    }
    amortizationPayments(sortedVal){
      var paymentArray = [];
      console.log(sortedVal)
      for (var i = 0; i < sortedVal[0].loanPaymentsArray.length; i++) { 
        paymentArray.push(<tr key={i}>{this.calcPaymemts(sortedVal, i)}</tr>);
      }
      console.log(paymentArray)
      return paymentArray;
    }

    calcPaymemts(sortedVal, i){
      var itemsArray = [];
      itemsArray.push(<td key={i}>{i+1}</td>);
      sortedVal.forEach(function (item) {
        itemsArray.push(<td key={item.loanPaymentsArray[i]}>{item.loanPaymentsArray[i]}</td>)
      });
      return itemsArray;
    };
  


    renderChart(props) {
      //  console.log(this.props.info.form.loans.values.loans)
       if (this.props.submitSucceeded) {
        const income = this.props.info.form.loans.values.Income;
        const baseData = this.props.info.form.loans.values.loans
        var val = _.cloneDeep(baseData);
        var firstMonth = true;
        var finalData = [];
        var payment = 0;
        var sortedVal = _.sortBy(val, ['apr']).reverse();
        var totalInterestYTD = 0;
        var interest = 0;
        var totalPaid = 0;
        sortedVal.forEach(function(loan) {
          loan.loanPaymentsArray = [];
        })
        console.log(sortedVal)
        // for (var i = 0; i < sortedVal.length; i++) { 
        //   console.log(sortedVal[i].name)
        //   console.log(sortedVal[i].principal)
        // }
        // While loop to check that loan principal still > 0
        while (this.checkNotDone(sortedVal)){
          //check if first month, applies accrued interest only to start of 2nd payment onwards. 
          // for (var i = 0; i < sortedVal.length; i++) { 
          //     console.log(sortedVal[i].name + ": "+ sortedVal[i].principal )
          //     console.log("prinicpal month")
          //   }
          if(!firstMonth){
            //loop through each loan and add loan interest to principal
            sortedVal.forEach(function(item) {
              var principal = Number(item.principal);
              //round apr to nearest hundredth, calc monthly mpr
              var loanAPR = _.ceil((Number(item.apr)/100)/12, 2);

              // console.log(loanAPR + " : apr");
              //only on loans balance that is not 0
              if (principal !== 0) {
                //the object array is in strings
                var accruedInterest = _.ceil(loanAPR*principal,2);
                //add interest to totalInterestYTD and interest
                interest = accruedInterest;
                totalInterestYTD = _.ceil(totalInterestYTD+accruedInterest);
                item.principal = _.ceil(accruedInterest + principal,2).toString();
              }
            })
          }
          // new payment month
          payment += 1;
          var zero = 0;
          var totalMinApplied = 0;
          // apply the min to each loan applicable, then adjust loan principal.
          sortedVal.forEach(function(item) {
            var principal = Number(item.principal); 
            var min = Number(item.min);
            item.loanPaymentsArray[payment-1] = 0;
            if (principal >= min) {
              item.loanPaymentsArray[payment-1] = min;
              item.principal = (principal - min).toString();;
              totalMinApplied += min;
            } else { 
              item.loanPaymentsArray[payment-1] += principal;
              totalMinApplied += principal;
              item.principal = zero.toString();;
            }
            //add min to totalPaid since min will deduct from income
            totalPaid += totalMinApplied;
          })
          var leftOverIncome = Number(income) - totalMinApplied;
          // Apply leftOverIncome to highest APR, array is already sorted highest apr to lowest
          sortedVal.forEach(function(item) {
            var principal = Number(item.principal);
          
            if (principal !== 0 || leftOverIncome !== 0){
              // Applying income for the loan in scenarios where leftoverincome >= loan principal, carry the leftoverincome to 
              // the next loan
              if (leftOverIncome >= principal){
                item.loanPaymentsArray[payment-1] += principal;
                console.log(item.loanPaymentsArray[payment-1] + "here")
                leftOverIncome -= principal;
                //add princiapl to totalpaid since principal deducts leftOverIncome
                totalPaid += principal;
                item.principal = zero.toString();
              } else {
                //  when leftoverincome < loan principal, set incomeleft to 0 and adjust principal, while loop restarts after since loan principal remains
                item.loanPaymentsArray[payment-1] += _.ceil(Number(leftOverIncome,2));
                item.principal = _.ceil(Number(principal - leftOverIncome),2);
                totalPaid += leftOverIncome;
                leftOverIncome = 0;
              }
            }
          })

          // create a new object to push into final data so this payment cycle is recorded
          var paymentData = new Object();

          paymentData["payment"] = `Payment ${payment}`;
          for (var i = 0; i < sortedVal.length; i++) { 
            var loanName = `${sortedVal[i].name} Balance`;
            paymentData[loanName] = Number(sortedVal[i].principal);
            // console.log("loop")
          }
          //add interest data to the object before pushing to finalData
          paymentData["Interest Paid"] = interest;
          paymentData["Interest YTD"] = totalInterestYTD;
          paymentData["Total Paid YTD"] = totalPaid;
        finalData.push(paymentData);
        firstMonth = false;
        }
        
      return (
        
        <div>                    
          <LineChart width={1000} height={600} data={finalData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="payment" />
            <YAxis />
            <Tooltip />
            <Legend />
            {this.createLines(finalData)}
          </LineChart>

          <table className="ui teal table">
            <thead>
              <tr><th>Total Payments</th>
              <th>Total Interest</th>
              <th>Total Paid</th>
            </tr></thead><tbody>
              <tr>
                <td>{payment}</td>
                <td>{totalInterestYTD}</td>
                <td>{totalPaid}</td>
              </tr>
            </tbody>
          </table>
        

      <table className="ui teal very compact table">
        <thead>
          <tr>
            <th>Payment #</th>
            {this.amortizationLoanNames(sortedVal)}
          </tr>
        </thead>
        <tbody>
        {this.amortizationPayments(sortedVal)}
        </tbody>
        </table>
        </div>
      );
      } else {
        
            return (

                <div className="ui fluid placeholder segment">
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
        <div >
          
            <form onSubmit={handleSubmit(validate)}>
              
                    <Field name="Income" type="number" component={this.renderIncome} label=" Income" disabled={this.bugPatch(this.props)}/>
                    <div>
                    <FieldArray name= "loans" component={this.renderLoans}/>
                   </div>
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