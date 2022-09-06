import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Chat from './Chat'

export type HistoryRecord = 
  | { type: 'searching' }
  | { type: 'start' }
  | { type: 'end' }
  | { type: 'message', message: string, self?: boolean }

const wsurl = process.env.NODE_ENV === 'development'
  ? 'ws://localhost:8080'
  // ? 'ws://dry-ravine-74839.herokuapp.com/'
  : 'wss://dry-ravine-74839.herokuapp.com/'

export default function App() {

  const ws = useRef<WebSocket>()
  const [history, setHistory] = useState<HistoryRecord[]>([])

  function SendMessage(message: string) {
    ws.current?.send(JSON.stringify({
      type: 'message',
      message,
    }))
    setHistory(prev => [...prev, {
      type: 'message',
      message, self: true
    }])
  }

  function NextPartner() {
    ws.current?.send(JSON.stringify({
      type: 'next'
    }))
    setHistory(prev => [...prev, {
      type: 'searching'
    }])
  }

  useEffect(() => {
    const websocket = new WebSocket(wsurl)

    websocket.onopen = () => {
      console.log('Connection established.')
    }

    websocket.onmessage = event => {
      const data = JSON.parse(event.data) as HistoryRecord
      setHistory(prev => [...prev, data])
    }

    ws.current = websocket
    return () => websocket.close()
  }, [])

  return (
    <AppContainer>
      <Chat
        history={history}
        onSendMessage={SendMessage} 
      />
      <NextButton onClick={NextPartner}>Next</NextButton>
    </AppContainer>
  )
}

const NextButton = styled.button`
  margin-top: 0.5em;
  border: none;
  padding: 0.2em 0.5em;
  font-size: 1.05em;
  color: white;
  border-radius: 8px;
  font-weight: bold;

  background-color: var(--primary-color);
  transition: 0.2s background-color;

  &:hover {
    background-color: var(--primary-color--dark);
  }
`

const AppContainer = styled.main`
  width: 100%; height: 100%;
  max-width: 520px;
  max-height: 720px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`