/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import CurrencyInput from './CurrencyInput';

function LargeCurrencyInput(props) {
  return (
    <CurrencyInput
      {...props}
      size="lg"
      fontSize="md"
      fontWeight="medium"
      color="neutral.900"
    />
  );
}

export default LargeCurrencyInput;
