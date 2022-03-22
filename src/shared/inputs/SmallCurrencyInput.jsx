/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import CurrencyInput from './CurrencyInput';

function SmallCurrencyInput(props) {
  return (
    <CurrencyInput
      {...props}
      size="sm"
      fontSize="sm"
      fontWeight="medium"
      color="neutral.600"
      maxW="98px"
    />
  );
}

export default SmallCurrencyInput;
