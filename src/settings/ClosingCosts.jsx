import React, { useEffect, useState } from 'react';
import {
  Spacer,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { roundNumber } from '../shared/utilities';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import DebouncedInlineCurrencyInput from '../shared/inputs/DebouncedInlineCurrencyInput';
import { AppAction } from '../appReducer';

function ClosingCosts({ closingCosts, purchasePrice, dispatch }) {
  const [isManuallyUpdated, setIsManuallyUpdated] = useState(false);

  const updateClosingCosts = (value, isManualUpdate = false) => {
    if (isManualUpdate) {
      setIsManuallyUpdated(true);
    }
    dispatch({ type: AppAction.UpdateClosingCosts, value });
  };

  useEffect(() => {
    if (isManuallyUpdated) {
      return;
    }
    updateClosingCosts(roundNumber(purchasePrice * 0.03));
  }, [purchasePrice]);

  return (
    <Row>
      <InputLabel
        tooltipLabel="We assume closings costs are 3% of total purchase price"
        text="Closing Costs (Purchase)"
      />
      <Spacer />
      <DebouncedInlineCurrencyInput value={closingCosts} onChange={updateClosingCosts} />
    </Row>
  );
}

ClosingCosts.propTypes = {
  closingCosts: PropTypes.number.isRequired,
  purchasePrice: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default React.memo(
  ClosingCosts,
  (prevProps, nextProps) => (
    prevProps.closingCosts === nextProps.closingCosts
      && prevProps.purchasePrice === nextProps.purchasePrice
  ),
);
