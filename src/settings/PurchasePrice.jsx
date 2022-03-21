import React from 'react';
import {
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import InfoTooltipIcon from '../shared/InfoTooltipIcon';
import LargeCurrencyInput from '../shared/inputs/LargeCurrencyInput';
import SliderWithMarks from '../shared/Slider';
import Row from '../shared/Row';

function PurchasePrice() {
  const label = (
    <Row>
      <Text color="neutral.900" fontSize="lg" fontWeight="medium">
        Purchase Price
      </Text>
      <InfoTooltipIcon label="Explain here" />
    </Row>
  );

  const input = (
    <LargeCurrencyInput />
  );

  const slider = <SliderWithMarks min={1000} max={1_000_000} value={50_000} />;

  return (
    <SimpleGrid rows={3} spacing={1}>
      {label}
      {input}
      {slider}
    </SimpleGrid>
  );
}

export default PurchasePrice;
