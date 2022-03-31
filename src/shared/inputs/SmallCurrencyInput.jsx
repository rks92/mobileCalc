/* eslint-disable react/jsx-props-no-spreading,react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from './CurrencyInput';

function SmallCurrencyInput(props) {
  const color = props.value < 0 ? 'secondary.6' : 'neutral.600';
  return (
    <CurrencyInput
      {...props}
      h={8}
      size="sm"
      fontSize="sm"
      fontWeight="medium"
      color={color}
      maxW="100px"
      textAlign="right"
    />
  );
}

SmallCurrencyInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default SmallCurrencyInput;
