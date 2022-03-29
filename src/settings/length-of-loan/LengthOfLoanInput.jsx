import { Select } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

function LengthOfLoanInput({ value, onChange }) {
  const MAX_YEARS = 30;
  return (
    <Select
      isFullWidth
      size="sm"
      fontSize="sm"
      fontWeight="medium"
      color="neutral.600"
      maxW="100px"
      placeholder="Years"
      border="1px solid"
      borderColor="neutral.100"
      borderRadius="4px"
      iconSize="18px"
      value={value}
      style={{
        WebkitPaddingEnd: '1rem',
        paddingInlineEnd: '1rem',
      }}
      onChange={(event) => onChange(+event.target.value)}
    >
      {
          Array.from(Array(MAX_YEARS).keys())
            .map(((key) => key + 1))
            .map((yearIndex) => {
              const postfix = yearIndex === 1 ? 'Year' : 'Years';
              return <option key={yearIndex} value={yearIndex}>{`${yearIndex} ${postfix}`}</option>;
            })
      }
    </Select>
  );
}

LengthOfLoanInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LengthOfLoanInput;
