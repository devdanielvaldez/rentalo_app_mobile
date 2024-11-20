import React, { useEffect } from 'react';


const MobileProfileScreen = ({ loadData }) => {

    const options = [
        { label: 'Perfil', route: '/driver/profile', color: '#4A90E2' },
        { label: 'Detalles de Contacto', route: '/contact-details', color: '#50E3C2' },
        { label: 'Cambiar Contraseña', route: '/account/change-password', color: '#F5A623' },
        { label: 'Verificación', route: '/account/verification', color: '#7ED321' },
        { label: 'Métodos de Pago', route: '/account/payment-methods', color: '#BD10E0' },
        { label: 'Detalles de Pago', route: '/payoutDetailsPage', color: '#9013FE' },
        { label: 'Borrar Cuenta', route: '/delete-profile', color: '#D0021B' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await loadData();
                setProfileData(data);
            } catch (err) {
                console.error('Error loading data:', err);
                setError('Failed to load profile data.');
            } finally {
                setIsLoading(false);
            }
        };

        if (loadData) {
            fetchData();
        }
    }, [loadData]);


    const handleOptionClick = (route) => {
        console.log(`Navigating to: ${route}`);
    };

    return (
        <div className="mobile-profile-screen">
            <header className="profile-header">
                <div className="avatar-container">
                    <img src="https://i.pravatar.cc/150?img=68" alt="User Avatar" className="avatar" />
                    <button className="edit-avatar-button">
                        {/* <Settings size={16} /> */}
                    </button>
                </div>
                <h1 className="user-name">John Doe</h1>
                <p className="user-email">john.doe@example.com</p>
            </header>
            <nav className="options-list">
                {options.map((option, index) => (
                    <button
                        key={index}
                        className="option-item"
                        onClick={() => handleOptionClick(option.route)}
                        style={{ '--accent-color': option.color }}
                    >
                        <div className="icon-wrapper">
                            {/* <option.icon size={20} /> */}
                        </div>
                        <span className="option-label">{option.label}</span>
                        {/* <ChevronRight size={20} className="chevron-icon" /> */}
                    </button>
                ))}
            </nav>

            <style jsx>{`
        .mobile-profile-screen {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #f0f2f5;
          min-height: 100vh;
          padding: 16px;
          box-sizing: border-box;
        }

        .profile-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .avatar-container {
          position: relative;
          width: 100px;
          height: 100px;
          margin: 0 auto 16px;
        }

        .avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .edit-avatar-button {
          position: absolute;
          bottom: 0;
          right: 0;
          background-color: #4A90E2;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
        }

        .user-name {
          font-size: 24px;
          font-weight: 600;
          color: #1c1e21;
          margin: 0 0 4px;
        }

        .user-email {
          font-size: 14px;
          color: #65676b;
          margin: 0;
        }

        .options-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .option-item {
          display: flex;
          align-items: center;
          padding: 16px;
          background-color: white;
          border: none;
          border-radius: 8px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s ease;
          cursor: pointer;
        }

        .option-item:active {
          background-color: #f0f2f5;
        }

        .icon-wrapper {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: var(--accent-color);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          color: white;
        }

        .option-label {
          flex-grow: 1;
          text-align: left;
          font-size: 16px;
          font-weight: 500;
          color: #1c1e21;
        }

        .chevron-icon {
          color: #65676b;
        }
      `}</style>
        </div>
    );
};

export default MobileProfileScreen;