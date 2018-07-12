import React, { Component } from 'react'
import axios from 'axios'
import Container from './Container'
import Pagination from "react-js-pagination"

export default class Order extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.edit = this.edit.bind(this);
        this.copy = this.copy.bind(this);
        this.state = {
            search: '',
            activePage: 1,
            totalCount: 0,
            orderType: {

            }
        }
    }

    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
    }

    componentDidMount (){
        if (this.state.search === '') {
            axios.get('api/orders/get-all', {}, {
                headers: {
                    'Content-Type': 'application/x.ds.v2+json'
                }
            })
                .then(response=> {
                    this.setState({err: false, data: response.data});
                    axios.get('api/orders/get-count', {}, {
                        headers: {
                            'Content-Type': 'application/x.ds.v2+json'
                        }
                    })
                        .then(response => {
                            this.setState({totalCount: response.data.count});
                        })
                        .catch(error=> {
                            this.setState({err: true});
                        });
                })
                .catch(error=> {
                    this.setState({err: true});
                });
        } else {
            axios.post('api/orders/get-all', {
                search: this.state.search
            }, {
                headers: {
                    'Content-Type': 'application/x.ds.v2+json'
                }
            })
                .then(response=> {
                    this.setState({err: false, data: response.data});
                    axios.get('api/orders/get-count', {}, {
                        headers: {
                            'Content-Type': 'application/x.ds.v2+json'
                        }
                    })
                        .then(response => {
                            this.setState({totalCount: response.data.count});
                        })
                        .catch(error=> {
                            this.setState({err: true});
                        });
                })
                .catch(error=> {
                    this.setState({err: true});
                });
        }
    }

    edit(order) {
        //TODO: Edit метод редирект  на редактирование
    }

    copy(order) {
        return false;
    }

    delete(order) {
        axios.get('api/orders/delete/' + order.id, {}, {
            headers: {
                'Content-Type': 'application/x.ds.v2+json'
            }
        })
            .then(response=> {
                this.setState({err: false, data: response.data });
            })
            .catch(error=> {
                this.setState({err: true});
            });
    }

    renderOrders() {
        if (this.state.data.data.length) {
            return this.state.data.data.map(order => {
                let styles = {
                    mask: "",
                    background: ""
                };
                if (order.status) {
                    styles = {
                        mask: "url(./images/icons/statuses/" + order.status ? order.status.status_icon : "" + ") no-repeat center;",
                        background: order.status ? order.status.status_icon_color: ""
                    };
                }
                return (
                    <div className="table-row">
                        <div className="table-cell">
                            <p><span>Внес. изменений <b>{order.order_name}</b></span></p>
                        </div>
                        <div className="table-cell">
                            <p>{order.created_at.date}</p>
                        </div>
                        <div className="table-cell">
                            <p>
                                <span className="status-badge" style={styles}></span>
                                <span>{order.status ? order.status.status_name : ""}</span>
                            </p>
                        </div>
                        <div className="table-cell">
                            <p><span>Документы доступны</span></p>
                            <div className="buttons-container">
                                <div><a>Скачать</a></div>
                                <div><a>Печать</a></div>
                            </div>
                        </div>
                        <div className="table-cell">
                            <ul>
                                <li>
                                    <a onClick={(e) => this.edit(order)}>
                                        <span className="svg-button edit-btn"></span>
                                        <span>Изменить</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={(e) => this.copy(order)}>
                                        <span className="svg-button copy-btn"></span>
                                        <span>Копировать</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={(e) => this.delete(order)}>
                                        <span className="svg-button remove-btn"></span>
                                        <span>Удалить</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            })
        } else {
            return (
                <div className="table-row"></div>
            )
        }
    }

    renderAll() {
        return (
            <div className="orders-table">
                <div className="table-row table-head">
                    <div className="table-cell">
                        <p>Клиент</p>
                    </div>
                    <div className="table-cell">
                        <p>Дата и время отправки</p>
                    </div>
                    <div className="table-cell">
                        <p>Статус</p>
                    </div>
                    <div className="table-cell">
                        <p>Документы</p>
                    </div>
                    <div className="table-cell">
                        <p>Действия</p>
                    </div>
                </div>

                {this.renderOrders()}
            </div>
        );
    }

    render() {
        let el = {};
        if (this.state.data) {
             el = this.renderAll();
        }
        return (
            <div>
                {
                    this.state.data &&
                    <div>
                        <Container content={el}></Container>
                        <Pagination
                            hideNavigation
                            pageRangeDisplayed={10}
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.data.meta.pagination.per_page}
                            totalItemsCount={this.state.totalCount}
                            onChange={this.handlePageChange}
                        />
                    </div>
                }
            </div>
        );
    }
}