import React from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from './CurrencyInput';

function LargeCurrencyInput({ value }) {
  return (
    <CurrencyInput
      value={value}
      size="lg"
      fontSize="md"
      color="neutral.900"
      fontWeight="medium"
    />
  );
}

LargeCurrencyInput.propTypes = {
  value: PropTypes.number,
};

LargeCurrencyInput.defaultProps = {
  value: 0,
};

export default LargeCurrencyInput;
