import React from 'react';
import { Redirect } from 'react-router-dom';
import loading from '../loading.svg';
import jwt_decode from 'jwt-decode';

import '../login.css'

const baseUrl = 'https://your-backend.com/v1';

class Login extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        error: false,
        name: "",
        password: "",
        loggedIn: false
      };
  }

  componentDidMount() {
      
  }

  keyDown (event){
    if(event.keyCode === '13'){
      this.login();
    }
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.loggedIn? <Redirect to={{pathname: "/" ,state: { from: null }}}/> : null
        }
      <div className="container" onKeyDown={e => {this.keyDown(e)}}>
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-9 col-lg-8">
            <div className="card login-card">
              <div className="row justify-content-center">
                <div className="col-12">
                <h3 className="login-title">Admin Page</h3>
                </div>
              </div>
              <div  className="row justify-content-center">
                <div className="col-12 p-2">
                  <div className="wrap-input100 validate-input">
                    <input className="input100" type="text" id="nome" name="nome" placeholder="username..." onKeyDown={e => {this.keyDown(e)}} value={this.state.name} onChange={(event)=> {this.setState( Object.assign({}, this.state, { name: event.target.value }))}}/>
                    <span className="focus-input100"></span>
                    <span className="symbol-input100"><i className="far fa-user" aria-hidden="true"></i></span>
                  </div>
                </div>
              </div>
              <div  className="row justify-content-center">
                <div className="col-12 p-2">
                 <div className="wrap-input100 validate-input">
                    <input className="input100" type="password" name="id" id="id" placeholder="password..." onKeyDown={e => {this.keyDown(e)}} value={this.state.password} onChange={(event)=> {this.setState( Object.assign({}, this.state, { password: event.target.value }))}}/>
                    <span className="focus-input100"></span>
                    <span className="symbol-input100"><i className="fa fa-lock" aria-hidden="true"></i></span>
                  </div>
                </div>
              </div>
              <div  className="row justify-content-center">
                <div className="col-12 p-2">
                <div className="container-login100-form-btn">
                  <button className="login100-form-btn submit2" onClick={()=>{this.login()}} onKeyDown={e => {this.keyDown(e)}} type="submit">
                  {this.state.loading ? <img src={loading} alt="loading..."/> : 'Accedi'}
                  </button>
                 </div>
                </div>
              </div>
              {this.state.error ? <div  className="row justify-content-center">
                <div className="col-12 p-2">
                  <div className="alert alert-danger w3-animate-fading">
                    <div>
                    Invalid credentials. Retry!
                    </div>
                  </div>
                </div>
              </div> : null}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
      );
  }
  async login () {
    let response = await fetch(`${baseUrl}/auth`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          password: this.state.password.trim(),
          username: this.state.name.trim(),
          browser: {
            codeName:navigator.appCodeName,
            name: navigator.vendor,
            version: navigator.appVersion,
            cookies: navigator.cookieEnabled,
            platform: navigator.platform,
            userAgent: navigator.userAgent
          }
      })
    });
    
    if (!response.ok) {
      response.text().then(res => console.log(res));
      this.setState( Object.assign({}, this.state, {
        error: true,
        name: "",
        password: "",
        loading: false
      }));
      setTimeout(()=>{
        this.setState( Object.assign({}, this.state, {
          error: false
        }))
      },3000);
      return;
    }
    let data = {};
    try {data = await response.json()}
    catch (e) {console.log(e.message)}
    if (data && data.token)
    localStorage.setItem('appname-admin-token', data.token);
    this.props.callBack();

  }

}

export default Login;