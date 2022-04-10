import React, { useEffect } from 'react';
import { Flex, Spacer, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import Section from './shared/enums/Section';
import { formatInDollars, roundNumber } from './shared/utilities';
import { AppAction } from './appReducer';

function AnnualCashFlowButton({
  selectedSection,
  onToggle,
  annualCashFlow,
  cashFlow,
  dispatch,
}) {
  useEffect(() => {
    dispatch({
      type: AppAction.UpdateAnnualCashFlow, value: roundNumber(cashFlow * 12),
    });
  }, [cashFlow]);

  const label = (
    <Flex fontSize="md">
      <Text>Annual Cash Flow:</Text>
      <Text ml={1} fontWeight="medium">
        {formatInDollars(annualCashFlow, 0)}
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
  selectedSection: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  annualCashFlow: PropTypes.number.isRequired,
  cashFlow: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default AnnualCashFlowButton;
