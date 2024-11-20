import moment from 'moment';
import React from 'react';
import NamedLink from '../NamedLink/NamedLink';
import css from './DashBoard.module.css';

const DashBoard = props => {
  const { transactions } = props;

  return (
    <div>
      <h1>DashBoard</h1>
      <NamedLink name="PanelPage">
        <h2 style={{ color: 'green' }}>Ganancias</h2>
      </NamedLink>
      <div className={css.dashboardSection}>
        <table>
          <tr>
            <th>Transacción</th>
            <th>Fecha</th>
            <th>Número de vehículo</th>
            <th>Cliente</th>
            <th>Tipo</th>
            <th>Monto</th>
          </tr>
          {transactions?.map((item, index) => (
            <tbody key={index}>
              <tr>
                <td>{item?.id?.uuid}</td>
                <td>
                  {moment(item?.booking?.attributes?.start).format('LL')}-
                  {moment(item?.booking?.attributes?.end).format('LL')}
                </td>
                <td>{item?.listing?.attributes?.publicData?.licenseplate}</td>
                <td>{item?.customer?.attributes?.profile?.displayName}</td>
                <td>type</td>
                <td>${item?.attributes?.payinTotal?.amount / 100}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default DashBoard;
