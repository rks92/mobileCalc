import React from 'react';
import {
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import InfoTooltipIcon from '../shared/InfoTooltipIcon';
import SliderWithMarks from '../shared/Slider';
import Row from '../shared/Row';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import LargeCurrencyInput from '../shared/inputs/LargeCurrencyInput';
import { roundNumber } from '../shared/utilities';

function PurchasePrice({ downPaymentRatio, loanRatio }) {
  const dispatch = useAppDispatch();
  const state = useAppState();

  const {
    purchasePrice,
  } = state;

  const updatePurchasePrice = (value) => {
    dispatch({ type: AppAction.UpdatePurchasePrice, value });
    const newDownPayment = roundNumber(purchasePrice * downPaymentRatio);
    dispatch({ type: AppAction.UpdateDownPayment, value: newDownPayment });
    const newLoan = roundNumber(purchasePrice * loanRatio);
    dispatch({ type: AppAction.UpdateLoan, value: newLoan });
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
      onChange={updatePurchasePrice}
    />
  );

  const slider = (
    <SliderWithMarks
      min={1000}
      max={1_000_000}
      value={purchasePrice}
      onChange={updatePurchasePrice}
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

PurchasePrice.propTypes = {
  downPaymentRatio: PropTypes.number.isRequired,
  loanRatio: PropTypes.number.isRequired,
};

export default PurchasePrice;
