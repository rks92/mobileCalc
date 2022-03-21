import { Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

function NestedInputLabel({ text }) {
  return (
    <Text fontSize="sm" fontWeight="medium" color="neutral.900">{text}</Text>
  );
}

NestedInputLabel.propTypes = {
  text: PropTypes.string.isRequired,
};

export default NestedInputLabel;
