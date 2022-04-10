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

export default function MonthlyRent({ value, onChange, setMonthlyRentIsSetManually }) {
  const label = (
    <Row>
      <Text color="neutral.900" fontSize="lg" fontWeight="medium">
        Monthly Rent
      </Text>
      <InfoTooltipIcon label="The amount of total monthly rent" />
    </Row>
  );

  const input = (
    <FullCurrencyInput
      value={value}
      onChange={(newValue) => {
        setMonthlyRentIsSetManually(true);
        onChange(newValue);
      }}
    />
  );

  const slider = (
    <SliderWithMarks
      min={300}
      max={10_000}
      step={100}
      value={value}
      onChange={(newValue) => {
        setMonthlyRentIsSetManually(true);
        onChange(newValue);
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

MonthlyRent.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  setMonthlyRentIsSetManually: PropTypes.func.isRequired,
};
