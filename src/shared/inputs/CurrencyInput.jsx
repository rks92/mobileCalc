/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Input,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

function CurrencyInput({ value, ...rest }) {
  const [inputValue, setInputValue] = useState(value);
  const handleChange = (event) => {
    console.log(event.target.value);
    setInputValue(event.target.value);
  };
  return (
    <Input
      type="number"
      value={inputValue}
      onChange={handleChange}
      // Common styles
      border="1px solid"
      borderColor="neutral.100"
      borderRadius="4px"
      fontSize="md"
      fontWeight="normal"
      {...rest}
    />
  );
}

CurrencyInput.propTypes = {
  value: PropTypes.number,
};

CurrencyInput.defaultProps = {
  value: 0,
};

export default CurrencyInput;
