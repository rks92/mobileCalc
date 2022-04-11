import React, { useCallback, useEffect, useState } from 'react';
import { throttle } from 'lodash';
import * as PropTypes from 'prop-types';
import PurchasePriceWithSlider from './PurchasePriceWithSlider';
import MonthlyRent from './MonthlyRent';
import { AppAction } from '../../appReducer';

export default function Sliders({
  purchasePrice: statePurchasePrice,
  monthlyRent: stateMonthlyRent,
  dispatch,
}) {
  const [monthlyRentIsSetManually, setMonthlyRentIsSetManually] = useState(false);
  const [localPurchasePrice, setLocalPurchasePrice] = useState(statePurchasePrice);
  const [localMonthlyRent, setLocalMonthlyRent] = useState(stateMonthlyRent);

  const throttledSetPurchasePrice = useCallback(throttle(
    (value) => dispatch({ type: AppAction.UpdatePurchasePrice, value }),
    500,
  ), []);

  const throttledSetMonthlyRent = useCallback(throttle(
    (value) => dispatch({ type: AppAction.UpdateMonthlyRent, value }),
    500,
  ), []);

  useEffect(() => {
    throttledSetMonthlyRent(localMonthlyRent);
  }, [localMonthlyRent]);

  useEffect(() => {
    throttledSetPurchasePrice(localPurchasePrice);
    if (!monthlyRentIsSetManually) {
      const newMonthlyRent = Math.round(localPurchasePrice * 0.01);
      setLocalMonthlyRent(newMonthlyRent);
      throttledSetMonthlyRent(newMonthlyRent);
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
