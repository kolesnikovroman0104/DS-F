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
                            active: false,
                            name: 'Документы'
                        },
                        {
                            href: '/preparation/stepNine/registerIP',
                            active: false,
                            name: 'Готово'
                        },
                    ]}/>
                    <div className="step-content">
                        <h4>Заявление ЭЦП:</h4>
                        <p>
                            Все что вам осталось - это распечатать и подписать заявление на изготовление вашей
                            электронно-цифровой подписи для дистанционной подачи документов в налоговую без вашего
                            личного визита и нотариуса
                        </p>
                        <a>Электронно-цифровая подпись?</a>
                        <div>
                            <a className="a-button">
                                <img src="images/download.svg" />
                                Скачать
                            </a>
                            <a className="a-button">
                                <img src="images/print.svg" />
                                Печать
                            </a>
                        </div>
                        <h4>Сертификат КСКЭП:</h4>
                        <p>
                            Кроме подписания заявления на выпуск ЭЦП, вам необходимо подписать сертификат КСКЭП, заказать выпуск которого
                            Вы можете по кнопке ниже, далее Вам необходимо будет подождать несколько минут , затем распечатать и подписать заявление
                            КСКЭП. Будьте внимательны, перед отправкой запроса на получение сертификата КСКЭП проверьте правильность заполнения
                            данных на заявителя.
                        </p>
                        <a>Сертификат КСКЭП?</a>
                        <div className="button-wrapper">
                            <Link to="/preparation/stepSix/registerIP">
                                <button className="btn">
                                    Назад
                                </button>
                            </Link>
                            <Link to="/preparation/stepEight/registerIP">
                                <button className="btn blue">
                                    Далее
                                </button>
                            </Link>
                        </div>
                    </div>
            </div>
            </div>
        )
    }
}

export default withRouter(StepSeven)