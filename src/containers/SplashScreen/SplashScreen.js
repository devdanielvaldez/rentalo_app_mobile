import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const router = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/onboarding');
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-screen w-full">
      {showSplash ? (
        <div className="splash-screen">
          <div className="logo">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAABHNCSVQICAgIfAhkiAAABPxJREFUeF7tm1koblEUx9dnJkIyhZIpPInygLwg8/hgKCGehJQoGQoZopThBU/K8CIZShEpiUSRobwovBCZyxjuvWvXJ9d1z97HOd/nnHv3v76+l3XOt9fPWnvvtfam+fFLwPVGQMOB/B4NHMiH7OBAOBDhCZNHCI8QHiGiNhU8ZXjK6Dhl9vf34fHxUVRYvjc2NDQEc3Pz3z4ajebL75P6oOSUCQ8Ph62trS+PA4GYmJiQj6mpKfj4+EBeXh7Ex8cTSPqWZCCBgYGwsbEh+7htbGwgIiIC8vPzyTfC0ocUC+S98wEBATA9PQ2Ojo46Z6IKIEjByMgIysvLobGxETDNdCXVANECiIyMhMHBQZ1Fi+qA4Ark7+8Ps7Oz4OzsLHugqA6IlkBUVBRMTEzIvhKpFghGSkJCAoyPj4OBgYFskaIXIN7e3pCUlPTHoJ+fn+Hm5gbOz8/JXubw8BDEdjSHh4chKytLXUDS0tJgdHRUcNCvr6+wuroKZWVlsLa2BgiLRUFBQbCyskJWITmklwhhAaJ15v7+HhYXF8lu9fj4mOojpk5zczNUVlZSbVkMFAdEO+jl5WVITk6Gs7Mzqh9ubm6wvb0N1tbWVFuagWKB4MBnZmbI3PP09CToh4WFBSwtLQHuaKVK0UCwio6Li4P5+Xmqnx0dHVBaWkq1oxkoGggOHucTrKhpCgkJIVEiVYoHgsuwh4cHHBwcCPqKu9ajoyOpPEDxQNDD7OxsGBoaEnQWV5uHhwfSV5EiVQCpqamBpqYmqp/YvXN3d6faCRmoAkh7ezsp/Wna3d0FX19fmplwpEk97GbpmInZmH022paWFqiqqqI6ihs5Jycnqp3qIwSjA6OEpru7O8nVrypSJjU1lVS1QvpvVpmXlxdwcHCAi4sLQSBS01L7csVHyMjICKSnp9OyhaQUVspSpWggOCeEhYVRjznMzMxgYWEBgoODpfJQ9sasr68PSkpKqMUdVrubm5tga2v77wKZm5sD7JuyqLi4GLq7u1lMqTaKSxlsEHV1dUFraytcXl5SHXBxcSG9EDmiA3/s24Fg8XZ7ewunp6ews7MD1dXV5JtVDQ0NUFtby2pOtdMLEFdXVzI5ftTV1RWcnJwATp7YaMalFXurrMK6ZX19Xbbo0FuEsDooxg636Ngr8fLyEvMY1VYvEUIdxRcM8PA7Ojr6C08KP6I6IHZ2dtDf308OqXQhVQHBM93JyUnw9PTUBQvyTlUAweMFXH1yc3NJXaNLKR4ItgSx6x4aGqpLDm/vVjwQHGlMTAxMTU3Jeqj9N7p6AYIN4I+3frCsF3OwnZGRAb29vbKczgmFml6AfNarwN0opgGe/rOqqKgIOjs71X+l6m/NGzyqxOuXGC0swigrLCwkvQ+pxw3fmjJC3SzcYGVmZsL19TULE3Ltoa2tjbQF5LoC8f6Hvy1l3g9iYGAAcnJymICgkbGxMbmNWFFRAXLfelYEEHSyp6eHtACx/GeRpaUlmWTx9pCcUBQDBCHU19dDXV0dC483m7GxMUhJSRH1jCJXmc8GhcswQsEPq3DnirVNbGws6yOCdpIjhOXyf2JiIuA8wSJccQoKCsiVS9Z9Cm7tcXL28/Nj+QndAmH59xArKyvAVh+rEMre3h4zEHyvvb09YCUsVZIjROoAlPY8B/LhL8KBcCDCScojhEcIjxBRCxlPGZ4yPGVEpcxPak5VYpPijwMAAAAASUVORK5CYII="></img>
          </div>
        </div>
      ) : (
        <div className="main-content">
          <h1 className="text-4xl font-bold text-center mt-20">Se ha producido un error, por favor intente mas tarde.</h1>
        </div>
      )}

      <style jsx>{`
        .splash-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          animation: fadeOut 0.5s ease-in-out 4.5s forwards;
        }

        .logo {
          animation: pulse 2.5s ease-in-out infinite;
        }

        .main-content {
          opacity: 0;
          animation: fadeIn 0.5s ease-in-out 5s forwards;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}