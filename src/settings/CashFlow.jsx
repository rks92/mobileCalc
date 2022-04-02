import { Spacer } from '@chakra-ui/react';
import React from 'react';
import * as PropTypes from 'prop-types';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import CurrencyText from '../shared/texts/CurrencyText';

export default function CashFlow({ value }) {
  return (
    <Row>
      <InputLabel tooltipLabel="Cash Flow" text="Cash Flow" />
      <Spacer />
      <CurrencyText fontSize="lg" value={value} />
    </Row>
  );
}

CashFlow.propTypes = { value: PropTypes.number.isRequired };
