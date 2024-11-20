import React, { useEffect } from 'react';
import sura from './logo_sura.png';
import rentalo from './logo.png'
const formatDate = (userDate) => {
    const date = new Date(userDate);
  
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
  
    return `${monthNames[monthIndex]} ${day}, ${year} ${hours}:${strMinutes} ${ampm}`;
  }

export default function RentalPopup({ isOpen, onClose, insuranceData }) {
    if (!isOpen) return null;

    const {
        end_date,
        fullname,
        mobile_phone,
        reference,
        start_date,
        vehicle_brand,
        vehicle_chassis,
        vehicle_color,
        vehicle_model,
        vehicle_plate,
        vehicle_year,
      } = insuranceData ?? {};

    useEffect(() => {
        console.log(insuranceData);
    })

    return (
        <div className="app">
            <div className="popup-overlay">
                <div className="popup-content">
                <button className="close-button" onClick={onClose}>
                        ×
                    </button>
                    <div className="logo-container">
                        <img src={sura} className='sura-logo' alt="Logo Sura" />
                    </div>

                    <div className="info-container">
                        <div className="info-column">
                            <p><strong>Fecha de inicio:</strong> {formatDate(start_date)}</p>
                            <p><strong>Marca:</strong>{vehicle_brand}</p>
                            <p><strong>Nombre conductor:</strong>{fullname}</p>
                            <p><strong>Modelo:</strong>{vehicle_model}</p>
                            <p><strong>Año:</strong>{vehicle_year}</p>
                        </div>
                        <div className="info-column">
                            <p><strong>Fecha de finalización:</strong>{formatDate(end_date)}</p>
                            <p><strong>Color:</strong>{vehicle_color}</p>
                            <p><strong>Placa:</strong>{vehicle_plate}</p>
                            <p><strong>Chasis:</strong>{vehicle_chassis}</p>
                            <p><strong>Referencia:</strong>{reference}</p>
                        </div>
                    </div>

                    <div className="rentalo-logo-container">
                        <img src={rentalo} className='rentalo-logo' alt="Logo Rentalo" />
                    </div>

                    <svg className="wavy-pattern" preserveAspectRatio="none" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill="rgba(255, 228, 196, 0.3)"
                            fillOpacity="1"
                            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,224C960,245,1056,235,1152,213.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </div>
            </div>

            <style jsx>{`
                .app {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background-color: #f0f0f0;
                }

                .popup-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }

                .popup-content {
                    position: relative;
                    width: 100%;
                    max-width: 650px;
                    height: 450px;
                    background-color: white;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                }

                .close-button {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #333;
                    z-index: 10;
                }

                .logo-container {
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                    margin-bottom: 20px;
                    z-index: 5;
                }

                .sura-logo {
                    width: 20%;
                    object-fit: contain;
                }

                .info-container {
                    display: flex;
                    justify-content: space-between;
                    z-index: 5;
                    flex-grow: 1;
                    overflow-y: auto;
                }

                .info-column {
                    width: 48%;
                }

                .info-column p {
                    margin: 7px 0;
                    font-size: 14px;
                }

                .rentalo-logo-container {
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                    margin-top: 20px;
                    z-index: 5;
                }

                .rentalo-logo {
                    width: 20%;
                    object-fit: contain;
                }

                .wavy-pattern {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 80%;
                    z-index: 1;
                }
            `}</style>
        </div>
    );
}