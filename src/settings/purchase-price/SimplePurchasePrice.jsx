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

function SimplePurchasePrice({
  purchasePrice, setPurchasePrice,
}) {
  const dispatch = useAppDispatch();
  const state = useAppState();

  const setStatePurchasePriceDebounced = useCallback(_.debounce(
    (value) => dispatch({ type: AppAction.UpdatePurchasePrice, value }),
    500,
  ), []);

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
        onChange={(value) => {
          setPurchasePrice(value);
          setStatePurchasePriceDebounced(value);
        }}
      />
    </Row>
  );
}

SimplePurchasePrice.propTypes = {
  purchasePrice: PropTypes.number.isRequired,
  setPurchasePrice: PropTypes.func.isRequired,
};

export default SimplePurchasePrice;
