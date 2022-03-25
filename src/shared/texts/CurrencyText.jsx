/* eslint-disable react/jsx-props-no-spreading */
import { Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

function CurrencyText({ text, fontSize, ...restProps }) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const formattedText = formatter.format(text);

  return (
    <Text fontSize={fontSize} fontWeight="medium" color="neutral.900" {...restProps}>{formattedText}</Text>
  );
}

CurrencyText.propTypes = {
  text: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
};

CurrencyText.defaultProps = {
  fontSize: 'sm',
};

export default CurrencyText;
