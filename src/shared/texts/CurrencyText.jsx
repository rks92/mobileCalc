/* eslint-disable react/jsx-props-no-spreading */
import { Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

function CurrencyText({
  value, fontSize, maximumFractionDigits, ...restProps
}) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits,
  });

  const color = value >= 0 ? 'neutral.900' : 'secondary.6';

  const formattedText = formatter.format(value);

  return (
    <Text fontSize={fontSize} fontWeight="medium" color={color} {...restProps}>{formattedText}</Text>
  );
}

CurrencyText.propTypes = {
  value: PropTypes.number.isRequired,
  fontSize: PropTypes.string,
  maximumFractionDigits: PropTypes.number,
};

CurrencyText.defaultProps = {
  fontSize: 'sm',
  maximumFractionDigits: 2,
};

export default CurrencyText;
