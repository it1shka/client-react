import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'
import App from './App'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const GlobalStyle = createGlobalStyle`
  ::before, ::after, * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --primary-color: #4370ec;
    --primary-color--dark: #3051ac;
  }

  body {
    // font-size: calc(1vw + 0.5em);
    @media (min-width: 35em) {
      font-size: 1em;
    }
    font-family: sans-serif;
    background-color: #dddddd;
  }

  #root {
    display: grid;
    height: 100vh;
    place-items: center;
  }
`

root.render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>
)
