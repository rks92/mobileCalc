import React from 'react';
import { Flex, Spacer, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import Section from './shared/enums/Section';

function AnnualCashFlowButton({ value, selectedSection, onToggle }) {
  const label = (
    <Flex fontSize="md">
      <Text>Annual Cash Flow:</Text>
      <Text ml="5px" fontWeight="medium">
        $
        {value}
      </Text>
    </Flex>
  );

  const icon = selectedSection === Section.Settings
    ? <ChevronDownIcon w={8} h={7} />
    : <ChevronUpIcon w={8} h={7} />;

  return (
    <Flex
      as="button"
      h="72px"
      p="23px 24px"
      width="100%"
      bg="primary.600"
      color="white"
      onClick={onToggle}
      _hover={{}}
      _active={{}}
      _focus={{
        boxShadow: 'none',
      }}
    >
      {label}
      <Spacer />
      {icon}
    </Flex>
  );
}

AnnualCashFlowButton.propTypes = {
  value: PropTypes.number,
  selectedSection: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
};

AnnualCashFlowButton.defaultProps = {
  value: 0,
};

export default AnnualCashFlowButton;
