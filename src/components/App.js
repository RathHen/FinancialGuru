import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import LoansList from './DebtCalc/Loanslist';
import DeleteLoan from './DebtCalc/DeleteLoan';
import Income from './DebtCalc/Income';
import NewLoan from './DebtCalc/NewLoan';
import Main from './Header';


const PageOne = () => {
    return <div>Hello</div>
}
const App = () => {
    return (
    <div className = "ui contrainer" >
        <BrowserRouter>
        <Main/>
        <div>
            <Route path="/" exact component = {LoansList} />
            <Route path="/DebtCalc/NewLoan" exact component = {NewLoan} />
            <Route path="/DebtCalc/DeleteLoan" exact component = {DeleteLoan} />
            <Route path="/DebtCalc/Income" exact component = {Income} />
        </div>
        </BrowserRouter>
    </div>
    );
};

export default App;