import React, { useEffect } from 'react';
import {
  Spacer,
} from '@chakra-ui/react';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import SmallCurrencyInput from '../shared/inputs/SmallCurrencyInput';

function RehabCost() {
  const dispatch = useAppDispatch();
  const state = useAppState();

  const onChange = (value) => dispatch({ type: AppAction.UpdateRehabCost, value });

  const updateAfterRepairValue = (value) => dispatch({
    type: AppAction.UpdateAfterRepairValue,
    value,
  });

  const {
    rehabCost, purchasePrice,
  } = state;

  useEffect(() => {
    // Rehab cost should be set
    if (rehabCost > 0) {
      updateAfterRepairValue(purchasePrice + rehabCost);
    } else {
      updateAfterRepairValue(0);
    }
  }, [purchasePrice, rehabCost]);

  return (
    <Row>
      <InputLabel tooltipLabel="Rehab Cost" text="Rehab Cost" />
      <Spacer />
      <SmallCurrencyInput value={rehabCost} onChange={onChange} />
    </Row>
  );
}

export default RehabCost;
