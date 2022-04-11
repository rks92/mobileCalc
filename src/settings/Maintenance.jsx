import { Spacer } from '@chakra-ui/react';
import React from 'react';
import * as PropTypes from 'prop-types';
import Row from '../shared/Row';
import NestedInputLabel from '../shared/texts/NestedInputLabel';
import DebouncedInlineCurrencyInput from '../shared/inputs/DebouncedInlineCurrencyInput';

function Maintenance({ value, onChange }) {
  return (
    <Row>
      <NestedInputLabel text="Maintenance" />
      <Spacer />
      <DebouncedInlineCurrencyInput value={value} onChange={onChange} />
    </Row>
  );
}

Maintenance.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(
  Maintenance,
  (prevProps, nextProps) => prevProps.value === nextProps.value,
);
