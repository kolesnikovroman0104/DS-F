import React, { Component } from 'react'
import { HashRouter as Router, Route, withRouter, Link } from "react-router-dom"
import axios from 'axios'
import Steps from "./../../Steps"
import dragndrop from "../../drag-n-drop";

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
                            active: false,
                            name: 'Готово'
                        },
                    ]}/>
                    <div className="step-content">
                        <h4>Загрузка документов:</h4>
                        <p>
                            Загрузите пакет документов и перетащите каждый из них в соответствующую папку. После добавления всех документов будет доступен шаг 6.
                        </p>
                        <div className="content">
                            <div className="docs-list">
                                {this.state.docs.map(function (document, index) {
                                    return (
                                        <div>
                                            <img src={document} />
                                            <select>
                                                <option></option>
                                            </select>
                                            <div className="close-icon" onClick={event => this.removeDocument(document)}></div>
                                        </div>
                                    );
                                })}
                            </div>
                            <form method="post" onSubmit={this.sendDocument} action="" noValidate className="box">
                                <div className="box__input">
                                    <input type="file" name="files[]" id="file" className="box__file" data-multiple-caption="{count} files selected" multiple />
                                    <label htmlFor="file"><span className="box__dragndrop">Перенесите документы в эту область или нажмите кнопку ниже</span>.</label>
                                    <svg className="box__icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43"><path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"/></svg>
                                    <button type="submit" className="box__button btn blue">Загрузить документы</button>
                                </div>
                            </form>

                        </div>
                        <div className="button-wrapper">
                            <Link to="/preparation/stepSeven/registerIP">
                                <button className="btn">
                                    Назад
                                </button>
                            </Link>
                            <Link to="/preparation/stepNine/registerIP">
                                <button className="btn blue">
                                    Далее
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <script src="js/drag-n-drop.js"></script>
                {dragndrop( document, window, 0 )}
            </div>
        )
    }
}

export default withRouter(StepSeven)