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
import MonthlyExpensesChart from './MonthlyExpensesChart';

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
  const [expenses, setExpenses] = useState([]);

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
    // Calculate Total Monthly Expenses
    const sumOfTotalMonthlyExpenses = propertyTaxes
        + propertyInsurance
        + propertyManagement
        + maintenance
        + hoaFees
        + utilities
        + otherExpenses
        + monthlyPrincipalAndInterest;

    setTotalMonthlyExpenses(sumOfTotalMonthlyExpenses);

    // Building expenses
    // NOTE: I am not using theme colors because chart cannot parse them
    setExpenses([
      {
        text: 'Loan Payments',
        value: monthlyPrincipalAndInterest,
        color: '#0A4296',
      },
      {
        text: 'Property Taxes',
        value: propertyTaxes,
        color: '#0066FF',
      },
      {
        text: 'Property Insurance',
        value: propertyInsurance,
        color: '#B3D1FF',
      },
      {
        text: 'Property Management',
        value: propertyManagement,
        color: '#569E4A',
      },
      {
        text: 'Maintenance',
        value: maintenance,
        color: '#C7DFC3',
      },
      {
        text: 'HOA Fees',
        value: hoaFees,
        color: '#F05A28',
      },
      {
        text: 'Utilities',
        value: utilities,
        color: '#F1C340',
      },
      {
        text: 'Other Expenses',
        value: otherExpenses,
        color: '#FAEBBF',
      },
    ]);
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
      <MonthlyExpensesChart expenses={expenses} totalMonthlyExpenses={totalMonthlyExpenses} />
      <SimpleGrid rows={8} spacing="10px" mt={5}>
        {
          expenses.map((expense) => (
            <Row key={expense.text.replaceAll(' ', '_')}>
              <Color color={expense.color} />
              <Label text={expense.text} />
              <Spacer />
              <Value value={expense.value} />
            </Row>
          ))
        }
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
