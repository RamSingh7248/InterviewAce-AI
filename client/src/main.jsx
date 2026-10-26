import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/theme.css'
import './index.css'
import App from './App.jsx'

// Restore route path if redirected by static host 404 fallback
try {
  const redirectPath = sessionStorage.getItem('redirect_path');
  if (redirectPath) {
    sessionStorage.removeItem('redirect_path');
    window.history.replaceState(null, '', redirectPath);
  }
} catch (e) {
  // Ignore sessionStorage errors
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
