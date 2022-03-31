import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import InlineCurrencyInput from './InlineCurrencyInput';

function DebouncedInlineCurrencyInput({ value: stateValue, onChange }) {
  const [localValue, setLocalValue] = useState(stateValue);

  const debouncedOnChange = useCallback(debounce(
    (value) => onChange(value),
    500,
  ), []);

  useEffect(() => {
    if (stateValue === localValue) {
      return;
    }
    setLocalValue(stateValue);
  }, [stateValue]);

  return (
    <InlineCurrencyInput
      value={localValue}
      onChange={(value) => {
        setLocalValue(value);
        debouncedOnChange(value);
      }}
    />
  );
}

DebouncedInlineCurrencyInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default DebouncedInlineCurrencyInput;
