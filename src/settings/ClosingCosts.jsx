import React, { useEffect, useState } from 'react';
import {
  Spacer,
} from '@chakra-ui/react';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import { roundNumber } from '../shared/utilities';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import DebouncedInlineCurrencyInput from '../shared/inputs/DebouncedInlineCurrencyInput';

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
      <InputLabel
        tooltipLabel="We assume closings costs are 3% of total purchase price"
        text="Closing Costs (Purchase)"
      />
      <Spacer />
      <DebouncedInlineCurrencyInput value={closingCosts} onChange={updateClosingCosts} />
    </Row>
  );
}

export default ClosingCosts;
