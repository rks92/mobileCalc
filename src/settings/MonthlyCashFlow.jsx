import React from 'react';
import {
  Divider,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react';
import InputLabel from '../shared/texts/InputLabel';
import SmallCurrencyInput from '../shared/inputs/SmallCurrencyInput';
import Row from '../shared/Row';
import NestedInputLabel from '../shared/texts/NestedInputLabel';
import CurrencyText from '../shared/texts/CurrencyText';
import { useCalculationDispatch, useCalculationState } from '../context/CalculationContext';

function MonthlyCashFlow() {
  const dispatch = useCalculationDispatch();
  const state = useCalculationState();

  const {
    operatingIncome, operatingExpenses, cashFlow, loanPayments, netOperatingIncome,
  } = state;

  const divider = <Divider color="primary.100" my="8px" />;
  return (
    <SimpleGrid rows={15} spacing="4px">
      <Row>
        <InputLabel tooltipLabel="Gross Rent" text="Gross Rent" />
        <Spacer />
        <SmallCurrencyInput value={0} onChange={() => {}} />
      </Row>
      <Row>
        <InputLabel tooltipLabel="Vacancy" text="Vacancy" />
        <Spacer />
        <SmallCurrencyInput value={0} onChange={() => {}} />
      </Row>
      {divider}
      <Row>
        <InputLabel tooltipLabel="Operating Income" text="Operating Income" />
        <Spacer />
        <CurrencyText text={operatingIncome.toString()} />
      </Row>
      <Row mt="12px">
        <InputLabel tooltipLabel="Operating Expenses" text="Operating Expenses" />
        <Spacer />
        <CurrencyText text={operatingExpenses.toString()} />
      </Row>
      <Row mt="8px">
        <NestedInputLabel text="Property Taxes" />
        <Spacer />
        <SmallCurrencyInput value={0} onChange={() => {}} />
      </Row>
      <Row>
        <NestedInputLabel text="Property Insurance" />
        <Spacer />
        <SmallCurrencyInput value={0} onChange={() => {}} />
      </Row>
      <Row>
        <NestedInputLabel text="Property Management" />
        <Spacer />
        <SmallCurrencyInput value={0} onChange={() => {}} />
      </Row>
      <Row>
        <NestedInputLabel text="Maintenance" />
        <Spacer />
        <SmallCurrencyInput value={0} onChange={() => {}} />
      </Row>
      <Row>
        <NestedInputLabel text="HOA Fees" />
        <Spacer />
        <SmallCurrencyInput value={0} onChange={() => {}} />
      </Row>
      <Row>
        <NestedInputLabel text="Utilities" />
        <Spacer />
        <SmallCurrencyInput value={0} onChange={() => {}} />
      </Row>
      <Row>
        <NestedInputLabel text="Other Expenses" />
        <Spacer />
        <SmallCurrencyInput value={0} onChange={() => {}} />
      </Row>
      {divider}
      <Row>
        <InputLabel tooltipLabel="Net Operating Income" text="Net Operating Income" />
        <Spacer />
        <CurrencyText text={netOperatingIncome.toString()} />
      </Row>
      <Row mt="12px">
        <InputLabel tooltipLabel="Loan Payments" text="Loan Payments" />
        <Spacer />
        <CurrencyText text={loanPayments.toString()} />
      </Row>
      {divider}
      <Row>
        <InputLabel tooltipLabel="Cash Flow" text="Cash Flow" />
        <Spacer />
        <CurrencyText fontSize="lg" text={cashFlow.toString()} />
      </Row>
    </SimpleGrid>
  );
}

export default MonthlyCashFlow;
