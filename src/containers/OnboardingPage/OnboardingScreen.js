import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

export default function ElegantOnboarding() {
  const [currentCard, setCurrentCard] = useState(0)
  const [animationClass, setAnimationClass] = useState('');
  const router = useHistory();

  const cards = [
    {
      title: "Renta fácil",
      description: "Encuentra el vehículo perfecto para tu próxima aventura con solo unos toques.",
      icon: "🚗",
      color: "#6366f1",
    },
    {
      title: "Gana dinero",
      description: "Convierte tu vehículo en una fuente de ingresos. Publica y empieza a ganar.",
      icon: "🔑",
      color: "#ec4899",
    },
    {
      title: "Únete ahora",
      description: "Crea tu cuenta en segundos y accede a nuestra comunidad de conductores.",
      icon: "👤",
      color: "#f59e0b",
    },
  ]

  useEffect(() => {
    setAnimationClass('slide-in')
    const timer = setTimeout(() => setAnimationClass(''), 300)
    return () => clearTimeout(timer)
  }, [currentCard])

  const handleNext = () => {
    if (currentCard < cards.length - 1) {
      setAnimationClass('slide-out')
      setTimeout(() => {
        setCurrentCard(currentCard + 1)
      }, 300)
    }
  }

  const goToPreLogin = () => {
    router.push('/prelogin');
  }

  return (
    <div className="onboarding-container">
      <div className="card-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${index === currentCard ? 'active' : ''} ${animationClass}`}
            style={{ '--card-color': card.color }}
          >
            <div className="card-icon">{card.icon}</div>
            <div className="card-content">
              <h2 className="card-title">{card.title}</h2>
              <p className="card-description">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="controls">
        <div className="indicators">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentCard ? 'active' : ''}`}
            />
          ))}
        </div>
        {currentCard < cards.length - 1 ? (
          <button onClick={handleNext} className="next-button">
            <span>Siguiente</span>
          </button>
        ) : (
          <button onClick={() => goToPreLogin()} className="start-button">
            <span>Comenzar</span>
          </button>
        )}
      </div>

      <style jsx>{`
        .onboarding-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f3f4f6;
          padding: 1rem;
          overflow: hidden;
        }

        .card-container {
          position: relative;
          width: 100%;
          max-width: 350px;
          height: 580px;
          margin-bottom: 2rem;
        }

        .card {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2rem;
          border-radius: 24px;
          background: linear-gradient(135deg, var(--card-color), rgba(0, 0, 0, 0.3));
          color: white;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          opacity: 0;
          transform: translateX(100%);
          transition: all 0.3s ease-in-out;
        }

        .card.active {
          opacity: 1;
          transform: translateX(0);
        }

        .card-icon {
          font-size: 8rem;
          text-align: center;
          margin-top: 60px;
        }

        .card-content {
          text-align: left;
        }

        .card-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .card-description {
          font-size: 1rem;
          line-height: 1.5;
        }

        .controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 320px;
        }

        .indicators {
          display: flex;
          gap: 0.5rem;
        }

        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #d1d5db;
          transition: all 0.3s ease;
        }

        .indicator.active {
          width: 24px;
          border-radius: 12px;
          background-color: #3b82f6;
        }

        .next-button,
        .start-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          font-weight: bold;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .next-button {
          background-color: white;
          color: #3b82f6;
        }

        .start-button {
          background-color: #3b82f6;
          color: white;
        }

        .next-button:hover,
        .start-button:hover {
          transform: scale(1.05);
        }

        .next-button:active,
        .start-button:active {
          transform: scale(0.95);
        }

        .chevron-icon {
          margin-left: 0.5rem;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-100%);
            opacity: 0;
          }
        }

        .slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }

        .slide-out {
          animation: slideOut 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}