import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import loading from '../loading.svg'
import jwt_decode from 'jwt-decode'

import '../login.css'

const baseUrl = 'https://your-backend.com/v1'

function Login(props) {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let [error, setError] = useState('')
  let [loading, setLoading] = useState(false)

  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <div className="login-title-box">
            <h1 className="login-title">Admin Panel</h1>
          </div>
          <div className="login-input-box">
            <div className="login-input-row login-name-row">
              <input
                className="login-input"
                type="text"
                id="nome"
                name="nome"
                placeholder="username..."
                onKeyDown={e => {
                  if (e.code === '13') {
                    login(username, password, setError, setLoading, setLoggedIn)
                  }
                }}
                value={username}
                onChange={event => setUsername(event.target.value)}
              />
            </div>
            <div className="login-input-row login-name-row">
              <input
                className="login-input"
                type="password"
                name="password"
                id="password"
                placeholder="password..."
                onKeyDown={e => {
                  if (e.code === '13') {
                    login(username, password, setError, setLoading, setLoggedIn)
                  }
                }}
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </div>
            <div className="login-submit-row">
              <button
                className="login-button"
                onClick={() => {
                  login(username, password, setError, setLoading, setLoggedIn)
                }}
                onKeyDown={e => {
                  if (e.code === '13') {
                    login(username, password, setError, setLoading, setLoggedIn)
                  }
                }}
                type="submit"
              >
                {loading ? <img src={loading} alt="loading..." /> : 'Login'}
              </button>
            </div>
          </div>
          {error ? (
            <div className="error-box">
              <div className="error-row">
                <p>{error}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}
async function login(username, password, setError, setLoading, setLoggedIn) {
  let response = await fetch(`${baseUrl}/auth`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: password.trim(),
      username: username.trim(),
      browser: {
        codeName: navigator.appCodeName,
        name: navigator.vendor,
        version: navigator.appVersion,
        cookies: navigator.cookieEnabled,
        platform: navigator.platform,
        userAgent: navigator.userAgent,
      },
    }),
  })

  if (!response.ok) {
    response.text().then(res => console.log(res))
    setLoading(false)
    setError(true)
    setPassword('')
    setTimeout(() => {
      setError(false)
    }, 3000)
    return
  }
  let data = {}
  try {
    data = await response.json()
  } catch (e) {
    console.log(e.message)
  }
  if (data && data.token) {
    localStorage.setItem('appname-admin-token', data.token)
    props.setUser(jwt_decode(data.token))
  }
}

export default Login
