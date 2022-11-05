import React, { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Route,
  NavLink,
  Switch,
  Redirect,
} from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import Settings from './components/Settings'
import Component1 from './components/Component1'
import Component2 from './components/Component2'

import Login from './components/Login'

import logo from './img/logo-white.png'
import './App.css'
import Dashboard from './components/Dashboard'

const AuthRoute = props => {
  const { type } = props
  const isAuthUser = localStorage.getItem('appname-admin-token')
  if (type === 'guest' && isAuthUser) return <Redirect to="/" />
  else if (type === 'private' && !isAuthUser) return <Redirect to="/login" />

  return <Route {...props} />
}

function App() {
  let [user, setUser] = useState(null)
  let [sideBar, setSideBar] = useState(true)

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
        {false ? (
          <header className="navbar navbar-dark">
            <div className="nav-item">
              <div className="nav-link" onClick={() => setSideBar(!sideBar)}>
                <i class="fas fa-bars navbar-icon"></i>
              </div>
            </div>
            <div className="nav-item">
              <img src={logo} className="logo-small" alt="logo app"></img>
            </div>
            <div className="nav-item">
              <div className="nav-link" onClick={() => logout()}>
                <i class="fas fa-sign-out-alt navbar-icon"></i>
              </div>
            </div>
          </header>
        ) : null}
        {sideBar && user ? (
          <div id="sidebarMenu" className="sidebar">
            <div className="nav-item">
              <NavLink
                to="/dashboard"
                className="nav-link"
                activeClassName="active"
              >
                <img src={logo} className="logo-sidebar" alt="link home"></img>
              </NavLink>
              <NavLink
                to="/settings"
                className="nav-link"
                activeClassName="active"
              >
                <FontAwesomeIcon
                  icon={icon({ name: 'gauge', style: 'solid' })}
                />
              </NavLink>
              <NavLink
                to="/component1"
                className="nav-link"
                activeClassName="active"
              >
                <FontAwesomeIcon
                  icon={icon({ name: 'users', style: 'solid' })}
                />
              </NavLink>
              <NavLink
                to="/component2"
                className="nav-link"
                activeClassName="active"
              >
                <FontAwesomeIcon
                  icon={icon({ name: 'gear', style: 'solid' })}
                />
              </NavLink>
            </div>
            <div className="nav-link" onClick={() => logout()}>
              <FontAwesomeIcon
                icon={icon({ name: 'right-from-bracket', style: 'solid' })}
              />
            </div>
          </div>
        ) : null}
        <main
          id="main-appplication"
          className={sideBar && user ? 'main-side-opened' : 'main-side-closed'}
        >
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
            <AuthRoute path="/dashboard" component={Dashboard} type="private" />

            <Route
              path="/"
              render={({ location }) => (
                <Redirect
                  to={{
                    pathname: '/dashboard',
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
