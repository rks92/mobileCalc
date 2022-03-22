import React from 'react';
import {
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import InfoTooltipIcon from '../shared/InfoTooltipIcon';
import SliderWithMarks from '../shared/Slider';
import Row from '../shared/Row';
import { CalculationAction, useCalculationDispatch, useCalculationState } from '../context/CalculationContext';
import LargeCurrencyInput from '../shared/inputs/LargeCurrencyInput';

function MonthlyRent() {
  const dispatch = useCalculationDispatch();
  const state = useCalculationState();
  const { monthlyRent } = state;

  const handleChange = (value) => {
    dispatch({ type: CalculationAction.UpdateMonthlyRent, data: value });
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
