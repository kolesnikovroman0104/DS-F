import React, { Component } from 'react'
import { HashRouter as Router, Route, withRouter, Link } from "react-router-dom"
import Steps from "./../../Steps"
import axios from 'axios'

class StepFour extends Component {

    constructor(props) {
        super(props);

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

    renderOne() {
        return (
            <div className="step-content">
                <h4>Ваши данные</h4>
                <div className="content passport-content">
                    <div className="passport-form">
                        <div className="info">
                            <div className="middle">
                                <label htmlFor="passportSerial">Серия паспорта</label>
                                <input onChange={event => this.onChange(event)} type="text" id="passportSerial" value={this.state.passportSerial} name="passportSerial" placeholder="12 34" />
                            </div>
                            <div className="middle">
                                <label htmlFor="passportNumber">Номер паспорта</label>
                                <input onChange={event => this.onChange(event)} type="text" id="passportNumber" value={this.state.passportNumber} name="passportNumber" placeholder="1234567" />
                            </div>
                            <div className="small">
                                <label htmlFor="passportDate">Дата выдачи</label>
                                <input onChange={event => this.onChange(event)} className="date" onFocus={event => {$.noConflict();$(".date").datepicker()}} type="text" id="passportDate" value={this.state.passportDate} name="passportDate" placeholder="11.09.2001" />
                            </div>
                            <div className="high">
                                <label htmlFor="whom">Кем выдан</label>
                                <input onChange={event => this.onChange(event)} type="text" id="whom" value={this.state.whom} name="whom" placeholder="ОВД Октябрьского р-на г. Пушкино" />
                            </div>
                            <div className="big">
                                <label htmlFor="code">Код подразделения</label>
                                <input onChange={event => this.onChange(event)} type="text" id="code" value={this.state.code} name="code" placeholder="123-456" />
                            </div>
                            <div className="high">
                                <label htmlFor="full">Адрес регистрации</label>
                                <input onChange={event => this.onChange(event)} type="text" id="full" value={this.state.full} name="full" placeholder="г. Москва, ул. Пушкина, дом 205, кв. 5..." />
                            </div>
                            <div className="middle">
                                <label htmlFor="index">Индекс</label>
                                <input onChange={event => this.onChange(event)} type="text" id="index" value={this.state.index} name="index" placeholder="143000" />
                            </div>
                            <div className="middle">
                                <label htmlFor="snils">СНИЛС</label>
                                <input onChange={event => this.onChange(event)} type="text" id="snils" value={this.state.snils} name="snils" placeholder="123-456-789-12" />
                            </div>
                            <div className="high">
                                <label htmlFor="inn">ИНН ФЛ</label>
                                <input onChange={event => this.onChange(event)} type="text" id="inn" value={this.state.inn} name="inn" placeholder="5036032" />
                            </div>
                            <button className="btn">Узнать ИНН ФЛ</button>
                        </div>
                        <div className="passport">
                            <div className="first-page">
                                <div className="first-page-up">
                                    <h5>Российская федерация</h5>
                                    <div id="info-whom">
                                        <span>Паспорт выдан</span>
                                        {this.state.whom}
                                    </div>
                                    <div id="info-date">
                                        <span>Дата выдачи</span>
                                        {this.state.passportDate}
                                    </div>
                                    <span className="serial">{this.state.passportSerial} {this.state.passportNumber}</span>
                                </div>
                                <div className="first-page-down">
                                    <div className="photo">
                                        <img src={this.state.gender === "Мужской" ? "images/man.svg" : "images/woman.svg"} />
                                    </div>
                                    <div className="info-block">
                                        <div>
                                            <span>Фамилия</span>
                                            {this.state.surname}
                                        </div>
                                        <div>
                                            <span>Имя</span>
                                            {this.state.name}
                                        </div>
                                        <div>
                                            <span>Отчество</span>
                                            {this.state.patronymic}
                                        </div>
                                        <div>
                                            <span>Пол</span>
                                            {this.state.gender}
                                        </div>
                                        <div>
                                            <span>Дата рождения</span>
                                            {this.state.birthDate}
                                        </div>
                                        <div>
                                            <span>Место рождения</span>
                                            {this.state.birthPlace}
                                        </div>
                                        <span className="serial">{this.state.passportSerial} {this.state.passportNumber}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="second-page">
                                <h5>Российская Федерация</h5>
                                <h4>Страховое свидетельство</h4>
                                <h6>Обязательного пенсионного страхования</h6>
                                <span className="snils">{this.state.snils}</span>
                                <div>
                                    <span>Ф.И.О.</span>
                                    {this.state.surname}<br />
                                    {this.state.name}<br />
                                    {this.state.patronymic}
                                </div>
                                <div>
                                    <span>Дата и место рождения</span>
                                    {this.state.birthDate}<br />
                                    {this.state.birthPlace}
                                </div>
                                <div>
                                    <span>Пол</span>
                                    {this.state.gender}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="button-wrapper">
                        <Link to="/preparation/stepFour/registerIP">
                            <button className="btn">
                                Назад
                            </button></Link>
                        <Link to="/preparation/stepFive/registerIP">
                            <button className="btn blue">
                                Далее
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    renderTwo() {
        return (
            <div className="step-content">
                <h4>Ваши данные</h4>
                <div className="content passport-content">
                    <div className="passport-form">
                        <div className="info">
                            <div className="middle">
                                <label htmlFor="passportSerial">Серия паспорта</label>
                                <input onChange={event => this.onChange(event)} type="text" id="passportSerial" value={this.state.passportSerial} name="passportSerial" placeholder="12 34" />
                            </div>
                            <div className="middle">
                                <label htmlFor="passportNumber">Номер паспорта</label>
                                <input onChange={event => this.onChange(event)} type="text" id="passportNumber" value={this.state.passportNumber} name="passportNumber" placeholder="1234567" />
                            </div>
                            <div className="small">
                                <label htmlFor="passportDate">Дата выдачи</label>
                                <input onChange={event => this.onChange(event)} className="date" onFocus={event => {$.noConflict();$(".date").datepicker()}} type="text" id="passportDate" value={this.state.passportDate} name="passportDate" placeholder="11.09.2001" />
                            </div>
                            <div className="high">
                                <label htmlFor="whom">Кем выдан</label>
                                <input onChange={event => this.onChange(event)} type="text" id="whom" value={this.state.whom} name="whom" placeholder="ОВД Октябрьского р-на г. Пушкино" />
                            </div>
                            <div className="big">
                                <label htmlFor="code">Код подразделения</label>
                                <input onChange={event => this.onChange(event)} type="text" id="code" value={this.state.code} name="code" placeholder="123-456" />
                            </div>
                            <div className="high">
                                <label htmlFor="full">Адрес регистрации</label>
                                <input onChange={event => this.onChange(event)} type="text" id="full" value={this.state.full} name="full" placeholder="г. Москва, ул. Пушкина, дом 205, кв. 5..." />
                            </div>
                            <div className="middle">
                                <label htmlFor="index">Индекс</label>
                                <input onChange={event => this.onChange(event)} type="text" id="index" value={this.state.index} name="index" placeholder="143000" />
                            </div>
                            <div className="middle">
                                <label htmlFor="snils">СНИЛС</label>
                                <input onChange={event => this.onChange(event)} type="text" id="snils" value={this.state.snils} name="snils" placeholder="123-456-789-12" />
                            </div>
                            <div className="high">
                                <label htmlFor="inn">ИНН ФЛ</label>
                                <input onChange={event => this.onChange(event)} type="text" id="inn" value={this.state.inn} name="inn" placeholder="5036032" />
                            </div>
                            <button className="btn">Узнать ИНН ФЛ</button>
                            <div className="middle">
                                <label htmlFor="area_type">Тип области</label>
                                <input onChange={event => this.onChange(event)} type="text" id="area_type" value={this.state.area_type} name="area_type" placeholder="р-н" />
                            </div>
                            <div className="middle">
                                <label htmlFor="area">Область</label>
                                <input onChange={event => this.onChange(event)} type="text" id="area" value={this.state.area} name="area" placeholder="Зарайский" />
                            </div>
                            <div className="middle">
                                <label htmlFor="settlement_type">Тип поселения</label>
                                <input onChange={event => this.onChange(event)} type="text" id="settlement_type" value={this.state.settlement_type} name="settlement_type" placeholder="Поселок" />
                            </div>
                            <div className="middle">
                                <label htmlFor="settlement">Название поселения</label>
                                <input onChange={event => this.onChange(event)} type="text" id="settlement" value={this.state.settlement} name="settlement" placeholder="Толстопальцево" />
                            </div>
                            <div className="middle">
                                <label htmlFor="city_type">Тип города</label>
                                <input onChange={event => this.onChange(event)} type="text" id="city_type" value={this.state.city_type} name="city_type" placeholder="Город" />
                            </div>
                            <div className="middle">
                                <label htmlFor="city">Город</label>
                                <input onChange={event => this.onChange(event)} type="text" id="city" value={this.state.city} name="city" placeholder="Москва" />
                            </div>
                            <div className="middle">
                                <label htmlFor="street_type">Тип улицы</label>
                                <input onChange={event => this.onChange(event)} type="text" id="street_type" value={this.state.street_type} name="street_type" placeholder="ул" />
                            </div>
                            <div className="middle">
                                <label htmlFor="street">Улица</label>
                                <input onChange={event => this.onChange(event)} type="text" id="street" value={this.state.street} name="street" placeholder="Пушкина" />
                            </div>
                            <div className="middle">
                                <label htmlFor="house_type_full">Тип дома(полн.)</label>
                                <input onChange={event => this.onChange(event)} type="text" id="house_type_full" value={this.state.house_type_full} name="house_type_full" placeholder="Дом" />
                            </div>
                            <div className="middle">
                                <label htmlFor="house">Номер дома</label>
                                <input onChange={event => this.onChange(event)} type="text" id="house" value={this.state.house} name="house" placeholder="31" />
                            </div>
                            <div className="middle">
                                <label htmlFor="block_type_full">Тип корпуса(полн.)</label>
                                <input onChange={event => this.onChange(event)} type="text" id="block_type_full" value={this.state.block_type_full} name="block_type_full" placeholder="Корпус" />
                            </div>
                            <div className="middle">
                                <label htmlFor="block">Номер корпуса</label>
                                <input onChange={event => this.onChange(event)} type="text" id="block" value={this.state.block} name="block" placeholder="4" />
                            </div>
                            <div className="middle">
                                <label htmlFor="flat_type_full">Тип помещения(полн.)</label>
                                <input onChange={event => this.onChange(event)} type="text" id="flat_type_full" value={this.state.flat_type_full} name="flat_type_full" placeholder="Квартира" />
                            </div>
                            <div className="middle">
                                <label htmlFor="tax_office">Налоговый орган(код)</label>
                                <input onChange={event => this.onChange(event)} type="text" id="tax_office" value={this.state.tax_office} name="tax_office" placeholder="7707" />
                            </div>
                            <button className="btn">Узнать ИНН ФЛ</button>
                        </div>
                        <div className="passport">
                            <div className="first-page">
                                <div className="first-page-up">
                                    <h5>Российская федерация</h5>
                                    <div id="info-whom">
                                        <span>Паспорт выдан</span>
                                        {this.state.whom}
                                    </div>
                                    <div id="info-date">
                                        <span>Дата выдачи</span>
                                        {this.state.passportDate}
                                    </div>
                                    <span className="serial">{this.state.passportSerial} {this.state.passportNumber}</span>
                                </div>
                                <div className="first-page-down">
                                    <div className="photo">
                                        <img src={this.state.gender === "Мужской" ? "images/man.svg" : "images/woman.svg"} />
                                    </div>
                                    <div className="info-block">
                                        <div>
                                            <span>Фамилия</span>
                                            {this.state.surname}
                                        </div>
                                        <div>
                                            <span>Имя</span>
                                            {this.state.name}
                                        </div>
                                        <div>
                                            <span>Отчество</span>
                                            {this.state.patronymic}
                                        </div>
                                        <div>
                                            <span>Пол</span>
                                            {this.state.gender}
                                        </div>
                                        <div>
                                            <span>Дата рождения</span>
                                            {this.state.birthDate}
                                        </div>
                                        <div>
                                            <span>Место рождения</span>
                                            {this.state.birthPlace}
                                        </div>
                                        <span className="serial">{this.state.passportSerial} {this.state.passportNumber}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="second-page">
                                <h5>Российская Федерация</h5>
                                <h4>Страховое свидетельство</h4>
                                <h6>Обязательного пенсионного страхования</h6>
                                <span className="snils">{this.state.snils}</span>
                                <div>
                                    <span>Ф.И.О.</span>
                                    {this.state.surname}<br />
                                    {this.state.name}<br />
                                    {this.state.patronymic}
                                </div>
                                <div>
                                    <span>Дата и место рождения</span>
                                    {this.state.birthDate}<br />
                                    {this.state.birthPlace}
                                </div>
                                <div>
                                    <span>Пол</span>
                                    {this.state.gender}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="button-wrapper">
                        <Link to="/preparation/stepFour/registerIP">
                            <button className="btn">
                                Назад
                            </button></Link>
                        <Link to="/preparation/stepFive/registerIP">
                            <button className="btn blue">
                                Далее
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    renderThree() {
        return (
            <div className="step-content">
                <h4>Информация о заявителе</h4>
                <div className="content">
                    <div className="big">
                        <label htmlFor="passportSerial">Серия паспорта</label>
                        <input onChange={event => this.onChange(event)} type="text" id="passportSerial" value={this.state.passportSerial} name="passportSerial" placeholder="12 34" />
                    </div>
                    <div className="big">
                        <label htmlFor="passportNumber">Номер паспорта</label>
                        <input onChange={event => this.onChange(event)} type="text" id="passportNumber" value={this.state.passportNumber} name="passportNumber" placeholder="1234567" />
                    </div>
                    <div className="big">
                        <label htmlFor="passportDate">Дата выдачи</label>
                        <input onChange={event => this.onChange(event)} className="date" onFocus={event => {$.noConflict();$(".date").datepicker()}} type="text" id="passportDate" value={this.state.passportDate} name="passportDate" placeholder="11.09.2001" />
                    </div>
                    <div className="high">
                        <label htmlFor="whom">Кем выдан</label>
                        <input onChange={event => this.onChange(event)} type="text" id="whom" value={this.state.whom} name="whom" placeholder="ОВД Октябрьского р-на г. Пушкино" />
                    </div>
                    <div className="big">
                        <label htmlFor="code">Код подразделения</label>
                        <input onChange={event => this.onChange(event)} type="text" id="code" value={this.state.code} name="code" placeholder="123-456" />
                    </div>
                    <div className="high">
                        <label htmlFor="full">Адрес регистрации</label>
                        <input onChange={event => this.onChange(event)} type="text" id="full" value={this.state.full} name="full" placeholder="г. Москва, ул. Пушкина, дом 205, кв. 5..." />
                    </div>
                    <div className="high">
                        <label htmlFor="index">Индекс</label>
                        <input onChange={event => this.onChange(event)} type="text" id="index" value={this.state.index} name="index" placeholder="143000" />
                    </div>
                    <div className="big">
                        <label htmlFor="snils">СНИЛС</label>
                        <input onChange={event => this.onChange(event)} type="text" id="snils" value={this.state.snils} name="snils" placeholder="123-456-789-12" />
                    </div>
                    <div className="high">
                        <label htmlFor="inn">ИНН ФЛ</label>
                        <input onChange={event => this.onChange(event)} type="text" id="inn" value={this.state.inn} name="inn" placeholder="5036032" />
                    </div>

                    <div className="button-wrapper">
                        <Link to="/preparation/stepFour/registerIP">
                            <button className="btn">
                                Назад
                            </button></Link>
                        <Link to="/preparation/stepFive/registerIP">
                            <button className="btn blue">
                                Далее
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
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
                    {
                        this.state.citizenship === "Российская Федерация" ? this.renderOne() :
                            this.state.citizenship === "Лицо без гражданства" ? this.renderTwo() : this.renderThree()
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(StepFour)