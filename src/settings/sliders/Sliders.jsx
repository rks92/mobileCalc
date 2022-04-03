import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { AppAction, useAppDispatch, useAppState } from '../../context/AppContext';
import PurchasePriceWithSlider from './PurchasePriceWithSlider';
import MonthlyRent from './MonthlyRent';

export default function Sliders() {
  const dispatch = useAppDispatch();
  const { purchasePrice, monthlyRent } = useAppState();
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
