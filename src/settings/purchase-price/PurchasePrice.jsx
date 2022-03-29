import React, { useCallback, useEffect } from 'react';
import {
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import InfoTooltipIcon from '../../shared/InfoTooltipIcon';
import SliderWithMarks from '../../shared/Slider';
import Row from '../../shared/Row';
import { AppAction, useAppDispatch, useAppState } from '../../context/AppContext';
import LargeCurrencyInput from '../../shared/inputs/LargeCurrencyInput';
import { roundNumber } from '../../shared/utilities';

function PurchasePrice({
  downPaymentRatio, loanRatio, purchasePrice, setPurchasePrice,
}) {
  const dispatch = useAppDispatch();
  const state = useAppState();

  const setStatePurchasePrice = (value, dpRatio, lRatio) => {
    dispatch({ type: AppAction.UpdatePurchasePrice, value });
    const newDownPayment = roundNumber(value * dpRatio);
    dispatch({ type: AppAction.UpdateDownPayment, value: newDownPayment });
    const newLoan = roundNumber(value * lRatio);
    dispatch({ type: AppAction.UpdateLoan, value: newLoan });
  };

  const setStatePurchasePriceDebounced = useCallback(_.debounce(
    setStatePurchasePrice,
    500,
  ), []);

  useEffect(() => {
    setStatePurchasePriceDebounced(purchasePrice, downPaymentRatio, loanRatio);
  }, [purchasePrice]);

  useEffect(() => {
    if (state.purchasePrice !== purchasePrice) {
      setPurchasePrice(state.purchasePrice);
    }
  }, [state.purchasePrice]);

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
      onChange={setPurchasePrice}
    />
  );

  const slider = (
    <SliderWithMarks
      min={1000}
      max={1_000_000}
      value={purchasePrice}
      onChange={setPurchasePrice}
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
  purchasePrice: PropTypes.number.isRequired,
  setPurchasePrice: PropTypes.func.isRequired,
};

export default PurchasePrice;
