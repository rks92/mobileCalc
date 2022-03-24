import React from 'react';
import { Select } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { taxRateByState } from '../shared/models';

function StateSelect({ value, onChange }) {
  return (
    <Select
      size="sm"
      fontSize="sm"
      fontWeight="medium"
      color="neutral.600"
      maxW="98px"
      placeholder="State"
      border="1px solid"
      borderColor="neutral.100"
      borderRadius="4px"
      iconSize="18px"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {Object.keys(taxRateByState)
        .map((state) => <option key={state} value={state}>{state}</option>)}
    </Select>
  );
}

StateSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StateSelect;
