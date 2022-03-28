import React from 'react';
import { Select } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { taxRateByState } from '../shared/models';

function StateSelect({ value, onChange }) {
  return (
    <Select
      isFullWidth
      size="sm"
      fontSize="xs"
      fontWeight="medium"
      color="neutral.600"
      maxW="100px"
      placeholder="State"
      border="1px solid"
      borderColor="neutral.100"
      borderRadius="4px"
      iconSize="18px"
      value={value}
      style={{
        '-webkit-padding-end': '1rem',
        'padding-inline-end': '1rem',
      }}
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
