import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const API_BASE_URL = 'http://localhost:3001/instruments'

function formatPrice(value) {
  return `${value.toLocaleString('hu-HU')} HUF`
}

function InstrumentDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [instrument, setInstrument] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadInstrument() {
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`)

        if (!response.ok) {
          throw new Error('A kiválasztott hangszer nem található.')
        }

        const data = await response.json()
        setInstrument(data)
      } catch (fetchError) {
        setError(fetchError.message)
      } finally {
        setLoading(false)
      }
    }

    loadInstrument()
  }, [id])

  return (
    <main className="container pb-4">
      <h1 className="text-center fs-3 fw-semibold mb-4">Hangszer részletek</h1>

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

      {!loading && !error && instrument && (
        <article className="card shadow-sm border-0 mx-auto detail-card">
          <div className="card-body text-center">
            <small className="text-secondary d-block mb-1">{instrument.brand}</small>
            <h2 className="h5 fw-semibold mb-3">{instrument.name}</h2>
            <img
              src={instrument.imageURL}
              alt={instrument.name}
              className="instrument-image detail-image mb-3"
            />
            <p className="mb-1 text-primary fw-semibold">{formatPrice(instrument.price)}</p>
            <p className="text-info small mb-3">Készleten: {instrument.quantity}</p>

            <div className="d-flex justify-content-center gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate(-1)}
                title="Vissza"
                aria-label="Vissza"
              >
                <i className="bi bi-arrow-left"></i>
              </button>
              <Link
                to="/uj-hangszer"
                state={{ instrument }}
                className="btn btn-outline-primary"
                title="Módosítás"
                aria-label="Módosítás"
              >
                <i className="bi bi-pencil-square"></i>
              </Link>
            </div>
          </div>
        </article>
      )}
    </main>
  )
}

export default InstrumentDetailPage
