import React, { Component } from 'react'
import { HashRouter as Router, Route, withRouter } from "react-router-dom"
import Container from '../Container'
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThreeIP from "./SendDocumentsIP/StepThree";
import StepFourIP from "./SendDocumentsIP/StepFour";
import StepFiveIP from "./SendDocumentsIP/StepFive";
import StepSixIP from "./SendDocumentsIP/StepSix";
import StepThreeOOO from "./SendDocumentsOOO/StepThree";
import StepFourOOO from "./SendDocumentsOOO/StepFour";
import StepFiveOOO from "./SendDocumentsOOO/StepFive";
import StepSixOOO from "./SendDocumentsOOO/StepSix";
import StepThreeEditIP from "./SendDocumentsEditIP/StepThree";
import StepFourEditIP from "./SendDocumentsEditIP/StepFour";
import StepFiveEditIP from "./SendDocumentsEditIP/StepFive";
import StepSixEditIP from "./SendDocumentsEditIP/StepSix";
import StepThreeEditOOO from "./SendDocumentsEditOOO-14001/StepThree";
import StepFourEditOOO from "./SendDocumentsEditOOO-14001/StepFour";
import StepFiveEditOOO from "./SendDocumentsEditOOO-14001/StepFive";
import StepSixEditOOO from "./SendDocumentsEditOOO-14001/StepSix";
import StepThreeEditOOO1 from "./SendDocumentsEditOOO-13001/StepThree";
import StepFourEditOOO1 from "./SendDocumentsEditOOO-13001/StepFour";
import StepFiveEditOOO1 from "./SendDocumentsEditOOO-13001/StepFive";
import StepSixEditOOO1 from "./SendDocumentsEditOOO-13001/StepSix";
import StepThreeDeleteIP from "./SendDocumentsDeleteIP/StepThree";
import StepFourDeleteIP from "./SendDocumentsDeleteIP/StepFour";
import StepFiveDeleteIP from "./SendDocumentsDeleteIP/StepFive";
import StepSixDeleteIP from "./SendDocumentsDeleteIP/StepSix";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class SendDocuments extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    renderBody() {
        return (
            <Router>
                <div>
                    <Route exact path='/send' component={StepOne}/>
                    <Route path='/send/stepTwo' component={StepTwo}/>
                    <Route path='/send/stepThree/registerIP' component={StepThreeIP}/>
                    <Route path='/send/stepFour/registerIP' component={StepFourIP}/>
                    <Route path='/send/stepFive/registerIP' component={StepFiveIP}/>
                    <Route path='/send/stepSix/registerIP' component={StepSixIP}/>
                    <Route path='/send/stepThree/registerOOO' component={StepThreeOOO}/>
                    <Route path='/send/stepFour/registerOOO' component={StepFourOOO}/>
                    <Route path='/send/stepFive/registerOOO' component={StepFiveOOO}/>
                    <Route path='/send/stepSix/registerOOO' component={StepSixOOO}/>
                    <Route path='/send/stepThree/editIP' component={StepThreeEditIP}/>
                    <Route path='/send/stepFour/editIP' component={StepFourEditIP}/>
                    <Route path='/send/stepFive/editIP' component={StepFiveEditIP}/>
                    <Route path='/send/stepSix/editIP' component={StepSixEditIP}/>
                    <Route path='/send/stepThree/editOOO14001' component={StepThreeEditOOO}/>
                    <Route path='/send/stepFour/editOOO14001' component={StepFourEditOOO}/>
                    <Route path='/send/stepFive/editOOO14001' component={StepFiveEditOOO}/>
                    <Route path='/send/stepSix/editOOO14001' component={StepSixEditOOO}/>
                    <Route path='/send/stepThree/editOOO13001' component={StepThreeEditOOO1}/>
                    <Route path='/send/stepFour/editOOO13001' component={StepFourEditOOO1}/>
                    <Route path='/send/stepFive/editOOO13001' component={StepFiveEditOOO1}/>
                    <Route path='/send/stepSix/editOOO13001' component={StepSixEditOOO1}/>
                    <Route path='/send/stepThree/deleteIP' component={StepThreeDeleteIP}/>
                    <Route path='/send/stepFour/deleteIP' component={StepFourDeleteIP}/>
                    <Route path='/send/stepFive/deleteIP' component={StepFiveDeleteIP}/>
                    <Route path='/send/stepSix/deleteIP' component={StepSixDeleteIP}/>
                </div>
            </Router>
        )
    }

    render() {
        return (
            <Container content={this.renderBody()} />
        )
    }
}

export default withRouter(SendDocuments)