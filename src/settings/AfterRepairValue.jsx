import React from 'react';
import { Spacer } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import DebouncedInlineCurrencyInput from '../shared/inputs/DebouncedInlineCurrencyInput';
import { AppAction } from '../appReducer';

function AfterRepairValue({ afterRepairValue, dispatch }) {
  const onChange = (value) => dispatch({
    type: AppAction.UpdateAfterRepairValue,
    value,
  });

  return (
    <Row>
      <InputLabel
        tooltipLabel="The estimated market value of the property after its rehab is complete"
        text="After Repair Value "
      />
      <Spacer />
      <DebouncedInlineCurrencyInput value={afterRepairValue} onChange={onChange} />
    </Row>
  );
}

AfterRepairValue.propTypes = {
  afterRepairValue: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default React.memo(
  AfterRepairValue,
  (prevProps, nextProps) => prevProps.afterRepairValue === nextProps.afterRepairValue,
);
