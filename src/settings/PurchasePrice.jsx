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

function PurchasePrice() {
  const dispatch = useCalculationDispatch();
  const state = useCalculationState();
  const { purchasePrice } = state;

  const handleChange = (value) => {
    dispatch({ type: CalculationAction.UpdatePurchasePrice, data: value });
  };

  const label = (
    <Row>
      <Text color="neutral.900" fontSize="lg" fontWeight="medium">
        Purchase Price
      </Text>
      <InfoTooltipIcon label="Explain here" />
    </Row>
  );

  const input = (
    <LargeCurrencyInput
      value={purchasePrice}
      onChange={handleChange}
    />
  );

  const slider = (
    <SliderWithMarks
      min={1000}
      max={1_000_000}
      value={purchasePrice}
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

export default PurchasePrice;
