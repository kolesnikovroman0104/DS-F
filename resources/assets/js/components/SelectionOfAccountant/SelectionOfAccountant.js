import React, { Component } from 'react'
import { HashRouter as Router, Route, withRouter } from "react-router-dom"
import Container from '../Container'

class SelectionOfAccountant extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    renderBody() {
        return (
            <Router>
                <div>
                    <div className="auth">
                        <div className="steps-container">
                            <h3>Заявка для подбора бухгалтера</h3>
                            <div className="step-content">
                                <div className="content">
                                    <div className="big">
                                        <label htmlFor="name">Контактное лицо</label>
                                        <input  type="text" value="" id="name" name="name" placeholder="Иванов Иван Иванович" />
                                    </div>
                                    <div className="big">
                                        <label htmlFor="company_name">Название компании</label>
                                        <input  type="text" value="" id="company_name" name="company_name" placeholder="ИП Иванов / ООО Моя компания" />
                                    </div>
                                    <div className="middle">
                                        <label htmlFor="phone">Контактный телефон</label>
                                        <input  type="tel" value="" id="phone" name="phone" placeholder="+7 (123) 456-78-99" />
                                    </div>
                                    <div className="middle">
                                        <label htmlFor="count_operation">Количество операций в месяц</label>
                                        <input  type="text" value="" id="count_operation" name="count_operation" placeholder="1234567" />
                                    </div>
                                    <div className="middle">
                                        <label htmlFor="count_employe">Количество сотрудников в штате</label>
                                        <input  type="text" id="count_employe" value="" name="count_employe" placeholder="" />
                                    </div>
                                    <div className="big">
                                        <label htmlFor="oborot">Оборот по компании в месяц</label>
                                        <input  type="text" id="oborot" value="" name="oborot" placeholder="&#8381; 999 999" />
                                    </div>
                                    <div className="big">
                                        <label htmlFor="vne">Внешнеэкономическая деятельность</label>
                                        <input  type="text" id="vne" value="" name="vne" />
                                    </div>
                                    <div className="high">
                                        <label htmlFor="sfera">Сфера деятельности</label>
                                        <input  type="text" id="sfera" value="" name="sfera" placeholder="" />
                                    </div>
                                    <div className="button-wrapper">
                                        <a href="#">
                                            <button className="btn blue">
                                                Оставить заявку
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Router>
        )
    }

    render() {
        return (
            <Container content={this.renderBody()} />
        )
    }
}

export default withRouter(SelectionOfAccountant)