import React from 'react';
import {
  Divider,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react';
import InputLabel from '../shared/texts/InputLabel';
import NormalCurrencyInput from '../shared/inputs/NormalCurrencyInput';
import Row from '../shared/Row';
import NestedInputLabel from '../shared/texts/NestedInputLabel';

function MonthlyCashFlow() {
  const divider = <Divider color="primary.100" my="4px" />;
  return (
    <SimpleGrid rows={15} spacing="4px">
      <Row>
        <InputLabel tooltipLabel="Gross Rent" text="Gross Rent" />
        <Spacer />
        <NormalCurrencyInput />
      </Row>
      <Row>
        <InputLabel tooltipLabel="Vacancy" text="Vacancy" />
        <Spacer />
        <NormalCurrencyInput />
      </Row>
      {divider}
      <Row>
        <InputLabel tooltipLabel="Operating Income" text="Operating Income" />
        <Spacer />
        <NormalCurrencyInput />
      </Row>
      <Row>
        <InputLabel tooltipLabel="Operating Expenses" text="Operating Expenses" />
        <Spacer />
        <NormalCurrencyInput />
      </Row>
      <Row>
        <NestedInputLabel text="Property Taxes" />
        <Spacer />
        <NormalCurrencyInput />
      </Row>
      <Row>
        <NestedInputLabel text="Property Insurance" />
        <Spacer />
        <NormalCurrencyInput />
      </Row>
      <Row>
        <NestedInputLabel text="Property Management" />
        <Spacer />
        <NormalCurrencyInput />
      </Row>
      <Row>
        <NestedInputLabel text="Maintenance" />
        <Spacer />
        <NormalCurrencyInput />
      </Row>
      <Row>
        <NestedInputLabel text="HOA Fees" />
        <Spacer />
        <NormalCurrencyInput />
      </Row>
      <Row>
        <NestedInputLabel text="Utilities" />
        <Spacer />
        <NormalCurrencyInput />
      </Row>
      <Row>
        <NestedInputLabel text="Other Expenses" />
        <Spacer />
        <NormalCurrencyInput />
      </Row>
      {divider}
      <Row>
        <InputLabel tooltipLabel="Net Operating Income" text="Net Operating Income" />
        <Spacer />
        <NormalCurrencyInput />
      </Row>
      <Row>
        <InputLabel tooltipLabel="Loan Payments" text="Loan Payments" />
        <Spacer />
        <NormalCurrencyInput />
      </Row>
      {divider}
      <Row>
        <InputLabel tooltipLabel="Cash Flow" text="Cash Flow" />
        <Spacer />
        <NormalCurrencyInput />
      </Row>
    </SimpleGrid>
  );
}

export default MonthlyCashFlow;
