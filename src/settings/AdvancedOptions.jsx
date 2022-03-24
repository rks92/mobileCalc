import React, { useEffect, useState } from 'react';
import {
  Box,
  SimpleGrid,
  Spacer,
  Text,
} from '@chakra-ui/react';
import InputLabel from '../shared/texts/InputLabel';
import Row from '../shared/Row';
import StateSelect from './StateSelect';
import SmallCurrencyInput from '../shared/inputs/SmallCurrencyInput';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import { roundNumber } from '../shared/utilities';

function AdvancedOptions() {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [closingCostManuallyUpdated, setClosingCostManuallyUpdated] = useState(false);
  const {
    closingCost, rehabCost, afterRepairValue, propertyState, purchasePrice,
  } = state;

  const updateClosingCost = (value, isManualUpdate = false) => {
    if (isManualUpdate) {
      setClosingCostManuallyUpdated(true);
    }
    dispatch({ type: AppAction.UpdateClosingCost, value });
  };
  const updateRehabCost = (value) => dispatch({ type: AppAction.UpdateRehabCost, value });
  const updateAfterRepairValue = (value) => dispatch({
    type: AppAction.UpdateAfterRepairValue,
    value,
  });
  const updatePropertyState = (value) => dispatch({ type: AppAction.UpdatePropertyState, value });

  useEffect(() => {
    if (closingCostManuallyUpdated) {
      return;
    }
    updateClosingCost(roundNumber(purchasePrice * 0.03));
  }, [purchasePrice]);

  useEffect(() => {
    // Rehab cost should be set
    if (rehabCost > 0) {
      updateAfterRepairValue(purchasePrice + rehabCost);
    } else {
      updateAfterRepairValue(0);
    }
  }, [purchasePrice, rehabCost]);

  return (
    <>
      <Box my="20px">
        <Text
          color="neutral.400"
          fontSize="xs"
          fontWeight="medium"
        >
          ADVANCED OPTIONS
        </Text>
      </Box>
      <SimpleGrid rows={4} spacing="4px">
        <Row>
          <InputLabel tooltipLabel="Closing Costs (Purchase)" text="Closing Costs (Purchase)" />
          <Spacer />
          <SmallCurrencyInput value={closingCost} onChange={updateClosingCost} />
        </Row>
        <Row>
          <InputLabel tooltipLabel="Rehab Cost" text="Rehab Cost" />
          <Spacer />
          <SmallCurrencyInput value={rehabCost} onChange={updateRehabCost} />
        </Row>
        <Row>
          <InputLabel tooltipLabel="After Repair Value " text="After Repair Value " />
          <Spacer />
          <SmallCurrencyInput value={afterRepairValue} onChange={updateAfterRepairValue} />
        </Row>
        <Row>
          <InputLabel tooltipLabel="Property State " text="Property State" />
          <Spacer />
          <StateSelect value={propertyState} onChange={updatePropertyState} />
        </Row>
      </SimpleGrid>
    </>
  );
}

export default AdvancedOptions;
