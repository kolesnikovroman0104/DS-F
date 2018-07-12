import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class StepFour extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {}
        }
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
                        <h4>Почти готово</h4>
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
                        <div className="button-wrapper">
                            <Link to="/send/stepThree/editOOO-14001">
                                <button className="btn">
                                    Назад
                                </button>
                            </Link>
                            <Link to="/send/stepFive/editOOO-14001">
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

export default withRouter(StepFour)