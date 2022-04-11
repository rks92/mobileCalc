import React from 'react';
import { Spacer } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import DebouncedInlineCurrencyInput from '../shared/inputs/DebouncedInlineCurrencyInput';
import { AppAction } from '../appReducer';

function Loan({ loanRatio, loan, dispatch }) {
  return (
    <Row>
      <InputLabel
        tooltipLabel="The portion of the property's purchase price that is being financed"
        text={`Loan (${Math.floor(loanRatio * 100)})%`}
      />
      <Spacer />
      <DebouncedInlineCurrencyInput
        value={loan}
        onChange={(value) => {
          dispatch({ type: AppAction.UpdateLoan, value });
        }}
      />
    </Row>
  );
}

Loan.propTypes = {
  loanRatio: PropTypes.number.isRequired,
  loan: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default React.memo(
  Loan,
  (prevProps, nextProps) => (
    prevProps.loanRatio === nextProps.loanRatio
      && prevProps.loan === nextProps.loan
  ),
);
