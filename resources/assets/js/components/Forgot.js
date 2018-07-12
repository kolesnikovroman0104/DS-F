import React, { Component } from 'react'
import axios from 'axios'


class Forgot extends Component{
    constructor(props){
        super(props);
        this.state =  {
            email : '',
        }
    }

    onSubmit(e){
        e.preventDefault();
        const {email} = this.state;
        axios.post('api/password/email', {
            email,
        })
            .then(response=> {
                this.refs.email.value="";
                this.setState({err: false});
            })
            .catch(error=> {
                this.setState({err: true});
                this.refs.email.value="";
            });
    }


    onChange(e){
        const email = e.target.value;
        this.setState({email : email});
    }

    render(){
        let error = this.state.err ;
        let msg = (!error) ? '' : 'На данную почту не зарегистрирован аккаунт' ;
        return(
            <div className="container auth">
                <div className="logo">
                    <Link to = "home"><img src="./images/logo-full.png" alt="" /></Link>
                </div>
                <div className="content">
                    <h1>Восстановление пароля</h1>
                    <form method="POST" onSubmit= {this.onSubmit.bind(this)}>
                        {error != undefined && <span className="error">{msg}</span>}
                        <input id="email" name="email" type="text" placeholder="Почта или номер телефона" onChange={this.onChange.bind(this)} required />
                        <button type="submit" className="btn">Восстановить</button>
                    </form>
                </div>
                <div className="footer">
                    <h3>Деловая Сфера © 2017-2018</h3>
                </div>
            </div>
        )
    }
}

export default Forgot