import React, { Component } from 'react'
import { HashRouter as Router, Route, withRouter } from "react-router-dom"
import Container from '../Container'
import Start from "./Start";
import StepOneRegisterIP from "./RegisterIP/StepOne";
import StepTwoRegisterIP from "./RegisterIP/StepTwo";
import StepThreeRegisterIP from "./RegisterIP/StepThree";
import StepFourRegisterIP from "./RegisterIP/StepFour";
import StepFiveRegisterIP from "./RegisterIP/StepFive";
import StepSixRegisterIP from "./RegisterIP/StepSix";
import StepSevenRegisterIP from "./RegisterIP/StepSeven";
import StepEightRegisterIP from "./RegisterIP/StepEight";
import StepNineRegisterIP from "./RegisterIP/StepNine";

class PreparationDocuments extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    renderBody() {
        return (
            <Router>
                <div>
                    <Route exact path='/preparation' component={Start}/>
                    <Route path='/preparation/stepOne/registerIP' component={StepOneRegisterIP}/>
                    <Route path='/preparation/stepTwo/registerIP' component={StepTwoRegisterIP}/>
                    <Route path='/preparation/stepThree/registerIP' component={StepThreeRegisterIP}/>
                    <Route path='/preparation/stepFour/registerIP' component={StepFourRegisterIP}/>
                    <Route path='/preparation/stepFive/registerIP' component={StepFiveRegisterIP}/>
                    <Route path='/preparation/stepSix/registerIP' component={StepSixRegisterIP}/>
                    <Route path='/preparation/stepSeven/registerIP' component={StepSevenRegisterIP}/>
                    <Route path='/preparation/stepEight/registerIP' component={StepEightRegisterIP}/>
                    <Route path='/preparation/stepNine/registerIP' component={StepNineRegisterIP}/>
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

export default withRouter(PreparationDocuments)