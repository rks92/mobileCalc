import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { Spacer } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import SmallCurrencyInput from '../shared/inputs/SmallCurrencyInput';

function Loan({ loanRatio, setDownPaymentRatio, setLoanRatio }) {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [loan, setLoan] = useState(0);

  // Handling Loan updates
  const setStateLoan = (value) => {
    if (value >= state.purchasePrice) {
      dispatch({ type: AppAction.UpdateLoan, value });
      dispatch({ type: AppAction.UpdatePurchasePrice, value });
      setLoanRatio(1);
      dispatch({ type: AppAction.UpdateDownPayment, value: 0 });
      setDownPaymentRatio(0);
    } else {
      const newLoanRatio = value / state.purchasePrice;
      setLoanRatio(newLoanRatio);
      const newLoan = state.purchasePrice * newLoanRatio;
      dispatch({ type: AppAction.UpdateLoan, value: newLoan });
      const newDownPayment = state.purchasePrice - value;
      dispatch({ type: AppAction.UpdateDownPayment, value: newDownPayment });
      const newDownPaymentRatio = newDownPayment / state.purchasePrice;
      setDownPaymentRatio(newDownPaymentRatio);
    }
  };

  const setStateLoanDebounced = useCallback(_.debounce(
    setStateLoan,
    500,
  ), []);

  useEffect(() => {
    setStateLoanDebounced(loan);
  }, [loan]);

  useEffect(() => {
    if (state.loan !== loan) {
      setLoan(state.loan);
    }
  }, [state.loan]);

  return (
    <Row>
      <InputLabel tooltipLabel="Loan" text={`Loan (${Math.floor(loanRatio * 100)})%`} />
      <Spacer />
      <SmallCurrencyInput
        value={loan}
        onChange={setLoan}
      />
    </Row>
  );
}

Loan.propTypes = {
  loanRatio: PropTypes.number.isRequired,
  setDownPaymentRatio: PropTypes.func.isRequired,
  setLoanRatio: PropTypes.func.isRequired,
};

export default Loan;
