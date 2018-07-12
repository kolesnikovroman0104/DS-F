import React, { Component } from 'react'
import { HashRouter as Router, Route, withRouter, Redirect } from "react-router-dom"
import Register from "./Registration";
import Login from "./Login";
import Forgot from "./Forgot";
import Order from "./Orders";
import SendDocument from "./SendDocuments/";
import SelectionOfAccountant from "./SelectionOfAccountant/SelectionOfAccountant";
import PreparationDocuments from "./PreparationDocuments";
import axios from "axios/index";

class Index extends Component {
    constructor(props) {
        super(props);
        this.checkLogin = this.checkLogin.bind(this);
    }


    checkLogin() {
        return !!localStorage.getItem("isLogin");
    }

    render() {
        if (this.checkLogin()) {
            return (
                <div>
                    <Route exact path='/' component={Order}/>
                    <Route path='/home' component={Order}/>
                    <Route path='/orders' component={Order}/>
                    <Route path='/send' component={SendDocument}/>
                    <Route path='/selection/accountant' component={SelectionOfAccountant}/>
                    <Route path='/preparation' component={PreparationDocuments}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/forgotpassword' component={Forgot}/>
                </div>);
        }
        return (
            <div>
                <Route exact path='/' component={Order}/>
                <Route path='/home' component={Order}/>
                <Route path='/orders' component={Order}/>
                <Route path='/send' component={SendDocument}/>
                <Route path='/selection/accountant' component={SelectionOfAccountant}/>
                <Route path='/preparation' component={PreparationDocuments}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/forgotpassword' component={Forgot}/>
                <Redirect to="/login" />;
            </div>
        );
    }
}

export default withRouter(Index)