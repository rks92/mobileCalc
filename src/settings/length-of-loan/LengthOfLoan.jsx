import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { Spacer } from '@chakra-ui/react';
import { AppAction, useAppDispatch, useAppState } from '../../context/AppContext';
import Row from '../../shared/Row';
import InputLabel from '../../shared/texts/InputLabel';
import LengthOfLoanInput from './LengthOfLoanInput';

function LengthOfLoan() {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [lengthOfLoan, setLengthOfLoan] = useState(0);

  // handling Length of Loan updates
  const setStateLengthOfLoan = (value) => dispatch({ type: AppAction.UpdateLengthOfLoan, value });

  const setStateLengthOfLoanDebounced = useCallback(_.debounce(
    setStateLengthOfLoan,
    500,
  ), []);

  useEffect(() => {
    setStateLengthOfLoanDebounced(lengthOfLoan);
  }, [lengthOfLoan]);

  useEffect(() => {
    if (state.lengthOfLoan !== lengthOfLoan) {
      setLengthOfLoan(state.lengthOfLoan);
    }
  }, [state.lengthOfLoan]);

  return (
    <Row>
      <InputLabel tooltipLabel="Length of loan" text="Length of loan" />
      <Spacer />
      <LengthOfLoanInput value={lengthOfLoan} onChange={setLengthOfLoan} />
    </Row>
  );
}

export default LengthOfLoan;
