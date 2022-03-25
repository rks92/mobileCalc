import {
  Box, Divider, Flex,
  SimpleGrid,
  Spacer,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Row from '../shared/Row';
import { formatInCurrency } from '../shared/utilities';
import { useAppState } from '../context/AppContext';
import CurrencyText from '../shared/texts/CurrencyText';

function Color({ color }) {
  return <Box bg={color} h="12px" w="12px" borderRadius="50%" />;
}

Color.propTypes = { color: PropTypes.string.isRequired };

function Label({ text }) {
  return <Text fontSize="sm" fontWeight="medium" color="neutral.900" ml={2}>{text}</Text>;
}

Label.propTypes = { text: PropTypes.string.isRequired };

function Value({ value }) {
  return <Text fontSize="sm" fontWeight="medium" color="neutral.600">{formatInCurrency(value)}</Text>;
}

Value.propTypes = { value: PropTypes.number.isRequired };

function MonthlyExpenses() {
  const state = useAppState();
  const [totalMonthlyExpenses, setTotalMonthlyExpenses] = useState(0);

  const {
    propertyTaxes,
    propertyInsurance,
    propertyManagement,
    maintenance,
    hoaFees,
    utilities,
    otherExpenses,
    monthlyPrincipalAndInterest,
  } = state;

  useEffect(() => {
    const sumOfTotalMonthlyExpenses = propertyTaxes
        + propertyInsurance
        + propertyManagement
        + maintenance
        + hoaFees
        + utilities
        + otherExpenses
        + monthlyPrincipalAndInterest;

    setTotalMonthlyExpenses(sumOfTotalMonthlyExpenses);
  }, [
    propertyTaxes,
    propertyInsurance,
    propertyManagement,
    maintenance,
    hoaFees,
    utilities,
    otherExpenses,
    monthlyPrincipalAndInterest,
  ]);

  return (
    <>
      <Box h="140px" bg="tomato" />
      <SimpleGrid rows={8} spacing="10px" mt={5}>
        <Row>
          <Color color="primary.700" />
          <Label text="Loan Payments" />
          <Spacer />
          <Value value={monthlyPrincipalAndInterest} />
        </Row>
        <Row>
          <Color color="primary.500" />
          <Label text="Property Taxes" />
          <Spacer />
          <Value value={propertyTaxes} />
        </Row>
        <Row>
          <Color color="primary.200" />
          <Label text="Property Insurance" />
          <Spacer />
          <Value value={propertyInsurance} />
        </Row>
        <Row>
          <Color color="green.400" />
          <Label text="Property Management" />
          <Spacer />
          <Value value={propertyManagement} />
        </Row>
        <Row>
          <Color color="green.200" />
          <Label text="Maintenance" />
          <Spacer />
          <Value value={maintenance} />
        </Row>
        <Row>
          <Color color="secondary.5" />
          <Label text="HOA Fees" />
          <Spacer />
          <Value value={hoaFees} />
        </Row>
        <Row>
          <Color color="yellow.400" />
          <Label text="Utilities" />
          <Spacer />
          <Value value={utilities} />
        </Row>
        <Row>
          <Color color="yellow.200" />
          <Label text="Other Expences" />
          <Spacer />
          <Value value={otherExpenses} />
        </Row>
      </SimpleGrid>
      <Divider color="primary.100" my="4px" />
      <Flex flexDirection="row" flexWrap="nowrap" alignContent="center" justifyContent="flex-end" alignItems="center">
        <Text fontSize="xs" fontWeight="medium" color="neutral.900">{'Total Monthly Expenses  = '}</Text>
        <CurrencyText ml={1} fontSize="lg" text={totalMonthlyExpenses.toString()} />
      </Flex>
    </>
  );
}

export default MonthlyExpenses;
