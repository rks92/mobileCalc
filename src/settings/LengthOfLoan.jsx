import React, { useCallback, useEffect, useState } from 'react';
import { Select, Spacer } from '@chakra-ui/react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import { AppAction } from '../appReducer';

function LengthOfLoan({ dispatch, lengthOfLoan: stateLengthOfLoan }) {
  const MAX_YEARS = 30;
  const [localLengthOfLoan, setLocalLengthOfLoan] = useState(0);

  // Handling Length of Loan updates
  const setStateLengthOfLoan = (value) => dispatch({ type: AppAction.UpdateLengthOfLoan, value });

  const setStateLengthOfLoanDebounced = useCallback(debounce(
    setStateLengthOfLoan,
    500,
  ), []);

  useEffect(() => {
    setStateLengthOfLoanDebounced(localLengthOfLoan);
  }, [localLengthOfLoan]);

  useEffect(() => {
    if (stateLengthOfLoan !== localLengthOfLoan) {
      setLocalLengthOfLoan(stateLengthOfLoan);
    }
  }, [stateLengthOfLoan]);

  return (
    <Row>
      <InputLabel text="Length of loan" />
      <Spacer />
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
        value={localLengthOfLoan}
        style={{
          WebkitPaddingEnd: '1rem',
          paddingInlineEnd: '1rem',
        }}
        onChange={(event) => setLocalLengthOfLoan(+event.target.value)}
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
    </Row>
  );
}

LengthOfLoan.propTypes = {
  dispatch: PropTypes.func.isRequired,
  lengthOfLoan: PropTypes.number.isRequired,
};

export default React.memo(
  LengthOfLoan,
  (prevProps, nextProps) => prevProps.lengthOfLoan === nextProps.lengthOfLoan,
);
