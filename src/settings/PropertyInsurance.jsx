import { Spacer } from '@chakra-ui/react';
import React from 'react';
import * as PropTypes from 'prop-types';
import Row from '../shared/Row';
import NestedInputLabel from '../shared/texts/NestedInputLabel';
import DebouncedInlineCurrencyInput from '../shared/inputs/DebouncedInlineCurrencyInput';

export default function PropertyInsurance({ value, onChange }) {
  return (
    <Row>
      <NestedInputLabel text="Property Insurance" />
      <Spacer />
      <DebouncedInlineCurrencyInput
        value={value}
        onChange={onChange}
      />
    </Row>
  );
}

PropertyInsurance.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
