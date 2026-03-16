import { useNavigate } from 'react-router-dom'

function resolveImageUrl(imageValue) {
  if (!imageValue) {
    return ''
  }

  if (imageValue.startsWith('http://') || imageValue.startsWith('https://')) {
    return imageValue
  }

  return `/images/${encodeURIComponent(imageValue)}`
}

function formatPrice(value) {
  return `${value.toLocaleString('hu-HU')} HUF`
}

function InstrumentCard({ instrument }) {
  const navigate = useNavigate()

  return (
    <div className="col-12 col-md-6 col-lg-4 d-flex">
      <article
        className="card shadow-sm border-0 w-100 instrument-card instrument-card-clickable"
        onClick={() => navigate(`/instruments/${instrument.id}`)}
      >
        <div className="card-body d-flex flex-column">
          <small className="text-secondary mb-1">{instrument.brand}</small>
          <h2 className="instrument-title h6 fw-semibold mb-2">{instrument.name}</h2>
          <p className="mb-1 text-primary fw-semibold">{formatPrice(instrument.price)}</p>
          <p className="text-info small mb-3">Készleten: {instrument.quantity}</p>
          <div className="instrument-image-wrap mt-auto">
            <img
              src={resolveImageUrl(instrument.imageURL)}
              alt={instrument.name}
              className="instrument-image"
              loading="lazy"
            />
          </div>
        </div>
      </article>
    </div>
  )
}

export default InstrumentCard
