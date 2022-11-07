import React, { useEffect, useState } from 'react'
const baseUrl = 'https://your-backend.com/api'

function ComponentWebsocket(props) {
  const [video, setVideo] = useState(null)
  useEffect(() => {
    let wssUrl = `wss://your-backend.com/api/wss`

    let parser = event => {
      try {
        let body = JSON.parse(event.data)
        console.log(body)
        if (body?.video) setVideo(body.video)
      } catch (e) {}
    }

    function onClose() {
      setTimeout(() => {
        window.ws = new WebSocket(wssUrl)
        window.ws.onmessage = parser
        window.ws.onclose = onClose
      }, Math.round(Math.random() * 2000))
    }

    window.ws = new WebSocket(wssUrl)
    window.ws.onmessage = parser
    window.ws.onclose = onClose

    return () => {
      if (window.ws) {
        try {
          window.ws.close()
        } catch (e) {
          console.log(e.message || e)
        }
      }
    }
  }, [])

  return <p>ComponentWebsocket works!</p>
}

export default ComponentWebsocket
