import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import * as PropTypes from 'prop-types';
import PurchasePriceWithSlider from './PurchasePriceWithSlider';
import MonthlyRent from './MonthlyRent';
import { AppAction } from '../../appReducer';

export default function Sliders({ purchasePrice, monthlyRent, dispatch }) {
  const [monthlyRentIsSetManually, setMonthlyRentIsSetManually] = useState(false);
  const [localPurchasePrice, setLocalPurchasePrice] = useState(purchasePrice);
  const [localMonthlyRent, setLocalMonthlyRent] = useState(monthlyRent);

  const debouncedSetPurchasePrice = useCallback(debounce(
    (value) => dispatch({ type: AppAction.UpdatePurchasePrice, value }),
    500,
  ), []);

  const debouncedSetMonthlyRent = useCallback(debounce(
    (value) => dispatch({ type: AppAction.UpdateMonthlyRent, value }),
    500,
  ), []);

  useEffect(() => {
    debouncedSetMonthlyRent(localMonthlyRent);
  }, [localMonthlyRent]);

  useEffect(() => {
    debouncedSetPurchasePrice(localPurchasePrice);
    if (!monthlyRentIsSetManually) {
      const newMonthlyRent = Math.round(localPurchasePrice * 0.01);
      setLocalMonthlyRent(newMonthlyRent);
      debouncedSetMonthlyRent(newMonthlyRent);
    }
  }, [localPurchasePrice]);

  return (
    <>
      <PurchasePriceWithSlider value={localPurchasePrice} onChange={setLocalPurchasePrice} />
      <MonthlyRent
        value={localMonthlyRent}
        onChange={setLocalMonthlyRent}
        setMonthlyRentIsSetManually={setMonthlyRentIsSetManually}
      />
    </>
  );
}

Sliders.propTypes = {
  purchasePrice: PropTypes.number.isRequired,
  monthlyRent: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};
