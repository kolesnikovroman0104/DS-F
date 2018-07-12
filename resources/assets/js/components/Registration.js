import React, { Component } from 'react'
import {HashRouter as Router, Link, withRouter} from 'react-router-dom'
import axios from 'axios'
import ReactDOM from "react-dom";
import Index from './Index';

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email_fns: '',
            company_name: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password_confirmation: '',
        }
    }

    onSubmit(e){
        e.preventDefault();
        const {email_fns, company_name, first_name, last_name, email, password, password_confirmation} = this.state;

        axios.defaults.headers.common['X-CSRF-TOKEN'] =
            document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        axios.post('api/user/register', {
            email_fns,
            company_name,
            first_name,
            last_name,
            email,
            password,
            password_confirmation,
        }, {
            headers: {
                'Content-Type': 'application/x.ds.v2+json'
            }
        })
            .then(response=> {
                this.setState({err: false});
                this.props.history.push("/");
            })
            .catch(error=> {
                this.email_fns="";
                this.company_name="";
                this.first_name="";
                this.last_name="";
                this.email="";
                this.password="";
                this.password_confirmation="";
                this.setState({err: true, messages: error.response.data.errors});
            });
    }

    onChange(e){
        const {name, value} = e.target ;
        this.setState({[name]: value});
    }

    render() {
        let error = this.state.err,
            messages = this.state.messages;
        let msg = '';
        if (error) {
            Object.keys(messages).map(function(objectKey, index) {
                msg += messages[objectKey] + "\n";
            });
        }
        return (
            <div className="container auth">
                <div className="logo">
                    <Link to="home"><img src="./images/logo-full.png" alt="" /></Link>
                </div>
                <div className="content">
                    <Link to="login">Вернуться</Link>
                    <h1>Регистрация в личном кабинете</h1>
                    <form method="POST" onSubmit= {this.onSubmit.bind(this)}>
                        <input id="company_name" name="company_name" type="text" placeholder="Компания" onChange={this.onChange.bind(this)} required />
                        <input id="first_name" name="first_name"  type="text" placeholder="Имя" onChange={this.onChange.bind(this)} required />
                        <input id="last_name" name="last_name" type="text" placeholder="Фамилия" onChange={this.onChange.bind(this)} required />
                        <input id="email" name="email" type="email" placeholder="Почта" onChange={this.onChange.bind(this)} required />
                        <input id="email_fns" name="email_fns" type="email" placeholder="Почта для налоговой" onChange={this.onChange.bind(this)} required />
                        <input id="password" name="password" type="password" placeholder="Пароль" onChange={this.onChange.bind(this)} required />
                        <input id="password_confirmation" name="password_confirmation" type="password" placeholder="Подтверждение пароля" onChange={this.onChange.bind(this)} required />
                        {error != undefined && <span className="error">{msg}</span>}
                        <button type="submit" className="btn">Зарегистрироваться</button>
                    </form>
                </div>
                <div className="footer">
                    <h3>Деловая Сфера © 2017-2018</h3>
                </div>
            </div>
        );
    }
}

export default withRouter(Registration)