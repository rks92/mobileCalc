import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { Spacer } from '@chakra-ui/react';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import SmallCurrencyInput from '../shared/inputs/SmallCurrencyInput';

function DownPayment() {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [downPayment, setDownPayment] = useState(state.downPayment);

  const setStateDownPaymentDebounced = useCallback(_.debounce(
    (value) => dispatch({ type: AppAction.UpdateDownPayment, value }),
    500,
  ), []);

  useEffect(() => {
    if (state.downPayment === downPayment) {
      return;
    }
    setDownPayment(state.downPayment);
  }, [state.downPayment]);

  return (
    <Row>
      <InputLabel tooltipLabel="Down payment" text={`Down payment (${Math.floor(state.downPaymentRatio * 100)})%`} />
      <Spacer />
      <SmallCurrencyInput
        value={downPayment}
        onChange={(value) => {
          setDownPayment(value);
          setStateDownPaymentDebounced(value);
        }}
      />
    </Row>
  );
}

export default DownPayment;
