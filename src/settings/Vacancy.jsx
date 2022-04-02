import { Spacer } from '@chakra-ui/react';
import React from 'react';
import * as PropTypes from 'prop-types';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import DebouncedInlineCurrencyInput from '../shared/inputs/DebouncedInlineCurrencyInput';

export function Vacancy(props) {
  return (
    <Row>
      <InputLabel tooltipLabel="Vacancy" text="Vacancy" />
      <Spacer />
      <DebouncedInlineCurrencyInput value={props.value} onChange={props.onChange} />
    </Row>
  );
}

Vacancy.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
};
