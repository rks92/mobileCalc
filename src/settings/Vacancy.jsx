import { Spacer } from '@chakra-ui/react';
import React from 'react';
import * as PropTypes from 'prop-types';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import DebouncedInlineCurrencyInput from '../shared/inputs/DebouncedInlineCurrencyInput';

function Vacancy({ value, onChange }) {
  return (
    <Row>
      <InputLabel
        tooltipLabel="The total rent portion you lose due to vacancy during a rent period (we assume 5%)"
        text="Vacancy"
      />
      <Spacer />
      <DebouncedInlineCurrencyInput value={value} onChange={onChange} />
    </Row>
  );
}

Vacancy.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(
  Vacancy,
  (prevProps, nextProps) => prevProps.value === nextProps.value,
);
