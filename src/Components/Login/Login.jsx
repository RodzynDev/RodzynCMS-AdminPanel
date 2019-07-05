import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Preloader } from 'react-materialize'

import Image from '../Image';

import'./Login.scss';
import logo from './images/logo_white.png';

import LoginAPI from '../../Modules/Auth';

class Login extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      messageError: '',
      messageSuccess: '',
      loginClick: false,
      email: '',
      password: '',
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.setState({ 
      loginClick: true,
     })

    try {
      const status = await LoginAPI.AuthLogin(this.state.email, this.state.password)
      this.setState ({
        messageSuccess: "Zalogowano pomyślnie! \n Zaraz nastąpi przekierowanie...",
        messageError: "",
        email: '',
        password: ''
      });
      
      this.props.history.push('/');
      
    } catch (e) {
      this.setState({ 
        messageError: ""+e, 
        loginClick: false
      });
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  validateForm() {
    const { email, password } = this.state;
    return (
      email.length > 0 &&
      password.length > 0
    );
  }

  render() {
    const CardMessageError = this.state.messageError ? (
      <Card className='red darken-4' textClassName='white-text'>
        {this.state.messageError}
      </Card>) : ('')

    const CardMessageSuccess = this.state.messageSuccess ? (
      <Card className='green' textClassName='white-text'>
        {this.state.messageSuccess}
      </Card>) : ('')

    const LoginProgress = this.state.loginClick ? (
      <Preloader flashing size="small" />
    ) : ('')

    return (
      <div className="login-page">
        <div className="container">
          <div className="logo">
            <Image src={logo} alt="Logo Rodzyn.pl" />
          </div>
          {CardMessageError}
          {CardMessageSuccess}
          <form id="loginForm" onSubmit={this.handleSubmit}>
            <input id="email" type="text" placeholder="Adres e-mail..." value={this.state.email} onChange={this.handleChange} />
            <input id="password" type="password" placeholder="Hasło..." value={this.state.password} onChange={this.handleChange} />
            <button type="submit" id="login" style={{ display: this.state.loginClick ? 'none' : 'block' }} disabled={!this.validateForm()} >Zaloguj</button>
            {LoginProgress}
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);

