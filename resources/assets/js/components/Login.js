import React, { Component } from 'react'
import {HashRouter as Router, Link, withRouter} from 'react-router-dom';
import axios from 'axios'
import ReactDOM from "react-dom";
import Index from "./Index";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const {email, password} = this.state;

        axios.defaults.headers.common['X-CSRF-TOKEN'] =
            document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        axios.post('api/user/login', {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/x.ds.v2+json'
            }
        })
            .then(response => {
                this.setState({err: false});
                localStorage.setItem('isLogin', true);
                axios.get('/api/user/info', {}, {
                    headers: {
                        'Content-Type': 'application/x.ds.v1+json'
                    }
                })
                    .then(response => {
                        localStorage.setItem('user', JSON.stringify(response));
                        this.props.history.push("/");
                    })
                    .catch(error => {
                        console.log(error.response.data.errors);
                    });
            })
            .catch(error => {
                this.email = "";
                this.password = "";
                this.setState({err: true, messages: error.response.data.errors});
            });
    }

    onChange(e) {
        const {name, value} = e.target;
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
                    <Link to="/"><img src="./images/logo-full.png" alt=""/></Link>
                </div>
                <div className="content">
                    <h1>Вход в личный кабинет</h1>
                    {error != undefined && <span className="error">{msg}</span>}
                    <form method="POST" onSubmit={this.onSubmit.bind(this)}>
                        <input id="email" name="email" type="text" placeholder="Почта" required
                               onChange={this.onChange.bind(this)}/>
                        <input id="password" name="password" type="password" placeholder="Пароль" required
                               onChange={this.onChange.bind(this)}/>
                        <Link to="/register">Не зарегистрированы?</Link>
                        <button className="btn" type="submit">Войти</button>
                    </form>
                </div>
                <div className="footer">
                    <h3>Деловая Сфера © 2017-2018</h3>
                </div>
            </div>
        );
    }
}

export default withRouter(Login)