import React, { useCallback, useEffect } from 'react';
import {
  Spacer,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import InputLabel from '../../shared/texts/InputLabel';
import Row from '../../shared/Row';
import SmallCurrencyInput from '../../shared/inputs/SmallCurrencyInput';
import { AppAction, useAppDispatch, useAppState } from '../../context/AppContext';
import { roundNumber } from '../../shared/utilities';

function SimplePurchasePrice({
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
  return (
    <Row>
      <InputLabel tooltipLabel="Purchase Price" text="Purchase Price" />
      <Spacer />
      <SmallCurrencyInput
        value={purchasePrice}
        onChange={setPurchasePrice}
      />
    </Row>
  );
}

SimplePurchasePrice.propTypes = {
  downPaymentRatio: PropTypes.number.isRequired,
  loanRatio: PropTypes.number.isRequired,
  purchasePrice: PropTypes.number.isRequired,
  setPurchasePrice: PropTypes.func.isRequired,
};

export default SimplePurchasePrice;
