import { FormEvent, useState } from 'react'
import styled from 'styled-components'

interface FormProps {
  send: (message: string) => void
}

export default function SendForm({send}: FormProps) {
  const [input, setInput] = useState('')

  function OnSubmit(event: FormEvent) {
    event.preventDefault()
    send(input)
    setInput('')
  }

  return (
    <SendFormContainer onSubmit={OnSubmit}>
      <MessageInput 
        placeholder='Send message: '
        value={input}
        onChange={event => setInput(event.target.value)}
      />
      <SendButton type='submit'>
        Send
      </SendButton>
    </SendFormContainer>
  )
}

const SendButton = styled.button`
  border: none;
  padding: 0.2em 0.5em;
  font-size: 1.05em;
  color: white;

  background-color: var(--primary-color);
  transition: 0.2s background-color;

  &:hover {
    background-color: var(--primary-color--dark);
  }
`

const MessageInput = styled.input`
  flex: 1;
  padding: 0.5em 1em;
  padding-bottom: 0.75em;
  font-size: inherit;
  border: none;
  outline: none;
`

const SendFormContainer = styled.form`
  display: flex;
  font-size: 1em;
  border-radius: 8px;
  box-shadow: #a3a3a3 1px 1px 5px;
  overflow: hidden;
`