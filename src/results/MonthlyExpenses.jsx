import {
  Box,
  Divider,
  Flex,
  SimpleGrid,
  Spacer,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Row from '../shared/Row';
import { formatInDollars } from '../shared/utilities';
import CurrencyText from '../shared/texts/CurrencyText';
import MonthlyExpensesChart from './MonthlyExpensesChart';

const Color = React.memo(
  ({ color }) => <Box bg={color} h="12px" w="12px" borderRadius="50%" />,
  (prevProps, nextProps) => prevProps.color === nextProps.color,
);

Color.propTypes = { color: PropTypes.string.isRequired };

const Label = React.memo(
  ({ text }) => <Text fontSize="sm" fontWeight="medium" color="neutral.900" ml={2}>{text}</Text>,
  (prevProps, nextProps) => prevProps.text === nextProps.text,
);

Label.propTypes = { text: PropTypes.string.isRequired };

const Value = React.memo(
  ({ value }) => <Text fontSize="sm" fontWeight="medium" color="neutral.600">{formatInDollars(value)}</Text>,
  (prevProps, nextProps) => prevProps.value === nextProps.value,
);

Value.propTypes = { value: PropTypes.number.isRequired };

function MonthlyExpenses({
  propertyTaxes,
  propertyInsurance,
  propertyManagement,
  maintenance,
  hoaFees,
  utilities,
  otherExpenses,
  monthlyPrincipalAndInterest,
}) {
  const [totalMonthlyExpenses, setTotalMonthlyExpenses] = useState(0);
  const [expenses, setExpenses] = useState([]);

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
        <CurrencyText ml={1} fontSize="lg" value={totalMonthlyExpenses} />
      </Flex>
    </>
  );
}

MonthlyExpenses.propTypes = {
  propertyTaxes: PropTypes.number.isRequired,
  propertyInsurance: PropTypes.number.isRequired,
  propertyManagement: PropTypes.number.isRequired,
  maintenance: PropTypes.number.isRequired,
  hoaFees: PropTypes.number.isRequired,
  utilities: PropTypes.number.isRequired,
  otherExpenses: PropTypes.number.isRequired,
  monthlyPrincipalAndInterest: PropTypes.number.isRequired,
};

export default React.memo(
  MonthlyExpenses,
  (prevProps, nextProps) => (
    prevProps.propertyTaxes === nextProps.propertyTaxes
    && prevProps.propertyInsurance === nextProps.propertyInsurance
    && prevProps.propertyManagement === nextProps.propertyManagement
    && prevProps.maintenance === nextProps.maintenance
    && prevProps.hoaFees === nextProps.hoaFees
    && prevProps.utilities === nextProps.utilities
    && prevProps.otherExpenses === nextProps.otherExpenses
    && prevProps.monthlyPrincipalAndInterest === nextProps.monthlyPrincipalAndInterest
  ),
);
