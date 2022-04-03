import { Spacer } from '@chakra-ui/react';
import React from 'react';
import * as PropTypes from 'prop-types';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import CurrencyText from '../shared/texts/CurrencyText';

export default function OperatingIncome({ value }) {
  return (
    <Row>
      <InputLabel tooltipLabel="Operating Income" text="Operating Income" />
      <Spacer />
      <CurrencyText value={value} />
    </Row>
  );
}

OperatingIncome.propTypes = { value: PropTypes.number.isRequired };
