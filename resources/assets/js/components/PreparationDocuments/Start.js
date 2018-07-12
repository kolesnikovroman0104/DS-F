import React, { Component } from 'react'
import { HashRouter as Router, Route, withRouter, Link } from "react-router-dom"

class Start extends Component {

    constructor(props) {
        super(props);

        this.state = {
            link: "#",
            style: {
                display: 'none'
            },
        };
    }

    showPopUp(e) {
        this.setState({link: '/preparation/stepOne/' + e.target.id, style: {display: 'block'}});
    }

    hidePopUp() {
        this.setState({style: {display: 'none'}});
    }

    render() {
        return (
            <div className="auth">
                <div className="steps-container">
                    <div className="step-content">
                        <div className="content preparation">
                            <div className="type">
                                <h4>Регистрация ИП</h4>
                                <p onClick={event => this.showPopUp(event)} className="context-link" id="registerIP">Что включено в данный пакет?</p>
                                <Link to="/preparation/stepOne/registerIP">Узнать стоимость и перейти к оформлению</Link>
                            </div>
                            <div className="type">
                                <h4>Внесение изменений ИП</h4>
                                <p onClick={event => this.showPopUp(event)} className="context-link" id="editIP">Что включено в данный пакет?</p>
                                <Link to="/preparation/stepOne/editIP">Узнать стоимость и перейти к оформлению</Link>
                            </div>
                            <div className="type">
                                <h4>Ликвидация ИП</h4>
                                <p onClick={event => this.showPopUp(event)} className="context-link" id="deleteIP">Что включено в данный пакет?</p>
                                <Link to="/preparation/stepOne/deleteIP">Узнать стоимость и перейти к оформлению</Link>
                            </div>
                            <div className="type">
                                <h4>Регистрация ООО</h4>
                                <p onClick={event => this.showPopUp(event)} className="context-link" id="registerOOO">Что включено в данный пакет?</p>
                                <Link to="/preparation/stepOne/registerOOO">Узнать стоимость и перейти к оформлению</Link>
                            </div>
                            <div className="type">
                                <h4>Внесение изменений ООО</h4>
                                <p onClick={event => this.showPopUp(event)} className="context-link" id="editOOO">Что включено в данный пакет?</p>
                                <Link to="/preparation/stepOne/editOOO">Узнать стоимость и перейти к оформлению</Link>
                            </div>
                            <div className="type">
                                <h4>Ликвидация ООО</h4>
                                <p onClick={event => this.showPopUp(event)} className="context-link" id="deleteOOO">Что включено в данный пакет?</p>
                                <Link to="/preparation/stepOne/deleteOOO">Узнать стоимость и перейти к оформлению</Link>
                            </div>
                            <div style={this.state.style} className="b-popup" id="popup1">
                                <div className="b-popup-content">
                                    <ul>
                                        <li>Открытие рассчетного счета</li>
                                        <li>Подбор бухгалтера/подключение интернет-бухгалтерии "Мое дело"</li>
                                        <li>Проверка сформированного пакета документов нашим юристом</li>
                                        <li>Поготовка и дистанционная подача документов для регистрации юридического лица</li>
                                    </ul>
                                    <Link to={this.state.link}>Перейти к оформлению</Link>
                                    <div onClick={event => this.hidePopUp()} className="close"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Start)