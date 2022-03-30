import React from 'react';
import {
  Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger,
  Tooltip,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import useHasTouchScreen from './hooks/useHasTouchScreen';

function InfoTooltipIcon({ label }) {
  const hasTouchScreen = useHasTouchScreen();

  const tooltip = (
    <Tooltip label={label} fontSize="md">
      <InfoOutlineIcon h={3} w={3} ml={3} color="neutral.500" />
    </Tooltip>
  );

  const popover = (
    <Popover closeOnBlur autoFocus={false}>
      <PopoverTrigger>
        <InfoOutlineIcon h={3.5} w={3.5} ml={3} color="neutral.500" />
      </PopoverTrigger>
      <PopoverContent bg="primary.700" color="white">
        <PopoverArrow bg="primary.700" />
        <PopoverCloseButton />
        <PopoverBody>
          {label}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );

  return hasTouchScreen ? popover : tooltip;
}

InfoTooltipIcon.propTypes = {
  label: PropTypes.string.isRequired,
};

export default InfoTooltipIcon;
