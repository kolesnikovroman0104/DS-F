import React, { Component } from 'react'
import { HashRouter as Router, Route, withRouter, Link } from "react-router-dom"
import Steps from "./../../Steps"
import axios from 'axios'

class StepTwo extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            full: "",
            index: "",
            area_type: "",
            area: "",
            settlement_type: "",
            settlement: "",
            city_type: "",
            city: "",
            street_type: "",
            street: "",
            house_type_full: "",
            house: "",
            block_type_full: "",
            block: "",
            flat_type_full: "",
            flat: "",
            tax_office: "",
            gender: "",
            citizenship: "",
            surname: "",
            name: "",
            patronymic: "",
            birthPlace: "",
            birthDate: "",
            passportSerial: "",
            passportNumber: "",
            passportDate: "",
            passportComment: "",
            passportUnit: "",
            snils: "",
            inn: "",
            tax_type: "",
            prVisBum: "",
            assigment: "",
            order_type_id: 8,
            phone: "",
            href: ""
        };

        $ = jQuery.noConflict();

        if (this.props.order) {
            this.state = this.props.order;
        }
    }

    onChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    onSubmit(e) {
        e.preventDefault();
        let href = "";
        if (window.stepThree) {
            href = window.stepThree.href;
        } else {
            href = 'api/orders/add-one';
        }
        axios.post(href, {
            "json":{
                "individuals":[
                    {
                        "address":{
                            "full": this.state.full,
                            "index": this.state.index,
                            "area_type": this.state.area_type,
                            "area": this.state.area,
                            "settlement_type": this.state.settlement_type,
                            "settlement": this.state.settlement,
                            "city_type": this.state.city_type,
                            "city": this.state.city,
                            "street_type": this.state.street_type,
                            "street": this.state.street,
                            "house_type_full": this.state.house_type_full,
                            "house": this.state.house,
                            "block_type_full": this.state.block_type_full,
                            "block": this.state.block,
                            "flat_type_full": this.state.flat_type_full,
                            "flat": this.state.flat,
                            "tax_type": this.state.tax_type,
                            "tax_office": this.state.tax_office
                        },
                        "gender": this.state.gender,
                        "citizenship": this.state.citizenship,
                        "surname": this.state.surname || this.state.fio.split(' ', 3)[0],
                        "name": this.state.name || this.state.fio.split(' ', 3)[1],
                        "patronymic": this.state.patronymic || this.state.fio.split(' ', 3)[2],
                        "birthPlace": this.state.birthPlace,
                        "birthDate": this.state.birthDate,
                        "passportSerial": this.state.passportSerial,
                        "passportNumber": this.state.passportNumber,
                        "passportDate": this.state.passportDate,
                        "passportComment": this.state.passportComment,
                        "passportUnit": this.state.passportUnit,
                        "snils": this.state.snils,
                        "inn": this.state.inn
                    }
                ],
                "tax_type": this.state.tax_type,
                "prVisBum": "1",
                "assigment":true,
                "href": "/preparation/stepTwo/registerIP"
            },
            "order_type_id": 8,
        })
            .then(response => {
                    if (response.data.order_id) {
                        this.setState({err: false, href: "api/orders/update/" + response.data.order_id});
                        window.order_id = response.data.order_id;
                        window.stepThree = this.state;
                    }
                    this.props.history.push("/preparation/stepThree/registerIP");
                }
            )
            .catch(error => {
                this.setState({err: true, messages: error.response.data.errors});
            });
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
                            active: false,
                            name: 'Данные ИП'
                        },
                        {
                            href: '/preparation/stepFour/registerIP',
                            active: false,
                            name: 'Данные'
                        },
                        {
                            href: '/preparation/stepFive/registerIP',
                            active: false,
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
                    <div className="step-content preparation-form">
                        <h4>Контактное лицо:</h4>
                        <div className="content">
                            <div className="high">
                                <label htmlFor="fio">ФИО</label>
                                <input onChange={event => this.onChange(event)} type="text" id="fio" value={this.state.fio} name="fio" placeholder="Иванов Иван Иванович" />
                            </div>
                            <div className="high">
                                <label htmlFor="phone">Телефон</label>
                                <input onChange={event => this.onChange(event)} type="tel" value={this.state.phone} id="phone" name="phone" placeholder="+7 (977) 123-45-67" />
                            </div>
                            <div className="high">
                                <label htmlFor="email">Электронная почта</label>
                                <input onChange={event => this.onChange(event)} type="email" value={this.state.email} id="email" name="email" placeholder="ivan@yandex.ru" />
                            </div>
                        </div>
                        <div className="button-wrapper">
                            <Link to="/preparation/stepOne/registerIP">
                                <button className="btn">
                                    Назад
                                </button></Link>
                                <button onClick={event => this.onSubmit(event)} className="btn blue">
                                    Далее
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(StepTwo)