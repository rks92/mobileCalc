import React, { useEffect } from 'react';
import { Spacer } from '@chakra-ui/react';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import CurrencyText from '../shared/texts/CurrencyText';
import { pmt } from '../shared/utilities';

function MonthlyPrincipalAndInterest() {
  const dispatch = useAppDispatch();
  const state = useAppState();

  // Calculating Principal and Interest (monthly)
  useEffect(() => {
    const value = pmt(state.interestRate, state.lengthOfLoan, state.loan, 0);
    dispatch({ type: AppAction.UpdateMonthlyPrincipalAndInterest, value });
  }, [state.interestRate, state.lengthOfLoan, state.loan]);

  return (
    <Row mt={1}>
      <InputLabel tooltipLabel="Monthly Principal & Interest" text="Monthly Principal & Interest" />
      <Spacer />
      <CurrencyText text={state.monthlyPrincipalAndInterest.toString()} />
    </Row>
  );
}

export default MonthlyPrincipalAndInterest;
