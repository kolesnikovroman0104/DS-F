import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class Steps extends Component {
    constructor(props){
        super(props);
    }

    render() {
        var steps = this.props.data.map(function(step, index) {
            return (
                <Link to={step.href}>
                    <div className={step.active ? "step active" : "step"}>
                        <img src={step.active ? "images/steps-active.svg" : "images/steps.svg"} alt=""/>
                        <p>
                            {step.name}
                            <b>{index + 1} шаг</b>
                        </p>
                    </div>
                </Link>
            );
        });
        return (
            <div className="steps">
                {steps}
            </div>
        );
    }

}

export default Steps