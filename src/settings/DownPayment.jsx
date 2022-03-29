import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { Spacer } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import SmallCurrencyInput from '../shared/inputs/SmallCurrencyInput';

function DownPayment({ downPaymentRatio, setDownPaymentRatio, setLoanRatio }) {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [downPayment, setDownPayment] = useState(0);

  // Handling Down Payment updates
  const setStateDownPayment = (value) => {
    if (value >= state.purchasePrice) {
      dispatch({ type: AppAction.UpdateDownPayment, value });
      dispatch({ type: AppAction.UpdatePurchasePrice, value });
      setDownPaymentRatio(1);
      dispatch({ type: AppAction.UpdateLoan, value: 0 });
      setLoanRatio(0);
    } else {
      const newDownPaymentRatio = value / state.purchasePrice;
      setDownPaymentRatio(newDownPaymentRatio);
      const newDownPayment = state.purchasePrice * newDownPaymentRatio;
      dispatch({ type: AppAction.UpdateDownPayment, value: newDownPayment });
      const newLoan = state.purchasePrice - value;
      dispatch({ type: AppAction.UpdateLoan, value: newLoan });
      const newLoanRatio = newLoan / state.purchasePrice;
      setLoanRatio(newLoanRatio);
    }
  };

  const setStateDownPaymentDebounced = useCallback(_.debounce(
    setStateDownPayment,
    500,
  ), []);

  useEffect(() => {
    setStateDownPaymentDebounced(downPayment);
  }, [downPayment]);

  useEffect(() => {
    if (state.downPayment !== downPayment) {
      setDownPayment(state.downPayment);
    }
  }, [state.downPayment]);

  return (
    <Row>
      <InputLabel tooltipLabel="Down payment" text={`Down payment (${Math.floor(downPaymentRatio * 100)})%`} />
      <Spacer />
      <SmallCurrencyInput
        value={downPayment}
        onChange={setDownPayment}
      />
    </Row>
  );
}

DownPayment.propTypes = {
  downPaymentRatio: PropTypes.number.isRequired,
  setDownPaymentRatio: PropTypes.func.isRequired,
  setLoanRatio: PropTypes.func.isRequired,
};

export default DownPayment;
