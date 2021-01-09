import React from 'react';
import { BrowserRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';

import logo from './logo.png';
import './App.css';


class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        
      };

      this.menuRoutes = [{
          
      }];

      this.defautRoute= "/quiz";
  }

  componentDidMount() {
      
  }

  render() {
    return (
      <BrowserRouter className="root1">
        <div className="App">
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
          <div className="navbar-brand col-md-3 col-lg-2 me-0 px-3"><img src={logo} className="logo-small"></img></div>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <div className="nav-link" >Sign out</div>
            </li>
          </ul>
        </header>
  
        <div className="container-fluid">
          <div className="row">
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
            </nav>
  
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Switch>
              {
                this.menuRoutes.map((route, key)=>(
                  <Route path={route.path} component={route.component} key={key}/>
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
}




export default App;
