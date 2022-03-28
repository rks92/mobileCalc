/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-named-default
import { NumberInput, NumberInputField } from '@chakra-ui/react';

function CurrencyInput({ value, onChange, ...restProps }) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const format = (val) => formatter.format(val);
  const parse = (currency) => parseFloat(currency.replace(/[^0-9.-]+/g, ''));

  return (
    <NumberInput
      onChange={(valueString) => onChange(parse(valueString))}
      value={format(value)}
      max={999_999_999}
      border="1px solid"
      borderColor="neutral.100"
      borderRadius="4px"
      variant="unstyled"
      style={{
        '--number-input-stepper-width': '1px', // TODO: Find a better way to remove stepper padding
      }}
    >
      <NumberInputField
        border={0} // It is handled by the wrapper above
        outline={0} // It is handled by the wrapper above
        px={2}
        py={1}
        fontSize="md"
        fontWeight="normal"
        {...restProps}
      />
    </NumberInput>
  );
}
CurrencyInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default CurrencyInput;
