import React, { Component } from 'react'
import { HashRouter as Router, Route, withRouter, Link } from "react-router-dom"
import Steps from "./../../Steps"
import axios from 'axios'

class StepOne extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.getPrice = this.getPrice.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            full: "-",
            index: "-",
            area_type: "-",
            area: "-",
            settlement_type: "-",
            settlement: "-",
            city_type: "-",
            city: "-",
            street_type: "-",
            street: "-",
            house_type_full: "-",
            house: "-",
            block_type_full: "-",
            block: "-",
            flat_type_full: "-",
            flat: "-",
            tax_office: "-",
            gender: "Мужской",
            citizenship: "-",
            surname: "-",
            name: "-",
            patronymic: "-",
            birthPlace: "-",
            birthDate: "01.03.2001",
            passportSerial: "-",
            passportNumber: "-",
            passportDate: "18.03.2001",
            passportComment: "-",
            passportUnit: "-",
            snils: "-",
            inn: "-",
            tax_type: "-",
            prVisBum: "-",
            assigment: "-",
            order_type_id: 7,
            phone: "-",
            href: "",
            checkboxState: false,
            price: 0,
            prices: []
        };

        if (this.props.order) {
            this.state = this.props.order;
        }

        axios.get('api/prices/get')
            .then(response => {
                this.setState({price: response.data['7'].price, prices: response.data})
            });
    }

    submit(e) {
        e.preventDefault();
        if (this.state.checkboxState) {
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
                    "href": "/preparation/stepOne/registerIP"
                },
                "order_type_id": this.state.order_type_id
            })
                .then(response => {
                        if (response.data.order_id) {
                            this.setState({err: false, href: "api/orders/update/" + response.data.order_id});
                            window.order_id = response.data.order_id;
                            window.stepThree = this.state;
                        }
                        this.props.history.push('/preparation/stepTwo/registerIP');
                    }
                )
                .catch(error => {
                    this.setState({err: true, messages: error.response.data.errors});
                });
        }
    }

    getPrice(e) {
        this.setState({price: this.state.prices[e.target.value].price, order_type_id: e.target.value});
    }

    onChange(e) {
        this.setState({checkboxState: e.target.checked});
        if (e.target.checked) {
            this.setState({href: '/preparation/stepTwo/registerIP'})
        } else {
            this.setState({href: '#'})
        }
    }

    render() {
        return (
            <div>
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
                            active: false,
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
                    <div className="step-content">
                        <h4>Выберите вариант отправки:</h4>
                        <p>С учетом данного пункта будет рассчитана ваша стоимость</p>
                        <div>
                            <input onChange={event => this.getPrice(event)} type="radio" value="8" id="type_1" name="type" checked={this.state.order_type_id == 8} />
                            <label htmlFor="type_1">Подготовить пакет документов и подать самостоятельно</label>
                        </div>
                        <div>
                            <input onChange={event => this.getPrice(event)} type="radio" value="9" id="type_2" name="type" checked={this.state.order_type_id == 9} />
                            <label htmlFor="type_2">Подготовить пакет документов и отправить онлайн при помощи ЭЦП</label>
                        </div>
                        <div>
                            <input onChange={event => this.getPrice(event)} type="radio" value="10" id="type_3" name="type" checked={this.state.order_type_id == 10} />
                            <label htmlFor="type_3">Подготовить неограниченное количество пакетов за 2000р в месяц</label>
                        </div>
                        <button className="btn itog">Итого: {this.state.price}</button>
                        <h4>Для начала заполнения:</h4>
                        <p>Прочитайте соглашение на обработку персональных<br />данных. а так же согласие на отправку</p>
                        <label className="custom" htmlFor="agree">
                            <input type="checkbox" value="1" checked={this.state.checkboxState} name="agree" id="agree" onChange={event => this.onChange(event)} />
                            <span className="checkmark"/>
                            Я согласен и ознакомлен, начинаю заполнять
                        </label>
                        <button onClick={event => this.submit(event)} className="btn blue">
                            Далее
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(StepOne)