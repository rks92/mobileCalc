import React from 'react';
import {
  Tooltip,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

function InfoTooltipIcon({ label }) {
  return (
    <Tooltip label={label} fontSize="md">
      <InfoOutlineIcon h="14px" w="14px" ml="10px" color="neutral.500" />
    </Tooltip>
  );
}

InfoTooltipIcon.propTypes = {
  label: PropTypes.string.isRequired,
};

export default InfoTooltipIcon;
