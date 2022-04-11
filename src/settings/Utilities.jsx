import { Spacer } from '@chakra-ui/react';
import React from 'react';
import * as PropTypes from 'prop-types';
import Row from '../shared/Row';
import NestedInputLabel from '../shared/texts/NestedInputLabel';
import DebouncedInlineCurrencyInput from '../shared/inputs/DebouncedInlineCurrencyInput';

function Utilities({ value, onChange }) {
  return (
    <Row>
      <NestedInputLabel text="Utilities" />
      <Spacer />
      <DebouncedInlineCurrencyInput value={value} onChange={onChange} />
    </Row>
  );
}

Utilities.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(
  Utilities,
  (prevProps, nextProps) => prevProps.value === nextProps.value,
);
