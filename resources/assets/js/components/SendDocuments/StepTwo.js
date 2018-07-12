import React, { Component } from 'react'
import { HashRouter as Router, Route, withRouter, Link } from "react-router-dom"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class StepTwo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checks: {
                registerIP: false,
                registerOOO: false,
                editIP: false,
                editOOO14001: false,
                editOOO13001: false,
                deleteIP: false,
            },
            href: '/send/stepTwo'
        };

        if (window.stepThree) {
            switch (window.stepThree.order_type_id) {
                case "1": {
                    this.state.checks.registerIP = true;
                    break;
                }
                case "2": {
                    this.state.checks.registerOOO = true;
                    break;
                }
                case "3": {
                    this.state.checks.editIP = true;
                    break;
                }
                case "4": {
                    this.state.checks.editOOO13001 = true;
                    break;
                }
                case "5": {
                    this.state.checks.editOOO14001 = true;
                    break;
                }
                case "6": {
                    this.state.checks.deleteIP = true;
                    break;
                }
            }
        }
    }

    onChange(e) {
        let checks = this.state.checks;
        for (let check in checks) {
            checks[check] = false;
        }
        const {name} = e.target;
        checks[name] = true;
        this.setState({"checks": checks});
        window.stepThree = {
            order_type_id: e.target.value
        };
        this.state.href = '/send/stepThree/' + name;
    }

    render() {
        return (
            <div>
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={200}
                >
                <h3 className="step-head">Отправка документов</h3>
                <div className="steps-container main-form">
                    <div className="steps">
                        <div className="step active">
                            <img src="images\steps-active.svg" />
                            <p>
                                Соглашение
                                <b>1 шаг</b>
                            </p>
                        </div>
                        <div className="step active">
                            <img src="images\steps-active.svg" />
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
                        <h4>Выберите тип регистрации:</h4>
                        <div className="label-container">
                            <label className="custom" htmlFor="registerIP">
                                <input type="checkbox" value="1" name="registerIP" checked={this.state.checks.registerIP} onChange={ event => this.onChange(event)} />
                                <span className="checkmark"/>
                                Регистрация ИП
                            </label>
                        </div>
                        <div className="label-container">
                            <label className="custom" htmlFor="registerOOO">
                                <input type="checkbox" value="2" name="registerOOO" checked={this.state.checks.registerOOO} onChange={ event => this.onChange(event)} />
                                <span className="checkmark"/>
                                Регистрация ООО (1 учредитель)
                            </label>
                        </div>
                        <div className="label-container">
                            <label className="custom" htmlFor="editIP">
                                <input type="checkbox" value="3" name="editIP" checked={this.state.checks.editIP} onChange={ event => this.onChange(event)} />
                                <span className="checkmark"/>
                                Внесение изменений ИП
                            </label>
                        </div>
                        <div className="label-container">
                            <label className="custom" htmlFor="editOOO-13001">
                                <input type="checkbox" value="4" name="editOOO13001" checked={this.state.checks.editOOO13001} onChange={ event => this.onChange(event)} />
                                <span className="checkmark"/>
                                Внесение изменений ООО (13001)
                            </label>
                        </div>
                        <div className="label-container">
                            <label className="custom" htmlFor="editOOO-14001">
                                <input type="checkbox" value="5" name="editOOO14001" checked={this.state.checks.editOOO14001} onChange={ event => this.onChange(event)} />
                                <span className="checkmark"/>
                                Внесение изменений ООО (14001)
                            </label>
                        </div>
                        <div className="label-container">
                            <label className="custom" htmlFor="deleteIP">
                                <input type="checkbox" value="6" name="deleteIP" checked={this.state.checks.deleteIP} onChange={ event => this.onChange(event)} />
                                <span className="checkmark"/>
                                Ликвидация ИП (26001)
                            </label>
                        </div>
                        <div className="button-wrapper">
                            <Link to="/send">
                                <button className="btn">
                                    Назад
                                </button>
                            </Link>
                            <Link to={this.state.href}>
                                <button className="btn blue">
                                    Далее
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

export default withRouter(StepTwo)