import React, { useEffect, useState } from 'react'
const baseUrl = 'https://your-backend.com/api'

function ComponentWebsocket(props) {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('disconnected')
  useEffect(() => {
    let wssUrl = `wss://your-backend.com/api/wss`

    let parser = event => {
      try {
        let body = JSON.parse(event.data)
        console.log(body)
        if (body) setData(body)
      } catch (e) {}
    }

    function onOpen() {
      setStatus('connected')
    }

    function onClose() {
      setStatus('disconnected')
      setTimeout(() => {
        if (window.ws == 'disconnect') return
        setStatus('connecting')
        window.ws = new WebSocket(wssUrl)
        window.ws.onmessage = parser
        window.ws.onopen = onOpen
        window.ws.onclose = onClose
      }, Math.round(Math.random() * 2000))
    }

    setStatus('connecting')
    window.ws = new WebSocket(wssUrl)
    window.ws.onmessage = parser
    window.ws.onopen = onOpen
    window.ws.onclose = onClose

    return () => {
      if (window.ws) {
        try {
          window.ws.onopen = () => {}
          window.ws.onclose = () => {}
          window.ws.close()
          window.ws = 'disconnect'
        } catch (e) {
          console.log(e.message || e)
        }
      }
    }
  }, [])

  return (
    <>
      <div className={`wss-status wss-status-${status}`}></div>
      <p>ComponentWebsocket works!</p>
    </>
  )
}

export default ComponentWebsocket
