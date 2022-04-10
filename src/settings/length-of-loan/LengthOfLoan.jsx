import React, { useCallback, useEffect, useState } from 'react';
import { Spacer } from '@chakra-ui/react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import Row from '../../shared/Row';
import InputLabel from '../../shared/texts/InputLabel';
import LengthOfLoanInput from './LengthOfLoanInput';
import { AppAction } from '../../appReducer';

function LengthOfLoan({ dispatch, lengthOfLoan: stateLengthOfLoan }) {
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
      <InputLabel tooltipLabel="Length of loan" text="Length of loan" />
      <Spacer />
      <LengthOfLoanInput value={localLengthOfLoan} onChange={setLocalLengthOfLoan} />
    </Row>
  );
}

LengthOfLoan.propTypes = {
  dispatch: PropTypes.func.isRequired,
  lengthOfLoan: PropTypes.number.isRequired,
};

export default LengthOfLoan;
