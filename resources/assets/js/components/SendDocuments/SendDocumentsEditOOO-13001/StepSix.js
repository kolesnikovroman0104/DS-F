import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class StepSix extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    onSubmit() {

    }

    render() {
        return (
            <div className="auth">
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={200}
                >
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
                        <div className="step active">
                            <img src="images\steps-active.svg" />
                            <p>
                                Выбор типа регистрации
                                <b>2 шаг</b>
                            </p>
                        </div>
                        <div className="step active">
                            <img src="images\steps-active.svg" />
                            <p>
                                Заполнение информации
                                <b>3 шаг</b>
                            </p>
                        </div>
                        <div className="step active">
                            <img src="images\steps-active.svg" />
                            <p>
                                Подпись заявления
                                <b>4 шаг</b>
                            </p>
                        </div>
                        <div className="step active">
                            <img src="images\steps-active.svg" />
                            <p>
                                Загрузка документов
                                <b>5 шаг</b>
                            </p>
                        </div>
                        <div className="step active">
                            <img src="images\steps-active.svg" />
                            <p>
                                Готово!
                                <b>6 шаг</b>
                            </p>
                        </div>
                    </div>
                    <div className="step-content">
                        <h4>Ну вот и все! После нажатия кнопки "Отправить заявку внизу данной страницы, Ваша заявка появится в панели "Мои заявки", где Вам будет необходимо произвести оплату за регистрацию Вашей компании.</h4>
                        <p>
                            После оплаты запустится процесс по регистрации. Вы сможете отслеживать статус готовности Вашей компании в меню "Мои заявки"
                        </p>
                        <div className="button-wrapper">
                            <Link to="/send/stepFive/editOOO-13001">
                                <button className="btn">
                                    Назад
                                </button>
                            </Link>
                            <Link to="/">
                                <button className="btn blue">
                                    Отправить заявку
                                </button>
                            </Link>
                        </div>
                        <div className="content">

                        </div>
                    </div>
                </div>
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

export default StepSix