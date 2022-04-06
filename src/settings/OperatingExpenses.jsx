import { Spacer } from '@chakra-ui/react';
import React from 'react';
import * as PropTypes from 'prop-types';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import CurrencyText from '../shared/texts/CurrencyText';

export default function OperatingExpenses({ value }) {
  return (
    <Row mt={3}>
      <InputLabel tooltipLabel="All expenses you will pay while renting out a property, excluding loan payments" text="Operating Expenses" />
      <Spacer />
      <CurrencyText value={value} />
    </Row>
  );
}

OperatingExpenses.propTypes = { value: PropTypes.number.isRequired };
