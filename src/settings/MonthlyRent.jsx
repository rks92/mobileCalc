import React, { useEffect, useState } from 'react';
import {
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import InfoTooltipIcon from '../shared/InfoTooltipIcon';
import SliderWithMarks from '../shared/Slider';
import Row from '../shared/Row';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import LargeCurrencyInput from '../shared/inputs/LargeCurrencyInput';

function MonthlyRent() {
  const [userHasManuallyMonthlyRent, setUserHasManuallyMonthlyRent] = useState(false);
  const dispatch = useAppDispatch();
  const state = useAppState();
  const { monthlyRent, purchasePrice } = state;

  useEffect(() => {
    // Until user manually sets rent - we can assume the rent is 1/100 of total purchase price
    if (!userHasManuallyMonthlyRent) {
      dispatch({
        type: AppAction.UpdateMonthlyRent,
        value: Math.round(purchasePrice * 0.1),
      });
    }
  }, [purchasePrice]);

  const handleChange = (value) => {
    setUserHasManuallyMonthlyRent(true);
    dispatch({ type: AppAction.UpdateMonthlyRent, value });
  };

  const label = (
    <Row>
      <Text color="neutral.900" fontSize="lg" fontWeight="medium">
        Monthly Rent
      </Text>
      <InfoTooltipIcon label="Explain here" />
    </Row>
  );

  const input = (
    <LargeCurrencyInput value={monthlyRent} onChange={handleChange} />
  );

  const slider = (
    <SliderWithMarks
      min={300}
      max={10_000}
      value={monthlyRent}
      onChange={handleChange}
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
