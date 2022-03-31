import React from 'react';
import { Spacer } from '@chakra-ui/react';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import DebouncedInlineCurrencyInput from '../shared/inputs/DebouncedInlineCurrencyInput';

function Loan() {
  const dispatch = useAppDispatch();
  const { loan, loanRatio } = useAppState();

  return (
    <Row>
      <InputLabel tooltipLabel="Loan" text={`Loan (${Math.floor(loanRatio * 100)})%`} />
      <Spacer />
      <DebouncedInlineCurrencyInput
        value={loan}
        onChange={(value) => {
          dispatch({ type: AppAction.UpdateLoan, value });
        }}
      />
    </Row>
  );
}

export default Loan;
