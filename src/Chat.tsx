import { useEffect, useRef } from "react";
import styled from "styled-components";
import { HistoryRecord } from "./App";
import SendForm from "./SendForm";

interface ChatProps {
  history: HistoryRecord[],
  onSendMessage: (message: string) => void
}

export default function Chat({history, onSendMessage}: ChatProps) {
  const bottom = useRef<HTMLLIElement>(null)

  function ToBottom() {
    bottom.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  useEffect(ToBottom, [history])

  return (
    <ChatContainer>
      <Titlebar>Random chat</Titlebar>

      <MessageContainer>
        <ModalMessage>
          Click "next" to find a person!
        </ModalMessage>
        {history.map((message, idx) => {
          switch(message.type) {
            case 'start':
              return <ModalMessage key={idx}>Conversation started!</ModalMessage>
            case 'end':
              return <ModalMessage key={idx}>Conversation finished.</ModalMessage>
            case 'searching':
              return <ModalMessage key={idx}>Searching for a companion...</ModalMessage>
            default:
              return <Message key={idx} self={message.self}>{message.message}</Message>
          }
        })}
        <li style={{marginTop: '60px'}} ref={bottom}></li>
      </MessageContainer>
      
      <SendForm send={onSendMessage}/>
    </ChatContainer>
  )
}

const ModalMessage = styled.li`
  color: #838383;
  background-color: #e7e7e7;
  align-self: center;
  padding: 0.2em 0.5em;
  border-radius: 8px;
  margin: 0.35em 0.75em;
  max-width: 350px;
`

const Message = styled.li<{self?: boolean}>`
  background-color: ${({self}) => self 
    ? 'var(--primary-color)' 
    : '#cdcdcd'};
  color: ${({self}) => self
    ? 'white'
    : 'inherit'};
  align-self: ${({self}) => self
    ? 'flex-end'
    : 'flex-start'};
  padding: 0.2em 0.5em;
  border-radius: ${({self}) => self
    ? '8px 8px 0px 8px'
    : '8px 8px 8px 0px'};
  margin: 0.15em 0.75em;
  max-width: 240px;
`

const MessageContainer = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
  /* box-shadow: inset white 0px 0px 20px; */
`

const Titlebar = styled.h1`
  background-color: var(--primary-color--dark);
  color: white;
  padding: 0.25em 0.5em;
  box-shadow: var(--primary-color--dark) 0px 0px 4px;
`

const ChatContainer = styled.div`
  flex: 1;
  width: 100%;

  background-color: white;
  box-shadow: #c2c2c2 1px 1px 5px;
  border-radius: 8px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
`