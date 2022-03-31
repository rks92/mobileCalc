import React, { useCallback, useEffect, useState } from 'react';
import {
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { debounce } from 'lodash';
import InfoTooltipIcon from '../../shared/InfoTooltipIcon';
import SliderWithMarks from '../../shared/Slider';
import Row from '../../shared/Row';
import { AppAction, useAppDispatch, useAppState } from '../../context/AppContext';
import FullCurrencyInput from '../../shared/inputs/FullCurrencyInput';

function PurchasePriceWithSlider() {
  const dispatch = useAppDispatch();
  const { purchasePrice: stateValue } = useAppState();
  const [localValue, setLocalValue] = useState(stateValue);

  const debouncedOnChange = useCallback(debounce(
    (value) => dispatch({ type: AppAction.UpdatePurchasePrice, value }),
    500,
  ), []);

  useEffect(() => {
    if (stateValue === localValue) {
      return;
    }
    setLocalValue(stateValue);
  }, [stateValue]);

  const label = (
    <Row>
      <Text color="neutral.900" fontSize="lg" fontWeight="medium">
        Purchase Price
      </Text>
      <InfoTooltipIcon label="Explain here" />
    </Row>
  );

  const input = (
    <FullCurrencyInput
      value={localValue}
      onChange={(value) => {
        setLocalValue(value);
        debouncedOnChange(value);
      }}
    />
  );

  const slider = (
    <SliderWithMarks
      min={1000}
      max={1_000_000}
      value={localValue}
      onChange={(value) => {
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

export default PurchasePriceWithSlider;
