import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InstrumentCard from '../components/InstrumentCard'

const API_URL = 'http://localhost:3001/instruments'

function InstrumentsPage() {
  const [instruments, setInstruments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadInstruments() {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Nem sikerült lekérni a hangszereket.')
        }

        const data = await response.json()
        setInstruments(data)
      } catch (fetchError) {
        setError(fetchError.message)
      } finally {
        setLoading(false)
      }
    }

    loadInstruments()
  }, [])

  return (
    <main className="container pb-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <h1 className="text-center fs-3 fw-semibold mb-0">Hangszerek</h1>
        <Link className="btn btn-success" to="/uj-hangszer">
          Új hangszer
        </Link>
      </div>

      {loading && (
        <div className="alert alert-secondary" role="status">
          Adatok betöltése...
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && (
        <section className="row g-3">
          {instruments.map((instrument) => (
            <InstrumentCard key={instrument.id} instrument={instrument} />
          ))}
        </section>
      )}
    </main>
  )
}

export default InstrumentsPage
