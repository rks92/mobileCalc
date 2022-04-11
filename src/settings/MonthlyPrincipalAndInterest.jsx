import React, { useEffect } from 'react';
import { Spacer } from '@chakra-ui/react';
import * as PropTypes from 'prop-types';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import CurrencyText from '../shared/texts/CurrencyText';
import { pmt, roundNumber } from '../shared/utilities';
import { AppAction } from '../appReducer';

function MonthlyPrincipalAndInterest({
  interestRate, lengthOfLoan, loan, dispatch, monthlyPrincipalAndInterest,
}) {
  // Calculating Principal and Interest (monthly)
  useEffect(() => {
    dispatch({
      type: AppAction.UpdateMonthlyPrincipalAndInterest,
      value: roundNumber(pmt(interestRate, lengthOfLoan, loan, 0)),
    });
  }, [interestRate, lengthOfLoan, loan]);

  return (
    <Row mt={1}>
      <InputLabel
        tooltipLabel="Total principal and interest required to repay your loan (excludes escrow)"
        text="Monthly Principal & Interest"
      />
      <Spacer />
      <CurrencyText value={monthlyPrincipalAndInterest} maximumFractionDigits={0} />
    </Row>
  );
}

MonthlyPrincipalAndInterest.propTypes = {
  interestRate: PropTypes.number.isRequired,
  lengthOfLoan: PropTypes.number.isRequired,
  loan: PropTypes.number.isRequired,
  monthlyPrincipalAndInterest: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default React.memo(
  MonthlyPrincipalAndInterest,
  (prevProps, nextProps) => (
    prevProps.interestRate === nextProps.interestRate
    && prevProps.lengthOfLoan === nextProps.lengthOfLoan
    && prevProps.loan === nextProps.loan
    && prevProps.monthlyPrincipalAndInterest === nextProps.monthlyPrincipalAndInterest
  ),
);
