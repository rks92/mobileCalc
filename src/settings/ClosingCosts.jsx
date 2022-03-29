import React, { useEffect, useState } from 'react';
import {
  Spacer,
} from '@chakra-ui/react';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import { roundNumber } from '../shared/utilities';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import SmallCurrencyInput from '../shared/inputs/SmallCurrencyInput';

function ClosingCosts() {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [isManuallyUpdated, setIsManuallyUpdated] = useState(false);
  const {
    closingCosts, purchasePrice,
  } = state;

  const updateClosingCosts = (value, isManualUpdate = false) => {
    if (isManualUpdate) {
      setIsManuallyUpdated(true);
    }
    dispatch({ type: AppAction.UpdateClosingCosts, value });
  };

  useEffect(() => {
    if (isManuallyUpdated) {
      return;
    }
    updateClosingCosts(roundNumber(purchasePrice * 0.03));
  }, [purchasePrice]);

  return (
    <Row>
      <InputLabel tooltipLabel="Closing Costs (Purchase)" text="Closing Costs (Purchase)" />
      <Spacer />
      <SmallCurrencyInput value={closingCosts} onChange={updateClosingCosts} />
    </Row>
  );
}

export default ClosingCosts;
