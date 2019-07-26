import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom';


const PageOne = () => {
    return <div>PageOne</div>
}
const App = () => {
    return (
    <div>
        <BrowserRouter>
        <div>
            <Route path="/" exact component = {PageOne} />
        </div>
        </BrowserRouter>
    </div>
    );
};

export default App;