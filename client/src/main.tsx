import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// The browser restores the previous scroll offset on reload by default,
// which fights the loading screen's "start fresh at the top" intent. The
// explicit `behavior: 'instant'` matters as much as the reset itself: `html`
// has `scroll-behavior: smooth` globally, which a bare `scrollTo(0, 0)`
// would inherit — turning this correction into a visible glide-to-top
// instead of landing there before first paint.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}
window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
