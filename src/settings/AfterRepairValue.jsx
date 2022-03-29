import React from 'react';
import { Spacer } from '@chakra-ui/react';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import SmallCurrencyInput from '../shared/inputs/SmallCurrencyInput';

function AfterRepairValue() {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const {
    afterRepairValue,
  } = state;

  const onChange = (value) => dispatch({
    type: AppAction.UpdateAfterRepairValue,
    value,
  });

  return (
    <Row>
      <InputLabel tooltipLabel="After Repair Value " text="After Repair Value " />
      <Spacer />
      <SmallCurrencyInput value={afterRepairValue} onChange={onChange} />
    </Row>
  );
}

export default AfterRepairValue;
