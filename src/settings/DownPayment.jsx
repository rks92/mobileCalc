import React from 'react';
import { Spacer } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import DebouncedInlineCurrencyInput from '../shared/inputs/DebouncedInlineCurrencyInput';
import { AppAction } from '../appReducer';

function DownPayment({ downPaymentRatio, downPayment, dispatch }) {
  return (
    <Row>
      <InputLabel
        tooltipLabel="The amount of cash you are investing (less 80% loan)"
        text={`Down payment (${Math.floor(downPaymentRatio * 100)})%`}
      />
      <Spacer />
      <DebouncedInlineCurrencyInput
        value={downPayment}
        onChange={(value) => {
          dispatch({ type: AppAction.UpdateDownPayment, value });
        }}
      />
    </Row>
  );
}

DownPayment.propTypes = {
  downPaymentRatio: PropTypes.number.isRequired,
  downPayment: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default DownPayment;
