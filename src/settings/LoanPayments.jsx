import { Spacer } from '@chakra-ui/react';
import React from 'react';
import * as PropTypes from 'prop-types';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import CurrencyText from '../shared/texts/CurrencyText';

export default function LoanPayments({ value }) {
  return (
    <Row mt={3}>
      <InputLabel tooltipLabel="Total principal and interest required to repay your loan (excludes escrow)" text="Loan Payments" />
      <Spacer />
      <CurrencyText value={value} />
    </Row>
  );
}

LoanPayments.propTypes = { value: PropTypes.number.isRequired };
