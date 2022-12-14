import { Spacer } from '@chakra-ui/react';
import React from 'react';
import * as PropTypes from 'prop-types';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import CurrencyText from '../shared/texts/CurrencyText';

function NetOperatingIncome({ value }) {
  return (
    <Row>
      <InputLabel tooltipLabel="Monthly NOI = Net Operating Income - Net Operating Expenses" text="Net Operating Income" />
      <Spacer />
      <CurrencyText value={value} />
    </Row>
  );
}

NetOperatingIncome.propTypes = { value: PropTypes.number.isRequired };

export default React.memo(
  NetOperatingIncome,
  (prevProps, nextProps) => prevProps.value === nextProps.value,
);
