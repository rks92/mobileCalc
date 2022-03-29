import React, { useCallback, useEffect, useState } from 'react';
import {
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import _ from 'lodash';
import InfoTooltipIcon from '../shared/InfoTooltipIcon';
import SliderWithMarks from '../shared/Slider';
import Row from '../shared/Row';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import LargeCurrencyInput from '../shared/inputs/LargeCurrencyInput';

function MonthlyRent() {
  const [isSetManually, setIsSetManually] = useState(false);
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [monthlyRent, setMonthlyRent] = useState(0);

  const setStateMonthlyRent = (value) => {
    dispatch({ type: AppAction.UpdateMonthlyRent, value });
  };
  const setStateMonthlyRentDebounced = useCallback(_.debounce(
    setStateMonthlyRent,
    500,
  ), []);

  useEffect(() => {
    setStateMonthlyRentDebounced(monthlyRent);
  }, [monthlyRent]);

  useEffect(() => {
    if (state.monthlyRent !== monthlyRent) {
      setMonthlyRent(state.monthlyRent);
    }
  }, [state.monthlyRent]);

  useEffect(() => {
    // Until user manually sets rent - we can assume the rent is 1/100 of total purchase price
    if (!isSetManually) {
      const value = Math.round(state.purchasePrice * 0.01);
      setMonthlyRent(value);
      setStateMonthlyRentDebounced(value);
    }
  }, [state.purchasePrice]);

  const label = (
    <Row>
      <Text color="neutral.900" fontSize="lg" fontWeight="medium">
        Monthly Rent
      </Text>
      <InfoTooltipIcon label="Explain here" />
    </Row>
  );

  const input = (
    <LargeCurrencyInput
      value={monthlyRent}
      onChange={(value) => {
        setIsSetManually(true);
        setMonthlyRent(value);
      }}
    />
  );

  const slider = (
    <SliderWithMarks
      min={300}
      max={10_000}
      value={monthlyRent}
      onChange={(value) => {
        setIsSetManually(true);
        setMonthlyRent(value);
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
