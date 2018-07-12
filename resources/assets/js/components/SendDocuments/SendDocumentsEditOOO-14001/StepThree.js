import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"
import axios from "axios/index";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class StepThree extends Component {

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
            order_type_id: 5,
            phone: "",
            href: ""
        };


        $ = jQuery.noConflict();

        if (this.props.order) {
            this.state = this.props.order;
        }
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
                "assigment":true
            },
            "order_type_id": 1
        })
            .then(response => {
                    if (response.data.order_id) {
                        this.setState({err: false, href: "api/orders/update/{" + response.data.order_id + "}"});
                        window.order_id = response.data.order_id;
                        window.stepThree = this.state;
                    }
                    this.props.history.push("/send/stepFour/editOOO-14001");
                }
            )
            .catch(error => {
                this.setState({err: true, messages: error.response.data.errors});
            });
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

    componentDidMount() {
        $(".date").datepicker();
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
                        <div className="step">
                            <img src="images\steps.svg" />
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
                        <h4>Информация о заявителе</h4>
                        <div className="content passport-content">
                            <div className="passport-form">
                                <div className="info">
                                    <div className="big">
                                        <label htmlFor="phone">Телефон</label>
                                        <input onChange={event => this.onChange(event)} type="tel" value={this.state.phone} id="phone" name="phone" placeholder="Например,+7 (977) 123-45-67" />
                                    </div>
                                    <div className="big">
                                        <label htmlFor="email">Электронная почта</label>
                                        <input onChange={event => this.onChange(event)} type="email" value={this.state.email} id="email" name="email" placeholder="Например, ivan@yandex.ru" />
                                    </div>
                                    <div className="middle">
                                        <label htmlFor="gender">Пол</label>
                                        <div id="gender" className="radio">
                                            <a onClick={event => this.onChangeRadio(event, 'gender', 'Мужской')}>Мужской</a>/
                                            <a onClick={event => this.onChangeRadio(event, 'gender', 'Женский')}>Женский</a>
                                        </div>
                                        <input onChange={event => this.onChange(event)} type="text" className="hidden" id="gender" value={this.state.gender} name="gender" placeholder="" />
                                    </div>
                                    <div className="small">
                                        <label htmlFor="surname">Фамилия</label>
                                        <input onChange={event => this.onChange(event)} type="text" id="surname" value={this.state.surname} name="surname" placeholder="Иванов" />
                                    </div>
                                    <div className="small">
                                        <label htmlFor="name">Имя</label>
                                        <input onChange={event => this.onChange(event)} type="text" id="name" value={this.state.name} name="name" placeholder="Иван" />
                                    </div>
                                    <div className="small">
                                        <label htmlFor="patronymic">Отчество</label>
                                        <input onChange={event => this.onChange(event)} type="text" id="patronymic" value={this.state.patronymic} name="patronymic" placeholder="Иванович" />
                                    </div>
                                    <div className="big">
                                        <label htmlFor="citizenship">Гражданство</label>
                                        <select onChange={event => this.onChange(event)} id="citizenship" name="citizenship">
                                            <option selected={this.state.citizenship === "Российская Федерация"} value="Российская Федерация">Российская Федерация</option>
                                            <option selected={this.state.citizenship === "Лицо без гражданства"} value="Лицо без гражданства">Лицо без гражданства</option>
                                            <option selected={this.state.citizenship === "Иностранный гражданин"} value="Иностранный гражданин">Иностранный гражданин</option>
                                        </select>                                    </div>
                                    <div className="high">
                                        <label htmlFor="birthPlace">Место рождения</label>
                                        <input onChange={event => this.onChange(event)} type="text" id="birthPlace" value={this.state.birthPlace} name="birthPlace" placeholder="Так же как в паспорте" />
                                    </div>
                                    <div className="middle">
                                        <label htmlFor="birthDate">Дата рождения</label>
                                        <input onChange={event => this.onChange(event)} className="date" onFocus={event => {$.noConflict(); $(".date").datepicker()}} type="text" id="birthDate" value={this.state.birthDate} name="birthDate" placeholder="01.01.1979" />
                                    </div>
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
                                        <input onChange={event => this.onChange(event)} className="date" onFocus={event => {$.noConflict(); $(".date").datepicker()}} type="text" id="passportDate" value={this.state.passportDate} name="passportDate" placeholder="11.09.2001" />
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
                                    <div className="middle">
                                        <label htmlFor="snils">СНИЛС</label>
                                        <input onChange={event => this.onChange(event)} type="text" id="snils" value={this.state.snils} name="snils" placeholder="123-456-789-12" />
                                    </div>
                                    <div className="high">
                                        <label htmlFor="inn">ИНН ФЛ</label>
                                        <input onChange={event => this.onChange(event)} type="text" id="inn" value={this.state.inn} name="inn" placeholder="5036032" />
                                    </div>
                                    <div className="high">
                                        <label  htmlFor="tax_type">Вариант получения документов</label>
                                        <div id="tax_type" className="radio">
                                            <a onClick={event => this.onChangeRadio(event, 'tax_type', 'Лично')}>Лично</a>/
                                            <a onClick={event => this.onChangeRadio(event, 'tax_type', 'По доверенности')}>По доверенности</a>/
                                            <a onClick={event => this.onChangeRadio(event, 'tax_type', 'По почте России')}>По почте России</a>
                                        </div>
                                        <input onChange={event => this.onChange(event)} className="hidden" type="text" id="tax_type" value={this.state.tax_type} name="tax_type" placeholder="" />
                                    </div>
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
                                <Link to="/send/stepTwo/">
                                    <button className="btn">
                                        Назад
                                    </button>
                                </Link>
                                <button onClick={event => this.onSubmit(event)} className="btn blue">
                                    Далее
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

export default withRouter(StepThree)