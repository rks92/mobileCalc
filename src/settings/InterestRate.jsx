import React, { useCallback, useEffect, useState } from 'react';
import {
  NumberInput,
  NumberInputField,
  Spacer,
} from '@chakra-ui/react';
import { debounce } from 'lodash';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';

function InterestRate() {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [interestRate, setInterestRate] = useState(0);

  // Handling Interest Rate updates
  const setStateInterestRate = (value) => {
    dispatch({ type: AppAction.UpdateInterestRate, value });
  };

  const setStateInterestRateDebounced = useCallback(debounce(
    setStateInterestRate,
    500,
  ), []);

  useEffect(() => {
    const parsedInterestRate = parseFloat(interestRate);
    setStateInterestRateDebounced(parsedInterestRate);
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
        precision={2}
        step={0.01}
        min={0}
        max={100}
        variant="unstyled"
        value={interestRate}
        onChange={setInterestRate}
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

export default InterestRate;
