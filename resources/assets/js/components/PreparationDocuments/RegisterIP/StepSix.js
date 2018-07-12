import React, { Component } from 'react'
import { HashRouter as Router, Route, withRouter, Link } from "react-router-dom"
import Steps from "./../../Steps"
import $ from 'jquery'
import axios from 'axios'

class StepSix extends Component {

    constructor(props) {
        super(props);

        this.state = {
            style: {
                display: 'none'
            },
        };

        this.showSubList = this.showSubList.bind(this);
        this.treeOkveds = this.treeOkveds.bind(this);
    }

    componentDidMount() {
        axios.get('api/okveds/get-level/')
            .then(response => {
                this.setState({
                    okveds: response.data.data
                })
            }).catch(error => {
            console.log(error);
        });
    }

    showPopUp() {
        this.setState({style: {display: 'block'}});
    }

    hidePopUp() {
        this.setState({style: {display: 'none'}});
    }

    showSubList(event, id) {
        $(event.target).parent().find("li ul:visible").slideUp();
        $(event.target).children("i").text("+");
        let okveds = this.state.okveds;
        axios.get('api/okveds/get-level/' + id).then(response => {
            okveds = okveds.map(function (item, index) {
                if (item.id == id) {
                    item.childrens = response.data.data;
                } else if (item.childrens) {
                    item.childrens = item.childrens.map(function (subItem, subIndex) {
                        if (subItem.id == id) {
                            subItem.childrens = response.data.data
                        }
                    });
                }
            });
        });
        this.setState({
            okveds: okveds
        });
        if($(event.target).children("ul").is(":hidden")) {
            $(event.target).children("i").text("-");
            $(event.target).children("ul").slideDown();
        }
        event.stopPropagation();
    }

    choose(event, id) {
        return true;
    }

    search(e) {
        axios.get('api/okveds/search/' + e.target.value)
    }

    treeOkveds(okveds) {
        var show = this.showSubList,
            choose = this.choose,
            childFunction = this.treeOkveds;
        return okveds.map(function (okved, index) {
            var callback = okved.childs ? show : choose;
            return (
                <li onClick={event => callback(event, okved.id)}>
                    <div>
                        <i className={okved.childs ? "parent-li" : "child-li"}></i>
                        <label>
                            <span>{okved.code}</span> - {okved.name}
                        </label>
                    </div>
                    <ul>
                        {okved.childrens ? childFunction(okved.childrens) : ""}
                    </ul>
                </li>
            );
        });
    }

    okveds() {
        return (
            <table>
                <thead>
                <tr>
                    {/*<th>Выбрать основным</th>*/}
                    <th>Код</th>
                    <th>Наименование</th>
                    <th>Убрать из списка</th>
                </tr>
                </thead>
                <tbody>
                {this.state.okveds.map(okved => {
                    return (
                        <tr>
                            {/*<td>*/}
                                {/*<input type="radio" value="" />*/}
                            {/*</td>*/}
                            <td>{okved.code}</td>
                            <td>{okved.name}</td>
                            <td>
                                <span className="svg-button remove-btn"></span>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        )
    }

    render() {
        var okveds = "",
            show = this.showSubList,
            choose = this.choose;
        if (this.state.okveds) {
            okveds = this.treeOkveds(this.state.okveds);
        }
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
                        <h4>Выберите свой ОКВЭД:</h4>
                        <div className="content">
                            {this.state.choosenOkveds ? this.okveds() : ''}
                            <button onClick={event => this.showPopUp()} className="btn">Выбрать ОКВЭД</button>
                            <div style={this.state.style} className="b-popup" id="popup1">
                                <div className="b-popup-content okveds">
                                    <h4>Отметьте галочкой основной и дополнительный вид деятельности</h4>
                                    <input type="text" placeholder="Начните вводить наименование или код" />
                                    <div className="button-wrapper">
                                        <button className="btn blue">Выбрать</button>
                                        <button className="btn">Очистить выбор</button>
                                    </div>
                                    <div className="list">
                                        <ul>
                                            {okveds}
                                        </ul>
                                    </div>
                                    <div onClick={event => this.hidePopUp()} className="close"></div>
                                </div>
                            </div>
                        </div>
                        <div className="button-wrapper">
                            <Link to="/preparation/stepFive/registerIP">
                                <button className="btn">
                                    Назад
                                </button></Link>
                            <Link to="/preparation/stepSeven/registerIP">
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

export default withRouter(StepSix)