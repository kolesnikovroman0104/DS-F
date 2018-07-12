import React, { Component } from 'react'
import { HashRouter as Router, Route, withRouter, Link } from "react-router-dom"
import Steps from "./../../Steps"
import axios from 'axios'

class StepThree extends Component {

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
            href: "",
            css: {
                display: "none"
            }
        };

        $ = jQuery.noConflict();

        if (this.props.order) {
            this.state = this.props.order;
            this.setState({css: {
                    dislay: none
                }});
        }
    }

    componentDidMount() {
        $(".date").datepicker();
    }
    
    onChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    onChangeSelect(e) {
        const {name, value} = e.target;
        this.setState({[name]: value, css: {display: "none"}});
        if (value === "Иностранный гражданин") {
            this.setState({css: {display: "block"}})
        }
    }

    onChangeRadio(e, input, value) {
        this.setState({[input]: value});
        document.querySelectorAll("#" + input + " a").forEach(function (el, i) {
            el.classList.remove("active");
        });
        e.target.classList.add("active");
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
                        "surname": this.state.surname,
                        "name": this.state.name,
                        "patronymic": this.state.patronymic,
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
                "href": "/preparation/stepThree/registerIP"
            },
            "order_type_id": 8
        })
            .then(response => {
                    if (response.data.order_id) {
                        this.setState({err: false, href: "api/orders/update/" + response.data.order_id});
                        window.order_id = response.data.order_id;
                        window.stepThree = this.state;
                    }
                    this.props.history.push("/send/stepFour/registerOOO");
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
                            active: true,
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
                    <div className="step-content preparation-htmlForm-2">
                        <h4>Информация об индивидуальном предпринимателе:</h4>
                        <div className="content">
                            <div className="middle">
                                <label htmlFor="surname">Фамилия</label>
                                <input onChange={event => this.onChange(event)} type="text" id="surname" value={this.state.surname} name="surname" placeholder="Иванов" />
                            </div>
                            <div className="middle">
                                <label htmlFor="name">Имя</label>
                                <input onChange={event => this.onChange(event)} type="text" id="name" value={this.state.name} name="name" placeholder="Иван" />
                            </div>
                            <div className="middle">
                                <label htmlFor="patronymic">Отчество</label>
                                <input onChange={event => this.onChange(event)} type="text" id="patronymic" value={this.state.patronymic} name="patronymic" placeholder="Иванович" />
                            </div>
                            <div className="small">
                                <label htmlFor="gender">Пол</label>
                                <div id="gender" className="radio">
                                    <a onClick={event => this.onChangeRadio(event, 'gender', 'Мужской')}>Мужской</a>/
                                    <a onClick={event => this.onChangeRadio(event, 'gender', 'Женский')}>Женский</a>
                                </div>
                                <input className="hidden" type="text" id="gender" value={this.state.gender} name="gender" placeholder="" />
                            </div>
                            <div className="high">
                                <label htmlFor="birthPlace">Место рождения</label>
                                <input onChange={event => this.onChange(event)} type="text" value={this.state.birthPlace} id="birthPlace" name="birthPlace" placeholder="Так же как в паспорте" />
                            </div>
                            <div className="small">
                                <label htmlFor="birthDate">Дата рождения</label>
                                <input onChange={event => this.onChange(event)} className="date" onFocus={event => {$.noConflict();$(".date").datepicker()}} type="text" id="birthDate" value={this.state.birthDate} name="birthDate" placeholder="01.01.1979" />
                            </div>
                            <div className="middle">
                                <label htmlFor="citizenship">Гражданство</label>
                                <select onChange={event => this.onChangeSelect(event)} id="citizenship" name="citizenship">
                                    <option selected={this.state.citizenship === "Российская Федерация"} value="Российская Федерация">Российская Федерация</option>
                                    <option selected={this.state.citizenship === "Лицо без гражданства"} value="Лицо без гражданства">Лицо без гражданства</option>
                                    <option selected={this.state.citizenship === "Иностранный гражданин"} value="Иностранный гражданин">Иностранный гражданин</option>
                                </select>
                            </div>
                            <div style={this.state.css} className="high">
                                <label htmlFor="citizenshipCountry">Страна, в которой получено гражданство</label>
                                <input onChange={event => this.onChange(event)} type="text" id="citizenshipCountry" value={this.state.citizenshipCountry} name="citizenshipCountry" placeholder="" />
                            </div>
                            <div style={this.state.css} className="high">
                                <label htmlFor="citizenshipDocument">Документ, подтверждающий право на проживание</label>
                                <select onChange={event => this.onChange(event)} id="citizenshipDocument" name="citizenshipDocument">
                                    <option selected={this.state.citizenshipDocument === "Российская Федерация"} value="Российская Федерация">Российская Федерация</option>
                                    <option selected={this.state.citizenshipDocument === "Лицо без гражданства"} value="Лицо без гражданства">Лицо без гражданства</option>
                                    <option selected={this.state.citizenshipDocument === "Иностранный гражданин"} value="Иностранный гражданин">Иностранный гражданин</option>
                                </select>
                            </div>
                            <div style={this.state.css} className="middle">
                                <label htmlFor="documentNumber">Номер документа</label>
                                <input onChange={event => this.onChange(event)} type="text" id="documentNumber" value={this.state.documentNumber} name="documentNumber" placeholder="115" />
                            </div>
                            <div style={this.state.css} className="middle">
                                <label htmlFor="documentDate">Дата выдачи</label>
                                <input  type="text" id="documentDate" className="date" onFocus={event => {$.noConflict();$(".date").datepicker()}} value={this.state.documentDate} name="documentDate" placeholder="01.09.2001" />
                            </div>
                            <div style={this.state.css} className="middle">
                                <label htmlFor="documentWhom">Кем выдан</label>
                                <input onChange={event => this.onChange(event)} type="text" id="documentWhom" value={this.state.documentWhom} name="documentWhom" placeholder="ТЕРРИТОРИАЛЬНЫЙ ПУНКТ..." />
                            </div>
                            <div style={this.state.css} className="small">
                                <label htmlFor="documentDateEnd">Срок действия</label>
                                <input onChange={event => this.onChange(event)} className="date" onFocus={event => {$.noConflict();$(".date").datepicker()}} type="text" id="documentDateEnd" value={this.state.documentDateEnd} name="documentDateEnd" placeholder="01.09.2019" />
                            </div>
                            <div style={this.state.css} className="middle">
                                <label htmlFor="surnameLatin">Фамилия (Латиница)</label>
                                <input onChange={event => this.onChange(event)} type="text" id="surnameLatin" value={this.state.surnameLatin} name="surnameLatin" placeholder="Иванов" />
                            </div>
                            <div style={this.state.css} className="middle">
                                <label htmlFor="nameLatin">Имя (Латиница)</label>
                                <input onChange={event => this.onChange(event)} type="text" id="nameLatin" value={this.state.nameLatin} name="nameLatin" placeholder="Иван" />
                            </div>
                            <div style={this.state.css} className="middle">
                                <label htmlFor="patronymicLatin">Отчество (Латиница)</label>
                                <input onChange={event => this.onChange(event)} type="text" id="patronymicLatin" value={this.state.patronymicLatin} name="patronymicLatin" placeholder="Иванович" />
                            </div>
                        </div>
                        <div className="button-wrapper">
                            <Link to="/preparation/stepTwo/registerIP">
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

export default withRouter(StepThree)