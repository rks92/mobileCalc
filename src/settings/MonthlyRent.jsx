import React, { useCallback, useEffect, useState } from 'react';
import {
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { debounce } from 'lodash';
import InfoTooltipIcon from '../shared/InfoTooltipIcon';
import SliderWithMarks from '../shared/Slider';
import Row from '../shared/Row';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import FullCurrencyInput from '../shared/inputs/FullCurrencyInput';

function MonthlyRent() {
  const [isSetManually, setIsSetManually] = useState(false);
  const dispatch = useAppDispatch();
  const { purchasePrice, monthlyRent: stateValue } = useAppState();
  const [localValue, setLocalValue] = useState(stateValue);

  const debouncedOnChange = useCallback(debounce(
    (value) => dispatch({ type: AppAction.UpdateMonthlyRent, value }),
    500,
  ), []);

  useEffect(() => {
    if (stateValue === localValue) {
      return;
    }
    setLocalValue(stateValue);
  }, [stateValue]);

  useEffect(() => {
    // Until user manually sets rent - we can assume the rent is 1/100 of total purchase price
    if (!isSetManually) {
      const value = Math.round(purchasePrice * 0.01);
      dispatch({ type: AppAction.UpdateMonthlyRent, value });
    }
  }, [purchasePrice]);

  const label = (
    <Row>
      <Text color="neutral.900" fontSize="lg" fontWeight="medium">
        Monthly Rent
      </Text>
      <InfoTooltipIcon label="Explain here" />
    </Row>
  );

  const input = (
    <FullCurrencyInput
      value={localValue}
      onChange={(value) => {
        setIsSetManually(true);
        setLocalValue(value);
        debouncedOnChange(value);
      }}
    />
  );

  const slider = (
    <SliderWithMarks
      min={300}
      max={10_000}
      value={localValue}
      onChange={(value) => {
        setIsSetManually(true);
        setLocalValue(value);
        debouncedOnChange(value);
      }}
    />
  );

  return (
    <SimpleGrid rows={3} spacing={1}>
      {label}
      {input}
      {slider}
    </SimpleGrid>
  );
}

export default MonthlyRent;
