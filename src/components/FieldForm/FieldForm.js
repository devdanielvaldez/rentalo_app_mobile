import React, { useState } from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldSelect } from '../../components';
import css from './FieldForm.module.css';
import Box from '@mui/material/Box';

const FieldForm = () => {
  const onSubmit = values => {
  };

  const onChange = formValues => {
    if (formValues.values.brand) {
      setBrandPrice(Number(formValues.values.brand));
    }
    if (formValues.values.model) {
      setModelPrice(Number(formValues.values.model));
    }
  };

  // const [selected, setSelected] = useState({});
  const [brandPrice, setBrandPrice] = useState(0);
  const [modelPrice, setModelPrice] = useState(0);
  const [showPrice, setShowPrice] = useState(false);

  const handleChange = () => {
    setShowPrice(true);
  };

  // const changeSelectOptionHandler = event => {
  //   setSelected(event.target.value);
  // };

  const CATEGORIES = [
    { label: 'Compact SUV', value: 540 },
    { label: 'Economic Car', value: 480 },
    { label: 'Full Size SUV', value: 1080 },
    { label: 'Mid Size SUV', value: 720 },
    { label: 'Sedan', value: 540 },
    { label: 'Pick Up 1500', value: 900 },
    { label: 'Luxury SUV', value: 2124 },
    { label: 'Luxury Sport Vehicle', value: 1440 },

  ];

  return (
    <div>
      <FinalForm
        onSubmit={onSubmit}
        mutators={{ ...arrayMutators }}
        render={fieldRenderProps => {
          const {
            handleSubmit,
            // invalid,
            // pristine,
            // submitting,
            // formName,
            // emailSend,
            // values,
          } = fieldRenderProps;

          // const required = validators.required('This field is required');
          // const submitDisabled = invalid || pristine || submitting;

          let type = null;

          let options = null;

          type = CATEGORIES;

          if (type) {
            options = type.map(el => <option value={el.value}>{el.label}</option>);
          }

          return (
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <FormSpy onChange={onChange} />
              <div className={css.section}>
                <Box
                  sx={{
                    background: '#FFFFFF 0% 0% no-repeat padding-box',
                    boxShadow: '0px 0px 30px #00000012',
                    borderRadius: '20px',
                  }}
                  className={css.fieldFormBox}
                >
                  <div className={css.box}>
                    <FieldSelect name="brand" className={css.fieldSelect}>
                      <option value="" hidden disabled>
                        Marca
                      </option>
                      <option value={1}>Audi</option>
                      <option value={2}>Bmw</option>
                      <option value={3}>Chevrolet</option>
                      <option value={4}>Daihatsu</option>
                      <option value={5}>Fiat</option>
                      <option value={6}>Ford</option>
                      <option value={7}>Honda</option>
                      <option value={8}>Hyundai</option>
                      <option value={9}>Isuzu</option>
                      <option value={10}>Jeep</option>
                      <option value={11}>Kia</option>
                      <option value={12}>Land-rover</option>
                      <option value={13}>Lexus</option>
                      <option value={14}>Mazda</option>
                      <option value={15}>Mercedes-benz</option>
                      <option value={16}>Mitsubishi</option>
                      <option value={17}>Nissan</option>
                      <option value={18}>Peugeot</option>
                      <option value={19}>Renault</option>
                      <option value={20}>Skoda</option>
                      <option value={21}>Subaru</option>
                      <option value={22}>Suzuki</option>
                      <option value={23}>Toyota</option>
                      <option value={24}>Volkswagen</option>
                      <option value={25}>Volvo</option>
                    </FieldSelect>

                    <FieldSelect name="model" className={css.fieldSelect}>
                      <option key={'modelo'} hidden>
                       Categoría
                      </option>{' '}
                      {options}
                    </FieldSelect>

                    <button className={css.button} onClick={handleChange}>
                      Estimar ganancias
                    </button>
                  </div>

                  <div className={css.hr}></div>
                  <div className={css.box1}>
                    <div className={css.priceWrapper}>

                    {showPrice ? (
                      <p className={css.price}>
                        $ {brandPrice && modelPrice ? brandPrice + modelPrice : 0}.00
                      </p>
                    ) : (
                      <p className={css.price}>$0.00</p>
                    )}
                    <p className={css.per}>USD por mes</p>
                    </div>
                    <p className={css.estimate}>
                    Estima las ganancias a generar según la marca y categoría de tu vehículo.
                    Estas estimaciones pueden variar según modelo y año de tu vehículo.
                    </p>
                  </div>
                </Box>
              </div>
            </form>
          );
        }}
      />
    </div>
  );
};

export default FieldForm;
