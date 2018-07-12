import React, { Component } from 'react'
import { HashRouter as Router, Route, withRouter, Link } from "react-router-dom"
import Steps from "./../../Steps"
import axios from 'axios'

class StepSeven extends Component {

    constructor(props) {
        super(props);

        this.state = {
            style: {
                display: 'none'
            },
        };
    }

    render() {
        return (
            <div className="auth">
                <h3 className="step-head">Регистрация ИП</h3>
                <div className="steps-container">
                    <Steps data={[
                        {
                            href: '/preparation/stepOne/registerIP',
                            active: true,
                            name: 'Соглашение'
                        },
                        {
                            href: '/preparation/stepTwo/registerIP',
                            active: true,
                            name: 'Контакты'
                        },
                        {
                            href: '/preparation/stepThree/registerIP',
                            active: true,
                            name: 'Данные ИП'
                        },
                        {
                            href: '/preparation/stepFour/registerIP',
                            active: true,
                            name: 'Данные'
                        },
                        {
                            href: '/preparation/stepFive/registerIP',
                            active: true,
                            name: 'Режим'
                        },
                        {
                            href: '/preparation/stepSix/registerIP',
                            active: true,
                            name: 'ОКВЭД'
                        },
                        {
                            href: '/preparation/stepSeven/registerIP',
                            active: true,
                            name: 'Заявление'
                        },
                        {
                            href: '/preparation/stepEight/registerIP',
                            active: true,
                            name: 'Документы'
                        },
                        {
                            href: '/preparation/stepNine/registerIP',
                            active: true,
                            name: 'Готово'
                        },
                    ]}/>
                    <div className="step-content">
                        <h4>Ну вот и все! После нажатия кнопки "Отправить заявку внизу данной страницы, Ваша заявка появится в панели "Мои заявки", где Вам будет необходимо произвести оплату за регистрацию Вашей компании.</h4>
                        <p>
                            После оплаты запустится процесс по регистрации. Вы сможете отслеживать статус готовности Вашей компании в меню "Мои заявки"
                        </p>
                        <div className="button-wrapper">
                            <Link to="/preparation/stepEight/registerIP">
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
            </div>
        )
    }
}

export default withRouter(StepSeven)