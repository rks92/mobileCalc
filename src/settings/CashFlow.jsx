import { Spacer } from '@chakra-ui/react';
import React from 'react';
import * as PropTypes from 'prop-types';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import CurrencyText from '../shared/texts/CurrencyText';

function CashFlow({ value }) {
  return (
    <Row>
      <InputLabel tooltipLabel="The total MONTHLY net amount you will receive from a rental property as income" text="Cash Flow" />
      <Spacer />
      <CurrencyText fontSize="lg" value={value} />
    </Row>
  );
}

CashFlow.propTypes = { value: PropTypes.number.isRequired };

export default React.memo(
  CashFlow,
  (prevProps, nextProps) => prevProps.value === nextProps.value,
);
