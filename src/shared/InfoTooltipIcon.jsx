import React from 'react';
import {
  Tooltip,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

function InfoTooltipIcon({ label }) {
  return (
    <Tooltip label={label} fontSize="md">
      <InfoOutlineIcon h={3} w={3} ml={3} color="neutral.500" />
    </Tooltip>
  );
}

InfoTooltipIcon.propTypes = {
  label: PropTypes.string.isRequired,
};

export default InfoTooltipIcon;
