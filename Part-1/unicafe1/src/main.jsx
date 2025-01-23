import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App"; // Correct name of the file
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
