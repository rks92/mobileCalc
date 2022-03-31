/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import CurrencyInput from './CurrencyInput';

function FullCurrencyInput(props) {
  return (
    <CurrencyInput
      {...props}
      h={12}
      size="lg"
      fontSize="md"
      fontWeight="medium"
      color="neutral.900"
    />
  );
}

export default FullCurrencyInput;
