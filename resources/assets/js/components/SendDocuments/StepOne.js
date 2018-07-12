import React, { Component } from 'react'
import { HashRouter as Router, Route, withRouter, Link } from "react-router-dom"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class StepOne extends Component {

    constructor(props) {
        super(props);

        this.state = {
            href: "#",
            checkboxState: false
        };

        window.stepThree = {};
    }

    onChange(e) {
        this.setState({checkboxState: e.target.checked});
        if (e.target.checked) {
            this.setState({href: '/send/stepTwo'})
        } else {
            this.setState({href: '#'})
        }
    }

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={200}
            >
            <div>
                <h3 className="step-head">Отправка документов</h3>
                <div className="steps-container">
                    <div className="steps">
                        <div className="step active">
                            <img src="images\steps-active.svg" />
                            <p>
                                Соглашение
                                <b>1 шаг</b>
                            </p>
                        </div>
                        <div className="step">
                            <img src="images\steps.svg" />
                            <p>
                                Выбор типа регистрации
                                <b>2 шаг</b>
                            </p>
                        </div>
                        <div className="step">
                            <img src="images\steps.svg" />
                            <p>
                                Заполнение информации
                                <b>3 шаг</b>
                            </p>
                        </div>
                        <div className="step">
                            <img src="images\steps.svg" />
                            <p>
                                Подпись заявления
                                <b>4 шаг</b>
                            </p>
                        </div>
                        <div className="step">
                            <img src="images\steps.svg" />
                            <p>
                                Загрузка документов
                                <b>5 шаг</b>
                            </p>
                        </div>
                        <div className="step">
                            <img src="images\steps.svg" />
                            <p>
                                Готово!
                                <b>6 шаг</b>
                            </p>
                        </div>
                    </div>
                    <div className="step-content">
                        <h4>Для начала заполнения</h4>
                        <p>
                            Прочитайте соглашение на обработку персональных <br />
                            данных. а так же согласие на отправку
                        </p>
                        <label className="custom" htmlFor="agree">
                            <input type="checkbox" value="1" checked={this.state.checkboxState} name="agree" id="agree" onChange={event => this.onChange(event)} />
                            <span className="checkmark"/>
                            Я согласен и ознакомлен, начинаю заполнять
                        </label>
                        <Link to={this.state.href}>
                            <button className="btn blue">
                                Далее
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            </ReactCSSTransitionGroup>
        )
    }
}

export default withRouter(StepOne)