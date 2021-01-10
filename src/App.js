import React from 'react';
import { BrowserRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import Settings from './components/Settings';
import QuizHome from './components/QuizHome';
import QuizNew from './components/QuizNew';
import QuizSolve from './components/QuizSolve';
import QuizClassifica from './components/QuizClassifica';
import QuizList from './components/QuizList';
import Stats from './components/Stats';

import Login from './components/Login';

import logo from './logo.png';
import './App.css';


const AuthRoute = props => {
  const { type } = props;
  const isAuthUser = localStorage.getItem('pge-twitch-admin-token');
  if (type === "guest" && isAuthUser) return <Redirect to="/" />;
  else if (type === "private" && !isAuthUser) return <Redirect to="/login" />;

  return <Route {...props} />;
};

class App extends React.Component {
  constructor(props) {
      super(props);

      let user;
      const token = localStorage.getItem('pge-twitch-admin-token');
      if (token) user = jwt_decode(token);

      this.state = {
        sideBar: false,
        user: user,
      };
      
      
      
      
      
      
      this.menuRoutes = [
        {
          name: "Settings",
          path: "/settings",
          component: Settings
        },{
          name: "Quiz",
          path: "/quiz",
          component: QuizHome
        },{
          name: "Statistiche",
          path: "/stats",
          component: Stats
        },
      ];

      this.defautRoute= "/settings";
  }

  componentDidMount() {
      
  }

  updateToken() {
    let user;
      const token = localStorage.getItem('pge-twitch-admin-token');
      if (token) user = jwt_decode(token);

      this.setState(()=>{return {
        user: user
      }});
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              {this.state.user? <div className="nav-link" onClick={() => this.setState({sideBar: !this.state.sideBar})}><i class="fas fa-bars navbar-icon"></i></div>: null}
            </li>
          </ul>

          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
            <img src={logo} className="logo-small"></img>
              </li>
          </ul>

          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              {this.state.user? <div className="nav-link" onClick={() => this.logout()}><i class="fas fa-sign-out-alt navbar-icon"></i></div>: null}
            </li>
          </ul>
        </header>
  
        <div className="container-fluid">
          <div className="row">
            {
              this.state.sideBar && this.state.user?
                <nav id="sidebarMenu" className="col-md-2 col-lg-1 d-md-block sidebar">
                  <div className="position-sticky pt-3">
                    <ul className="nav flex-column">
                      {
                        this.menuRoutes.map((menu, key) => (
                          <li className="nav-item">
                            <NavLink to={menu.path} className="nav-link" activeClassName="active" key={key}>
                              {menu.name}
                            </NavLink>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </nav> : null
            }
  
            <main className={this.getStatusBar()} id="main-appplication">
            <Switch>
            <AuthRoute path="/login" type="guest"><Login callBack={()=>{this.updateToken()}}/></AuthRoute>
              {
                this.menuRoutes.map((route, key)=>(
                  <AuthRoute path={route.path} component={route.component} key={key} type="private"/>
                ))
              }
              <Route path="/" render={({ location }) => (
                  <Redirect
                      to={{
                      pathname: this.defautRoute,
                      state: { from: location }
                      }}
                  />)}
              />
            </Switch>
            </main>
          </div>
        </div>
      </div>
    </BrowserRouter>
      );
  }
  getStatusBar() {
    if (this.state.sideBar && this.state.user) return "col-md-9 ms-sm-auto col-lg-10 px-md-4";
    return "col-12 ms-sm-auto px-md-4";
  }

  
  logout() {
    localStorage.removeItem('pge-twitch-admin-token');
    this.setState(() => {return ({ user: null})});
  }
}
export default App;
