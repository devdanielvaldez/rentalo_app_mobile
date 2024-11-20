import moment from 'moment';
import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import css from './BookingDetailsPanel.module.css';
const BookingDetailsPanel = props => {
  const { transactions } = props;
  const [openModal, setopenModal] = useState(false);
  const [modelData, setmodelData] = useState(null);
  const handleModel = item => {
    setmodelData(item);
    setopenModal(true);
  };
  return (
    <div className={css.bookingsDetailsContainer}>
      <h1>Detalles de la reserva</h1>
      <div className={css.dashboardSection}>
        <table>
          <thead>
            <tr>
              <th>Transacción</th>
              <th>Fecha de creación</th>
              <th>Inicia</th>
              <th>Termina</th>
              <th>Número de vehículo</th>
              <th>Cliente</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Cargo del propietario</th>
              <th>Cargo del cliente</th>
            </tr>
          </thead>
          {transactions?.map((item, index) => (
            <tbody key={index}>
              <tr onClick={() => handleModel(item)}>
                <td>{item?.id?.uuid}</td>
                <td>{moment(item?.attributes?.createdAt).format('LL')}</td>
                <td>{moment(item?.booking?.attributes?.start).format('LL')}</td>
                <td>{moment(item?.booking?.attributes?.end).format('LL')}</td>
                <td>{item?.listing?.attributes?.publicData?.licenseplate}</td>
                <td>{item?.customer?.attributes?.profile?.displayName}</td>
                <td>${item?.attributes?.payinTotal?.amount / 100}</td>
                <td>{item?.booking?.attributes?.state}</td>
                <td>${item?.attributes?.protectedData?.providerCharge / 100 || 0}</td>
                <td>${item?.attributes?.protectedData?.chargedDetails?.amount / 100 || 0}</td>
              </tr>
            </tbody>
          ))}
        </table>

        <Modal
          isOpen={openModal}
          onClose={() => {
            setopenModal(false);
          }}
          onManageDisableScrolling={() => {}}
        >
          <div>
            <h1>Transacción</h1>
            <h2>Nombre del cliente :- {modelData?.customer?.attributes?.profile?.displayName}</h2>
            <h2>Id Cliente :- {modelData?.customer?.id?.uuid}</h2>
            <h2>
              Nombre del propietario :- {modelData?.provider?.attributes?.profile?.displayName}
            </h2>
            <h2>Id Propietario :- {modelData?.provider?.id?.uuid}</h2>
            <h3>Título :- {modelData?.listing?.attributes?.title}</h3>
            <h3>Inicia :- {moment(modelData?.booking?.attributes?.start).format('LL')}</h3>
            <h3>Termina :- {moment(modelData?.booking?.attributes?.end).format('LL')}</h3>
            <h3>Monto :- ${modelData?.attributes?.payinTotal?.amount / 100}</h3>
            <h1>Fotos</h1>
            <div className={css.beforeImages}>
              {modelData &&
                modelData?.attributes?.metadata?.beforePhotos?.length &&
                modelData?.attributes?.metadata?.beforePhotos.map((e, i) => {
                  return <img key={i} src={e} alt="subir imagen" />;
                })}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default BookingDetailsPanel;
