import React from 'react';
import {
  Spacer,
} from '@chakra-ui/react';
import InputLabel from '../shared/texts/InputLabel';
import Row from '../shared/Row';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import DebouncedInlineCurrencyInput from '../shared/inputs/DebouncedInlineCurrencyInput';

function PurchasePrice() {
  const dispatch = useAppDispatch();
  const { purchasePrice } = useAppState();

  return (
    <Row>
      <InputLabel tooltipLabel="Purchase Price" text="Purchase Price" />
      <Spacer />
      <DebouncedInlineCurrencyInput
        value={purchasePrice}
        onChange={(value) => {
          dispatch({ type: AppAction.UpdatePurchasePrice, value });
        }}
      />
    </Row>
  );
}

export default PurchasePrice;
