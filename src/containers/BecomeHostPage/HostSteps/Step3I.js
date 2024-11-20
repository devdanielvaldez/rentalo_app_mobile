import React from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Button, FieldSelect, NamedRedirect } from '../../../components';
import routeConfiguration from '../../../routeConfiguration';
import { createResourceLocatorString } from '../../../util/routes';
import css from '../../HostDetailsPage/HostDetailsPage.module.css';
import { SearchPageComponent } from '../../SearchPage/SearchPage';
import {bankNames} from '../../../marketplace-custom-config'

function Step3I(props) {
  const { accountNumber, setAccount, bank, setBank, onUpdateProfile, setStep, isCompany,isHostDetail,history = false } = props;

  return (
    <div>
      <div>
        <p className={css.label}>Nombre del banco</p>

        <select
          className="select"
          id="bank"
          name="bank"
          // onBlur={[Function]}
          // onChange={[Function]}
          // onFocus={[Function]}
          onChange={e => {
            setBank(e.target.value);
          }}
          value={bank}
        >
              <option value="">Por favor, selecciona la categoría</option>

              {bankNames.map((item, index) => (
                <option key={item.key} value={item.label}>{item.label}</option>
              ))}
            </select>

        {/* <input
          id="bank"
          value={bank}
          onChange={e => {
            setBank(e.target.value);
          }}
          className={css.input1}
        /> */}
      </div>
      <div>
        <p className={css.label}>Account number</p>
        <input
          id="accountNumber"
          value={accountNumber}
          onChange={e => {
            setAccount(e.target.value);
          }}
          className={css.input1}
        />
      </div>
      <Button
        className={css.submitButton}
        type="button"
        onClick={() => {
          onUpdateProfile({
            protectedData: {
              hostProfile: {
                bank,
                accountNumber,
                isHost: true,
              },
            },
          }).then(() => {
            if (isHostDetail){
              history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, {}));
            }
          else{
            setStep(isCompany ? 4 : 3);
          }
          })
          .catch(error => console.log(error))
        }}
        disabled={!bank || !accountNumber}
      >
        Finish
      </Button>
    </div>
  );
}

export default Step3I;


