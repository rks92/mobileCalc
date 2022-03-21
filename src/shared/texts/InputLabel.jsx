import { Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import InfoTooltipIcon from '../InfoTooltipIcon';
import Row from '../Row';

function InputLabel({ text, tooltipLabel }) {
  return (
    <Row>
      <Text fontSize="sm" fontWeight="medium" color="neutral.900">{text}</Text>
      <InfoTooltipIcon label={tooltipLabel} />
    </Row>
  );
}

InputLabel.propTypes = {
  text: PropTypes.string.isRequired,
  tooltipLabel: PropTypes.string.isRequired,
};

export default InputLabel;
