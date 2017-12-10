import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Merchants from './containers/Merchants';
import EditMerchant from './containers/EditMerchant';
import AddMerchant from './containers/AddMerchant';
import Bids from './containers/Bids';

import Header from './components/Header';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Header />
                <div className="container">
                    <Route path="/merchants/:pageNo?" component={Merchants}/>
                    <Route path="/add" component={AddMerchant}/>
                    <Route path="/edit/:id" component={EditMerchant}/>
                    <Route path="/bids/:id" component={Bids}/>
                </div>
            </div>
        </Router>
    );
};

export default App;
