import React, { useCallback, useEffect, useState } from 'react';
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tooltip,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import useHasTouchScreen from './hooks/useHasTouchScreen';
import { off, on, trigger } from './events';

function InfoTooltipIcon({ label }) {
  const hasTouchScreen = useHasTouchScreen();
  const [isOpen, setIsOpen] = useState(false);

  const labelHash = label.replaceAll(/\s/g, '');

  const handlePopoverOpen = ({ detail: eventPopoverHash }) => {
    if (eventPopoverHash !== labelHash) {
      setIsOpen(false);
    }
  };

  const handlePopoverClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    on('popover:open', handlePopoverOpen);
    on('popover:close', handlePopoverClose);

    return () => {
      off('popover:open', handlePopoverOpen);
      off('popover:close', handlePopoverClose);
    };
  }, []);

  const open = useCallback(() => {
    setIsOpen(!isOpen);
    trigger('popover:open', labelHash);
  }, [isOpen]);

  const close = useCallback(() => setIsOpen(false), []);

  // Listen for global event close

  const tooltip = (
    <Tooltip label={label} fontSize="sm" bg="neutral.900" borderRadius="3px">
      <InfoOutlineIcon h={3} w={3} ml={3} color="neutral.500" />
    </Tooltip>
  );

  const popover = (
    <Popover closeOnBlur autoFocus={false} isOpen={isOpen} onClose={close} role="tooltip">
      <PopoverTrigger>
        <InfoOutlineIcon h={3.5} w={3.5} ml={3} color="neutral.500" onClick={() => open(label)} />
      </PopoverTrigger>
      <PopoverContent fontSize="sm" bg="neutral.900" color="white">
        <PopoverArrow bg="neutral.900" />
        <PopoverHeader border="none" />
        <PopoverCloseButton />
        <PopoverBody border="none">
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
