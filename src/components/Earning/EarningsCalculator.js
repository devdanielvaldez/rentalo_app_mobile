import React, { useState } from 'react';
import Select from 'react-select';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import css from './EarningsCalculator.module.css';

const options = [
  { value: 'Christian Dior', label: 'Christian Dior' },
  { value: 'Christian Lacroix', label: 'Christian Lacroix' },
  { value: 'Dolce & Gabbana', label: 'Dolce & Gabbana' },
  { value: 'Gabrielle Coco Chanel', label: 'Gabrielle Coco Chanel' },
  { value: 'Gianni Versace', label: 'Gianni Versace' },
  { value: 'Giorgio Armani', label: 'Giorgio Armani' },
  { value: 'Guccio Gucci', label: 'Guccio Gucci' },
  { value: 'Other', label: 'Other' },
];

const conditionOptions = [
  {
    value: 0,
    label: 'Very used',
  },
  {
    value: 25,
    label: 'Used',
  },
  {
    value: 50,
    label: 'Moderately used',
  },
  {
    value: 75,
    label: 'Barely used',
  },
  {
    value: 100,
    label: 'New',
  },
];

function EarningsCalculator() {
  const [designer, setDesigner] = useState({
    value: 'Christian Lacroix',
    label: 'Christian Lacroix',
  });
  const [condition, setCondition] = useState(50);

  const handleChangeDesigner = selectedOption => {
    setDesigner(selectedOption);
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  const designerValue = options.findIndex(options => options.value === designer.value) * 30;
  const min = 30 * (10 + condition / 10) + designerValue;
  // const max = min + 500 + ( 10 + condition / 10) + designerValue;

  return (
    <div className={css.sectionWrapper}>
      <div className={css.field}>
        <span className={css.label}>Designer</span>

        <Select
          className={css.select}
          value={designer}
          onChange={handleChangeDesigner}
          options={options}
        />
      </div>

      <div className={css.field}>
        <span className={css.label}>Condition</span>

        <Box sx={{ width: 500 }}>
          <Slider
            className={css.slider}
            aria-label="Condition values"
            defaultValue={50}
            getAriaValueText={valuetext}
            step={null}
            valueLabelDisplay="auto"
            marks={conditionOptions}
            value={condition}
            onChange={(event, newValue) => {
              setCondition(newValue);
            }}
          />
        </Box>
      </div>

      <div className={css.field}>
        <span className={css.label}>Ingresos mensuales</span>

        <span className={css.aproxAmountLabel}>${min}</span>
      </div>
    </div>
  );
}

export default EarningsCalculator;
