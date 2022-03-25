/* eslint-disable react/jsx-props-no-spreading */
import { Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import InfoTooltipIcon from '../InfoTooltipIcon';
import Row from '../Row';

function InputLabel({ text, tooltipLabel, textStyleOverrides }) {
  return (
    <Row>
      <Text fontSize="sm" fontWeight="medium" color="neutral.900" {...textStyleOverrides}>{text}</Text>
      <InfoTooltipIcon label={tooltipLabel} />
    </Row>
  );
}

InputLabel.propTypes = {
  text: PropTypes.string.isRequired,
  tooltipLabel: PropTypes.string.isRequired,
  textStyleOverrides: PropTypes.oneOfType([PropTypes.object]),
};

InputLabel.defaultProps = {
  textStyleOverrides: {},
};

export default InputLabel;
