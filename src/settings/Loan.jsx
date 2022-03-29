import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { Spacer } from '@chakra-ui/react';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import SmallCurrencyInput from '../shared/inputs/SmallCurrencyInput';

function Loan() {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [loan, setLoan] = useState(state.loan);

  const setStateLoanDebounced = useCallback(_.debounce(
    (value) => dispatch({ type: AppAction.UpdateLoan, value }),
    500,
  ), []);

  useEffect(() => {
    if (state.loan === loan) {
      return;
    }
    setLoan(state.loan);
  }, [state.loan]);

  return (
    <Row>
      <InputLabel tooltipLabel="Loan" text={`Loan (${Math.floor(state.loanRatio * 100)})%`} />
      <Spacer />
      <SmallCurrencyInput
        value={loan}
        onChange={(value) => {
          setStateLoanDebounced(value);
          setLoan(value);
        }}
      />
    </Row>
  );
}

export default Loan;
