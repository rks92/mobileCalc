import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { NumberInput, NumberInputField, Spacer } from '@chakra-ui/react';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';

function InterestRate() {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [interestRate, setInterestRate] = useState(0);

  // Handling Interest Rate updates
  const setStateInterestRate = (value) => {
    let safeGuardedValue = value;
    if (value > 100) {
      safeGuardedValue = 100;
    }
    if (value === 0) {
      safeGuardedValue = 0.01; // TODO: Confirm that can be zero
    }
    dispatch({ type: AppAction.UpdateInterestRate, value: safeGuardedValue });
  };

  const setStateInterestRateDebounced = useCallback(_.debounce(
    setStateInterestRate,
    500,
  ), []);

  useEffect(() => {
    setStateInterestRateDebounced(interestRate);
  }, [interestRate]);

  useEffect(() => {
    if (state.interestRate !== interestRate) {
      setInterestRate(state.interestRate);
    }
  }, [state.interestRate]);

  return (
    <Row>
      <InputLabel tooltipLabel="Interest Rate" text="Interest Rate" />
      <Spacer />
      <NumberInput
        size="sm"
        value={interestRate}
        onChange={(value) => { setInterestRate(+value); }}
        min={0}
        max={100}
        borderRadius="4px"
        border="1px solid"
        borderColor="neutral.100"
        variant="unstyled"
        style={{
          '--number-input-stepper-width': '1px', // TODO: Find a better way to remove stepper padding
        }}
      >
        <NumberInputField
          border={0} // It is handled by the wrapper above
          outline={0} // It is handled by the wrapper above
          px={2}
          py={1}
          h={8}
          size="sm"
          fontSize="sm"
          fontWeight="medium"
          color="neutral.600"
          maxW="100px"
          textAlign="right"
        />
      </NumberInput>
    </Row>
  );
}

export default InterestRate;
