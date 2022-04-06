import React from 'react';
import { Spacer } from '@chakra-ui/react';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import DebouncedInlineCurrencyInput from '../shared/inputs/DebouncedInlineCurrencyInput';

function DownPayment() {
  const dispatch = useAppDispatch();
  const { downPayment, downPaymentRatio } = useAppState();

  return (
    <Row>
      <InputLabel
        tooltipLabel="The amount of cash you are investing (less 80% loan)"
        text={`Down payment (${Math.floor(downPaymentRatio * 100)})%`}
      />
      <Spacer />
      <DebouncedInlineCurrencyInput
        value={downPayment}
        onChange={(value) => {
          dispatch({ type: AppAction.UpdateDownPayment, value });
        }}
      />
    </Row>
  );
}

export default DownPayment;
