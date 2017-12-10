import React from 'react';
import {NavLink} from 'react-router-dom';

import constants from '../constants/SystemConstants';
import logo from '../assets/images/logo.png';

const Header = () => {
    return (
        <div className="App-header row">
            <div className="container">
                <div className="col-md-6">
                    <img src={logo} className="App-logo" alt="logo"/>
                </div>
                <div className="col-md-6">
                    <nav className="main-nav">
                        <ul>
                            <li><NavLink activeClassName="selected" to="/merchants/1">{constants.MERCHANT_LIST}</NavLink></li>
                            <li><NavLink activeClassName="selected" to="/add">{constants.ADD_MERCHANT}</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
};

export default Header;