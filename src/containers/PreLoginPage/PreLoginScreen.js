import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

export default function PreLoginScreen() {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('');
  const router = useHistory();

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleButtonClick = () => {
    setIsLoading(true)
    setError('')
    setTimeout(() => {
      setIsLoading(false)
      setError('No se ha podido acceder a los permisos de ubicación. Por favor, verifique la configuración de su dispositivo.')
    }, 3000)
  }

  const goToRouter = (path) => {
    router.push(path);
  }

  return (
    <div className="pre-login-container">
      <div className={`content ${mounted ? 'fade-in' : ''}`}>
        <div className="logo-container">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAABHNCSVQICAgIfAhkiAAABPxJREFUeF7tm1koblEUx9dnJkIyhZIpPInygLwg8/hgKCGehJQoGQoZopThBU/K8CIZShEpiUSRobwovBCZyxjuvWvXJ9d1z97HOd/nnHv3v76+l3XOt9fPWnvvtfam+fFLwPVGQMOB/B4NHMiH7OBAOBDhCZNHCI8QHiGiNhU8ZXjK6Dhl9vf34fHxUVRYvjc2NDQEc3Pz3z4ajebL75P6oOSUCQ8Ph62trS+PA4GYmJiQj6mpKfj4+EBeXh7Ex8cTSPqWZCCBgYGwsbEh+7htbGwgIiIC8vPzyTfC0ocUC+S98wEBATA9PQ2Ojo46Z6IKIEjByMgIysvLobGxETDNdCXVANECiIyMhMHBQZ1Fi+qA4Ark7+8Ps7Oz4OzsLHugqA6IlkBUVBRMTEzIvhKpFghGSkJCAoyPj4OBgYFskaIXIN7e3pCUlPTHoJ+fn+Hm5gbOz8/JXubw8BDEdjSHh4chKytLXUDS0tJgdHRUcNCvr6+wuroKZWVlsLa2BgiLRUFBQbCyskJWITmklwhhAaJ15v7+HhYXF8lu9fj4mOojpk5zczNUVlZSbVkMFAdEO+jl5WVITk6Gs7Mzqh9ubm6wvb0N1tbWVFuagWKB4MBnZmbI3PP09CToh4WFBSwtLQHuaKVK0UCwio6Li4P5+Xmqnx0dHVBaWkq1oxkoGggOHucTrKhpCgkJIVEiVYoHgsuwh4cHHBwcCPqKu9ajoyOpPEDxQNDD7OxsGBoaEnQWV5uHhwfSV5EiVQCpqamBpqYmqp/YvXN3d6faCRmoAkh7ezsp/Wna3d0FX19fmplwpEk97GbpmInZmH022paWFqiqqqI6ihs5Jycnqp3qIwSjA6OEpru7O8nVrypSJjU1lVS1QvpvVpmXlxdwcHCAi4sLQSBS01L7csVHyMjICKSnp9OyhaQUVspSpWggOCeEhYVRjznMzMxgYWEBgoODpfJQ9sasr68PSkpKqMUdVrubm5tga2v77wKZm5sD7JuyqLi4GLq7u1lMqTaKSxlsEHV1dUFraytcXl5SHXBxcSG9EDmiA3/s24Fg8XZ7ewunp6ews7MD1dXV5JtVDQ0NUFtby2pOtdMLEFdXVzI5ftTV1RWcnJwATp7YaMalFXurrMK6ZX19Xbbo0FuEsDooxg636Ngr8fLyEvMY1VYvEUIdxRcM8PA7Ojr6C08KP6I6IHZ2dtDf308OqXQhVQHBM93JyUnw9PTUBQvyTlUAweMFXH1yc3NJXaNLKR4ItgSx6x4aGqpLDm/vVjwQHGlMTAxMTU3Jeqj9N7p6AYIN4I+3frCsF3OwnZGRAb29vbKczgmFml6AfNarwN0opgGe/rOqqKgIOjs71X+l6m/NGzyqxOuXGC0swigrLCwkvQ+pxw3fmjJC3SzcYGVmZsL19TULE3Ltoa2tjbQF5LoC8f6Hvy1l3g9iYGAAcnJymICgkbGxMbmNWFFRAXLfelYEEHSyp6eHtACx/GeRpaUlmWTx9pCcUBQDBCHU19dDXV0dC483m7GxMUhJSRH1jCJXmc8GhcswQsEPq3DnirVNbGws6yOCdpIjhOXyf2JiIuA8wSJccQoKCsiVS9Z9Cm7tcXL28/Nj+QndAmH59xArKyvAVh+rEMre3h4zEHyvvb09YCUsVZIjROoAlPY8B/LhL8KBcCDCScojhEcIjxBRCxlPGZ4yPGVEpcxPak5VYpPijwMAAAAASUVORK5CYII=" className='logo' />
        </div>
        <p className="tagline">Tu viaje comienza aquí</p>
        <div className="buttons-container">
          <button className="button login-button" onClick={() => {
            goToRouter('/login')
          }} disabled={isLoading}>
            <span className="button-icon" role="img" aria-label="Login">🔑</span>
            <span>Iniciar sesión</span>
          </button>
          <button className="button register-button" onClick={() => {
            goToRouter('/signup')
          }} disabled={isLoading}>
            <span className="button-icon" role="img" aria-label="Register">📝</span>
            <span>Registrarse</span>
          </button>
          <button className="button guest-button" onClick={handleButtonClick} disabled={isLoading}>
            <span className="button-icon" role="img" aria-label="Guest">👤</span>
            <span>Continuar como invitado</span>
          </button>
        </div>
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>

      <style jsx>{`
        .pre-login-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #ffa07a 0%, #ff7f50 50%, #ff6347 100%);
          padding: 2rem;
          box-sizing: border-box;
        }

        .content {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2rem;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 8px 32px rgba(255, 99, 71, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.18);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .content.fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .logo {
          font-size: 3rem;
          margin-right: 1rem;
          border-radius:40px;
        }

        .app-name {
          font-size: 2.5rem;
          font-weight: bold;
          color: white;
          margin: 0;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .tagline {
          text-align: center;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.2rem;
          margin-bottom: 2rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
        }

        .buttons-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .button-icon {
          margin-right: 0.5rem;
          font-size: 1.2rem;
        }

        .login-button {
          background-color: #ff6347;
          color: white;
        }

        .login-button:hover {
          background-color: #ff4500;
        }

        .register-button {
          background-color: #ff7f50;
          color: white;
        }

        .register-button:hover {
          background-color: #ff6347;
        }

        .guest-button {
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .guest-button:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }

        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          border-radius: 20px;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #fff;
          border-top: 5px solid #ff6347;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-message {
          background-color: #ff6347;
          color: white;
          padding: 1rem;
          border-radius: 10px;
          margin-top: 1rem;
          text-align: center;
          font-weight: bold;
        }

        .button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        @media (max-width: 480px) {
          .pre-login-container {
            padding: 1rem;
          }

          .content {
            padding: 1.5rem;
          }

          .app-name {
            font-size: 2rem;
          }

          .tagline {
            font-size: 1rem;
          }

          .button {
            font-size: 0.9rem;
          }

          .logo {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  )
}