import React from 'react';
import {
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spacer,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

function SliderWithMarks({
  value, min, max, onChange, step,
}) {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });

  return (
    <>
      <Slider
        step={step}
        min={min}
        max={max}
        aria-label="slider-with-marks"
        value={value}
        onChange={onChange}
        focusThumbOnChange={false}
      >
        <SliderTrack
          outline="4px solid"
          outlineColor="neutral.100"
          height="16px"
          borderRadius="76px"
        >
          <SliderFilledTrack bg="primary.400" />
        </SliderTrack>
        <SliderThumb
          h="32px"
          w="32px"
          color="primary.80"
          borderColor="primary.300"
          borderWidth="2px"
        />
      </Slider>
      <Flex>
        <Text
          fontSize="lg"
          color="neutral.400"
          fontWeight="medium"
        >
          {formatter.format(min)}
        </Text>
        <Spacer />
        <Text
          fontSize="lg"
          color="neutral.400"
          fontWeight="medium"
        >
          {formatter.format(max)}
        </Text>
      </Flex>
    </>
  );
}

SliderWithMarks.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
};

SliderWithMarks.defaultProps = {
  step: 1,
};

export default SliderWithMarks;
