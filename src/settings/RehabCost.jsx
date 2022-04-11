import React, { useEffect } from 'react';
import {
  Spacer,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import DebouncedInlineCurrencyInput from '../shared/inputs/DebouncedInlineCurrencyInput';
import { AppAction } from '../appReducer';

function RehabCost({ rehabCost, purchasePrice, dispatch }) {
  const onChange = (value) => dispatch({ type: AppAction.UpdateRehabCost, value });

  const updateAfterRepairValue = (value) => dispatch({
    type: AppAction.UpdateAfterRepairValue,
    value,
  });

  useEffect(() => {
    // Rehab cost should be set
    if (rehabCost > 0) {
      updateAfterRepairValue(purchasePrice + rehabCost);
    } else {
      updateAfterRepairValue(0);
    }
  }, [purchasePrice, rehabCost]);

  return (
    <Row>
      <InputLabel
        tooltipLabel="The amount required to do repairs to get the property rental ready"
        text="Rehab Cost"
      />
      <Spacer />
      <DebouncedInlineCurrencyInput value={rehabCost} onChange={onChange} />
    </Row>
  );
}

RehabCost.propTypes = {
  rehabCost: PropTypes.number.isRequired,
  purchasePrice: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default React.memo(
  RehabCost,
  (prevProps, nextProps) => (
    prevProps.rehabCost === nextProps.rehabCost
      && prevProps.purchasePrice === nextProps.purchasePrice
  ),
);
