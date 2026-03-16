import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const API_URL = 'http://localhost:3001/instruments'

const defaultInstrument = {
  name: "American Original '60s Telecaster®",
  brand: 'Fender',
  price: 649900,
  quantity: 2,
  imageURL:
    'https://www.fmicassets.com/Damroot/GuitarVertDesktopJpg/10002/0110132850_gtr_frt_001_rr.jpg',
}

function NewInstrumentPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const stateInstrument = location.state?.instrument

  const [formData, setFormData] = useState({
    name: stateInstrument?.name ?? defaultInstrument.name,
    brand: stateInstrument?.brand ?? defaultInstrument.brand,
    price: stateInstrument?.price ?? defaultInstrument.price,
    quantity: stateInstrument?.quantity ?? defaultInstrument.quantity,
    imageURL: stateInstrument?.imageURL ?? defaultInstrument.imageURL,
  })

  const [sending, setSending] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSending(true)

    const payload = {
      id: stateInstrument?.id ?? crypto.randomUUID().replace(/-/g, '').slice(0, 13),
      ...formData,
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('A hangszer mentése sikertelen volt.')
      }

      const result = await response.json()
      alert(`Backend válasz:\n${JSON.stringify(result, null, 2)}`)
      navigate('/instruments')
    } catch (submitError) {
      console.error(submitError)
      alert('Hiba történt a mentés során. Részletek a konzolban.')
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="container pb-4">
      <h1 className="text-center fs-3 fw-semibold mb-4">Új hangszer</h1>

      <form className="card shadow-sm border-0 mx-auto p-3 new-instrument-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Név
          <input
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label className="form-label">
          Márka
          <input
            className="form-control"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </label>

        <label className="form-label">
          Ár (HUF)
          <input
            type="number"
            className="form-control"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="1"
            required
          />
        </label>

        <label className="form-label">
          Készlet
          <input
            type="number"
            className="form-control"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="0"
            required
          />
        </label>

        <label className="form-label mb-3">
          Kép URL
          <input
            className="form-control"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="btn btn-primary" disabled={sending}>
          {sending ? 'Mentés...' : 'Mentés'}
        </button>
      </form>
    </main>
  )
}

export default NewInstrumentPage
