import React, { Component } from 'react'
import { HashRouter as Router, Route, withRouter, Link } from "react-router-dom"
import Steps from "./../../Steps"
import axios from 'axios'

class StepFive extends Component {

    constructor(props) {
        super(props);

        this.state = {
            css: {
                display: "none"
            }
        };
    }
    
    onChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    onChangeRadio(e, input, value) {
        this.setState({[input]: value});
        document.querySelectorAll("#" + input + " a").forEach(function (el, i) {
            el.classList.remove("active");
        });
        e.target.classList.add("active");
    }

    onChangeButton(e, value) {
        this.setState({["tax_regime"]: value});
        document.querySelectorAll(".radio-block .btn").forEach(function (element) {
            element.classList.remove("blue");
            element.innerHTML = "Выбрать";
        });
        e.target.classList.add("blue");
        e.target.innerHTML = "Выбрано";
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
                            active: false,
                            name: 'ОКВЭД'
                        },
                        {
                            href: '/preparation/stepSeven/registerIP',
                            active: false,
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
                    <div className="step-content preparation-form-5">
                        <h4>Выберите налоговый режим:</h4>
                        <div className="content">
                            <div className="radio-block">
                                <button onClick={event => this.onChangeButton(event, "1")} className="btn">Выбрать</button>
                                <p>
                                    ООО (или ИП) уплачивает 6% от общей величины доходов. Если ООО (или ИП) по итогам периода не оказалось
                                    в убытке, полученная сумма уменьшается на страховые взносы и больничные (выданные за счет организации).
                                    Причем уменьшение не должно превысить 50% от суммы подлежащего уплате налога, если есть наемные работники, если наемных работников нет — 100% от суммы подлежащего уплате налога.
                                </p>
                            </div>
                            <div className="radio-block">
                                <button onClick={event => this.onChangeButton(event, "2")} className="btn">Выбрать</button>
                                <p>
                                    ООО (или ИП) уплачивает 15%, если объектом налогообложения являются доходы, уменьшенные на величину расходов. Однако законами субъектов Российской Федерации могут быть установлены дифференцированные налоговые ставки в пределах от 5 до 15% в зависимости от категорий налогоплательщиков.
                                </p>
                            </div>
                            <div className="radio-block">
                                <button onClick={event => this.onChangeButton(event, "3")} className="btn">Выбрать</button>
                                <p>
                                    Базовая система налогообложения, применяемая «по умолчанию». Предусматривает уплату всех определенных действующим законодательством налогов и строгое документирование деятельности и отчетности. В то же время, несмотря на большее, чем при УСН и ЕСХН налоговое бремя и объем документооборота, предоставляет несоизмеримо большие возможности для бизнеса.
                                </p>
                            </div>
                            <div className="high">
                                <label htmlFor="tax_type">Вариант получения документов</label>
                                <div id="tax_type" className="radio">
                                    <a onClick={event => this.onChangeRadio(event, 'tax_type', 'Лично')}>Лично</a>/
                                    <a onClick={event => this.onChangeRadio(event, 'tax_type', 'По доверенности')}>По доверенности</a>/
                                    <a onClick={event => this.onChangeRadio(event, 'tax_type', 'По почте России')}>По почте России</a>
                                </div>
                                <input className="hidden" type="text" id="tax_type" value={this.state.tax_type} name="tax_type" placeholder="" />
                            </div>
                        </div>
                        <div className="button-wrapper">
                            <Link to="/preparation/stepFour/registerIP">
                                <button className="btn">
                                    Назад
                                </button></Link>
                            <Link to="/preparation/stepSix/registerIP">
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

export default withRouter(StepFive)