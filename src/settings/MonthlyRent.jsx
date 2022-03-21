import React from 'react';
import {
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import InfoTooltipIcon from '../shared/InfoTooltipIcon';
import LargeCurrencyInput from '../shared/inputs/LargeCurrencyInput';
import SliderWithMarks from '../shared/Slider';
import Row from '../shared/Row';

function MonthlyRent() {
  const label = (
    <Row>
      <Text color="neutral.900" fontSize="lg" fontWeight="medium">
        Monthly Rent
      </Text>
      <InfoTooltipIcon label="Explain here" />
    </Row>
  );

  const input = (
    <LargeCurrencyInput />
  );

  const slider = <SliderWithMarks min={300} max={10_000} value={500} />;

  return (
    <SimpleGrid rows={3} spacing={1}>
      {label}
      {input}
      {slider}
    </SimpleGrid>
  );
}

export default MonthlyRent;
