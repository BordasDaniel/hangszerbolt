import { Link, Navigate, Route, Routes } from 'react-router-dom'
import InstrumentsPage from './pages/InstrumentsPage'
import InstrumentDetailPage from './pages/InstrumentDetailPage'
import NewInstrumentPage from './pages/NewInstrumentPage'
import './App.css'

function App() {
  return (
    <div className="app-shell bg-light min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/instruments">
            Hangszerbolt
          </Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/instruments">
              Hangszerek
            </Link>
            <Link className="nav-link" to="/uj-hangszer">
              Új hangszer
            </Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/instruments" replace />} />
        <Route path="/hangszerek" element={<Navigate to="/instruments" replace />} />
        <Route path="/instruments" element={<InstrumentsPage />} />
        <Route path="/instruments/:id" element={<InstrumentDetailPage />} />
        <Route path="/uj-hangszer" element={<NewInstrumentPage />} />
      </Routes>
    </div>
  )
}

export default App
