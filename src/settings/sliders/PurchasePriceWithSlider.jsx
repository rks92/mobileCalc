import React from 'react';
import {
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import * as PropTypes from 'prop-types';
import InfoTooltipIcon from '../../shared/InfoTooltipIcon';
import SliderWithMarks from '../../shared/Slider';
import Row from '../../shared/Row';
import FullCurrencyInput from '../../shared/inputs/FullCurrencyInput';

export default function PurchasePriceWithSlider({ value, onChange }) {
  const label = (
    <Row>
      <Text color="neutral.900" fontSize="lg" fontWeight="medium">
        Purchase Price
      </Text>
      <InfoTooltipIcon label="The amount you're paying to purchase the property" />
    </Row>
  );

  const input = (
    <FullCurrencyInput
      value={value}
      onChange={onChange}
    />
  );

  const slider = (
    <SliderWithMarks
      min={1000}
      max={1_000_000}
      value={value}
      step={100}
      onChange={onChange}
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

PurchasePriceWithSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
