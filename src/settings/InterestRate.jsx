import React, { useCallback, useEffect, useState } from 'react';
import {
  NumberInput,
  NumberInputField,
  Spacer,
} from '@chakra-ui/react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import { AppAction } from '../appReducer';

function InterestRate({ dispatch, interestRate: stateInterestRate }) {
  const [localInterestRate, setLocalInterestRate] = useState(0);

  // Handling Interest Rate updates
  const setStateInterestRate = (value) => {
    dispatch({ type: AppAction.UpdateInterestRate, value });
  };

  const setStateInterestRateDebounced = useCallback(debounce(
    setStateInterestRate,
    500,
  ), []);

  useEffect(() => {
    const parsedInterestRate = parseFloat(localInterestRate);
    setStateInterestRateDebounced(parsedInterestRate);
  }, [localInterestRate]);

  useEffect(() => {
    if (stateInterestRate !== localInterestRate) {
      setLocalInterestRate(stateInterestRate);
    }
  }, [stateInterestRate]);

  return (
    <Row>
      <InputLabel tooltipLabel="Interest Rate" text="Interest Rate" />
      <Spacer />
      <NumberInput
        precision={2}
        step={0.01}
        min={0}
        max={100}
        variant="unstyled"
        value={localInterestRate}
        onChange={setLocalInterestRate}
        style={{
          '--number-input-stepper-width': '1px', // TODO: Find a better way to remove stepper padding
        }}
      >
        <NumberInputField
          px={2}
          py={1}
          h={8}
          borderRadius="4px"
          border="1px solid"
          borderColor="neutral.100"
          size="sm"
          fontSize="sm"
          fontWeight="medium"
          color="neutral.600"
          maxH={7}
          maxW="100px"
          textAlign="right"
        />
      </NumberInput>
    </Row>
  );
}

InterestRate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  interestRate: PropTypes.number.isRequired,
};

export default InterestRate;
