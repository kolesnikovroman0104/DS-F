import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'

class Container extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")).data.data
        }
    }

    logout(e){
        e.preventDefault();
        axios.post('api/user/logout')
            .then(response=> {
                this.props.history.push('/');
            })
            .catch(error=> {
                console.log(error);
            });
        this.props.history.push('/');
    }

    render() {
        return (
            <div id="control-panel">
                <div className="top-bar">
                    <div className="logo">
                        <a href="">
                            <img src="./images/logo-mini.png" alt="" />
                        </a>
                    </div>
                    <div className="right">
                        <ul>
                            <li><button className="svg-button profile-btn"></button></li>
                            <li><button className="svg-button social-btn"></button></li>
                            <li><button className="svg-button messages-btn"></button><span className="badge">3</span></li>
                            <li className="profile">
                                <div className="avatar">
                                    <img src="./images/logo-mini.png" alt="" />
                                </div>
                                <div className="user-info">
                                    <h3>Здравствуйте, <b>{this.state.user["full name"]}</b></h3>
                                    <h4>Ваш баланс: <span className="balance">{this.state.user.balance} &#8381;</span></h4>
                                    <div className="profile-buttons">
                                        <a href="">Пополнить</a>
                                        <button className="svg-button exit-btn" onClick={event => this.logout(event)}></button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="container">
                    <div className="left-bar">
                        <ul className="main-menu">
                            <li>
                                <Link to="/panel">
                                    <span className="svg-button admin-btn"></span>
                                    <span>Панель управления</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/orders">
                                    <span className="svg-button orders-btn"></span>
                                    <span>Мои заявки</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/send">
                                    <span className="svg-button send-docs-btn"></span>
                                    <span>Отправка документов</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/preparation">
                                    <span className="svg-button prepare-docs-btn"></span>
                                    <span>Подготовка документов</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/selection/accountant">
                                    <span className="svg-button accountant-btn"></span>
                                    <span>Подбор бухгалтера</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/selection/bank">
                                    <span className="svg-button bank-btn"></span>
                                    <span>Подбор банка</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/address">
                                    <span className="svg-button address-btn"></span>
                                    <span>Юридический адрес</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/reporting">
                                    <span className="svg-button reporting-btn"></span>
                                    <span>Подключение отчетности</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/statistic">
                                    <span className="svg-button stats-btn"></span>
                                    <span>Статистика</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="content" id="orders">
                        {this.props.content}
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(Container)