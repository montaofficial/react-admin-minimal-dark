import React, { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Route,
  NavLink,
  Switch,
  Redirect,
} from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import Settings from './components/Settings'
import Component1 from './components/Component1'
import Component2 from './components/Component2'

import Login from './components/Login'

import logo from './img/logo-white.png'
import './App.css'

const AuthRoute = props => {
  const { type } = props
  const isAuthUser = localStorage.getItem('appname-admin-token')
  if (type === 'guest' && isAuthUser) return <Redirect to="/" />
  else if (type === 'private' && !isAuthUser) return <Redirect to="/login" />

  return <Route {...props} />
}

function App() {
  let [user, setUser] = useState(null)

  useEffect(() => {
    try {
      const token = localStorage.getItem('appname-admin-token')
      if (token) setUser(jwt_decode(token))
    } catch (e) {
      console.log(e.message)
    }
  }, [])

  let logout = () => {
    localStorage.removeItem('appname-admin-token')
    setUser(null)
  }
  return (
    <BrowserRouter>
      <>
        <header className="navbar navbar-dark">
          <div className="nav-item">
            {this.state.user ? (
              <div
                className="nav-link"
                onClick={() => this.setState({ sideBar: !this.state.sideBar })}
              >
                <i class="fas fa-bars navbar-icon"></i>
              </div>
            ) : null}
          </div>

          <div className="nav-item">
            <img src={logo} className="logo-small"></img>
          </div>

          <div className="nav-item">
            {this.state.user ? (
              <div className="nav-link" onClick={() => this.logout()}>
                <i class="fas fa-sign-out-alt navbar-icon"></i>
              </div>
            ) : null}
          </div>
        </header>
        {this.state.sideBar && this.state.user ? (
          <div id="sidebarMenu" className="sidebar">
            <div className="nav-item">
              <NavLink
                to="/settings"
                className="nav-link"
                activeClassName="active"
              >
                S
              </NavLink>
              <NavLink
                to="/component1"
                className="nav-link"
                activeClassName="active"
              >
                1
              </NavLink>
              <NavLink
                to="/component2"
                className="nav-link"
                activeClassName="active"
              >
                2
              </NavLink>
            </div>
          </div>
        ) : null}
        <main id="main-appplication">
          <Switch>
            <AuthRoute path="/login" type="guest">
              <Login setUser={setUser} />
            </AuthRoute>

            <AuthRoute path="/settings" component={Settings} type="private" />
            <AuthRoute
              path="/component1"
              component={Component1}
              type="private"
            />
            <AuthRoute
              path="/component2"
              component={Component2}
              type="private"
            />

            <Route
              path="/"
              render={({ location }) => (
                <Redirect
                  to={{
                    pathname: this.defautRoute,
                    state: { from: location },
                  }}
                />
              )}
            />
          </Switch>
        </main>
      </>
    </BrowserRouter>
  )
}

export default App
