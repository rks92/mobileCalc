/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-named-default
import { default as ReactCurrencyInput } from 'react-currency-input-field';
import { Input } from '@chakra-ui/react';

function CurrencyInput({ value, onChange, ...restProps }) {
  const handleChange = (newValue) => {
    const formattedValue = Number(newValue);
    const checkedValue = Number.isNaN(formattedValue) ? 0 : formattedValue;
    onChange(checkedValue);
  };

  return (
    <Input
      as={ReactCurrencyInput}
      intlConfig={{ locale: 'en-US', currency: 'USD' }}
      placeholder="$0"
      decimalsLimit={2}
      onValueChange={handleChange}
      border="1px solid"
      borderColor="neutral.100"
      borderRadius="4px"
      fontSize="md"
      fontWeight="normal"
      value={value}
      {...restProps}
    />
  );
}

CurrencyInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default CurrencyInput;
