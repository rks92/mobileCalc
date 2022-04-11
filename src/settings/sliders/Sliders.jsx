import React, {
  useCallback,
  useEffect, useState,
} from 'react';
import * as PropTypes from 'prop-types';
import { debounce } from 'lodash';
import PurchasePriceWithSlider from './PurchasePriceWithSlider';
import MonthlyRent from './MonthlyRent';
import { AppAction } from '../../appReducer';
import { INITIAL_MONTHLY_RENT, INITIAL_PURCHASE_PRICE } from '../../shared/models';

export default function Sliders({
  dispatch,
}) {
  const [monthlyRentIsSetManually, setMonthlyRentIsSetManually] = useState(false);
  const [localPurchasePrice, setLocalPurchasePrice] = useState(INITIAL_PURCHASE_PRICE);
  const [localMonthlyRent, setLocalMonthlyRent] = useState(INITIAL_MONTHLY_RENT);

  const throttledSetPurchasePrice = useCallback(debounce(
    (value) => dispatch({ type: AppAction.UpdatePurchasePrice, value }),
    500,
  ), []);

  const throttledSetMonthlyRent = useCallback(debounce(
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
  dispatch: PropTypes.func.isRequired,
};
