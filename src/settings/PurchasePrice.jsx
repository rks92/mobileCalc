import React from 'react';
import {
  Spacer,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import InputLabel from '../shared/texts/InputLabel';
import Row from '../shared/Row';
import DebouncedInlineCurrencyInput from '../shared/inputs/DebouncedInlineCurrencyInput';
import { AppAction } from '../appReducer';

function PurchasePrice({ purchasePrice, dispatch }) {
  return (
    <Row>
      <InputLabel tooltipLabel="The amount you're paying to purchase the property" text="Purchase Price" />
      <Spacer />
      <DebouncedInlineCurrencyInput
        value={purchasePrice}
        onChange={(value) => {
          dispatch({ type: AppAction.UpdatePurchasePrice, value });
        }}
      />
    </Row>
  );
}

PurchasePrice.propTypes = {
  purchasePrice: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default React.memo(
  PurchasePrice,
  (prevProps, nextProps) => prevProps.purchasePrice === nextProps.purchasePrice,
);
