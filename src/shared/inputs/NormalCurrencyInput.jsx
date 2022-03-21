import React from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from './CurrencyInput';

function NormalCurrencyInput({ value }) {
  return (
    <CurrencyInput
      value={value}
      w="100px"
      size="md"
      fontSize="sm"
      color="neutral.600"
      fontWeight="medium"
    />
  );
}

NormalCurrencyInput.propTypes = {
  value: PropTypes.number,
};

NormalCurrencyInput.defaultProps = {
  value: 0,
};

export default NormalCurrencyInput;
