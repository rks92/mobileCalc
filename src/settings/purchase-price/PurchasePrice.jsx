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

function PurchasePrice({
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
      onChange={(value) => {
        setPurchasePrice(value);
        setStatePurchasePriceDebounced(value);
      }}
    />
  );

  const slider = (
    <SliderWithMarks
      min={1000}
      max={1_000_000}
      value={purchasePrice}
      onChange={(value) => {
        setPurchasePrice(value);
        setStatePurchasePriceDebounced(value);
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

PurchasePrice.propTypes = {
  purchasePrice: PropTypes.number.isRequired,
  setPurchasePrice: PropTypes.func.isRequired,
};

export default PurchasePrice;
