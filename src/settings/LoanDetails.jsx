import React, { useEffect } from 'react';
import {
  NumberInput,
  NumberInputField,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import InputLabel from '../shared/texts/InputLabel';
import Row from '../shared/Row';
import SmallCurrencyInput from '../shared/inputs/SmallCurrencyInput';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import AdvancedOptions from './AdvancedOptions';
import LengthOfLoanInput from './LengthOfLoanInput';
import CurrencyText from '../shared/texts/CurrencyText';
import { pmt, roundNumber } from '../shared/utilities';

function LoanDetails({
  downPaymentRatio, setDownPaymentRatio, loanRatio, setLoanRatio,
}) {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const {
    purchasePrice,
    downPayment,
    loan,
    interestRate,
    lengthOfLoan,
    monthlyPrincipalAndInterest,
  } = state;

  useEffect(() => {
    const newDownPaymentRatio = downPayment / purchasePrice;
    setDownPaymentRatio(newDownPaymentRatio);
    const newLoanRatio = loan / purchasePrice;
    setLoanRatio(newLoanRatio);
  }, []);

  const updatePurchasePrice = (value) => {
    dispatch({ type: AppAction.UpdatePurchasePrice, value });
    const newDownPayment = roundNumber(purchasePrice * downPaymentRatio);
    dispatch({ type: AppAction.UpdateDownPayment, value: newDownPayment });
    const newLoan = roundNumber(purchasePrice * loanRatio);
    dispatch({ type: AppAction.UpdateLoan, value: newLoan });
  };

  const updateDownPayment = (value) => {
    if (value >= purchasePrice) {
      dispatch({ type: AppAction.UpdateDownPayment, value });
      dispatch({ type: AppAction.UpdatePurchasePrice, value });
      setDownPaymentRatio(1);
      dispatch({ type: AppAction.UpdateLoan, value: 0 });
      setLoanRatio(0);
    } else {
      const newDownPaymentRatio = value / purchasePrice;
      setDownPaymentRatio(newDownPaymentRatio);
      const newDownPayment = purchasePrice * newDownPaymentRatio;
      dispatch({ type: AppAction.UpdateDownPayment, value: newDownPayment });
      const newLoan = purchasePrice - value;
      dispatch({ type: AppAction.UpdateLoan, value: newLoan });
      const newLoanRatio = newLoan / purchasePrice;
      setLoanRatio(newLoanRatio);
    }
  };

  const updateLoan = (value) => {
    if (value >= purchasePrice) {
      dispatch({ type: AppAction.UpdateLoan, value });
      dispatch({ type: AppAction.UpdatePurchasePrice, value });
      setLoanRatio(1);
      dispatch({ type: AppAction.UpdateDownPayment, value: 0 });
      setDownPaymentRatio(0);
    } else {
      const newLoanRatio = value / purchasePrice;
      setLoanRatio(newLoanRatio);
      const newLoan = purchasePrice * newLoanRatio;
      dispatch({ type: AppAction.UpdateLoan, value: newLoan });
      const newDownPayment = purchasePrice - value;
      dispatch({ type: AppAction.UpdateDownPayment, value: newDownPayment });
      const newDownPaymentRatio = newDownPayment / purchasePrice;
      setDownPaymentRatio(newDownPaymentRatio);
    }
  };

  const updateInterestRate = (value) => {
    let safeGuardedValue = value;
    if (value > 100) {
      safeGuardedValue = 100;
    }
    if (value === 0) {
      safeGuardedValue = 0.01; // TODO: Confirm that can be zero
    }
    dispatch({ type: AppAction.UpdateInterestRate, value: safeGuardedValue });
  };

  const updateLengthOfLoan = (value) => dispatch({ type: AppAction.UpdateLengthOfLoan, value });

  // Calculating Principal and Interest (monthly)
  useEffect(() => {
    const value = pmt(interestRate, lengthOfLoan, loan, 0);
    dispatch({ type: AppAction.UpdateMonthlyPrincipalAndInterest, value });
  }, [interestRate, lengthOfLoan, loan]);

  return (
    <>
      <SimpleGrid rows={6} spacing="4px">
        <Row>
          <InputLabel tooltipLabel="Purchase Price" text="Purchase Price" />
          <Spacer />
          <SmallCurrencyInput
            value={purchasePrice}
            onChange={updatePurchasePrice}
          />
        </Row>
        <Row>
          <InputLabel tooltipLabel="Down payment" text={`Down payment (${Math.floor(downPaymentRatio * 100)})%`} />
          <Spacer />
          <SmallCurrencyInput
            value={downPayment}
            onChange={updateDownPayment}
          />
        </Row>
        <Row>
          <InputLabel tooltipLabel="Loan" text={`Loan (${Math.floor(loanRatio * 100)})%`} />
          <Spacer />
          <SmallCurrencyInput
            value={loan}
            onChange={updateLoan}
          />
        </Row>
        <Row>
          <InputLabel tooltipLabel="Interest Rate" text="Interest Rate" />
          <Spacer />
          <NumberInput
            size="sm"
            value={interestRate}
            onChange={(value) => { updateInterestRate(+value); }}
            min={0}
            max={100}
            borderRadius="4px"
            border="1px solid"
            borderColor="neutral.100"
            variant="unstyled"
            style={{
              '--number-input-stepper-width': '1px', // TODO: Find a better way to remove stepper padding
            }}
          >
            <NumberInputField
              border={0} // It is handled by the wrapper above
              outline={0} // It is handled by the wrapper above
              px={2}
              py={1}
              h={8}
              size="sm"
              fontSize="sm"
              fontWeight="medium"
              color="neutral.600"
              maxW="100px"
              textAlign="right"
            />
          </NumberInput>
        </Row>
        <Row>
          <InputLabel tooltipLabel="Length of loan" text="Length of loan" />
          <Spacer />
          <LengthOfLoanInput value={lengthOfLoan} onChange={updateLengthOfLoan} />
        </Row>
        <Row mt={1}>
          <InputLabel tooltipLabel="Monthly Principal & Interest" text="Monthly Principal & Interest" />
          <Spacer />
          <CurrencyText text={monthlyPrincipalAndInterest.toString()} />
        </Row>
      </SimpleGrid>
      <AdvancedOptions />
    </>
  );
}

LoanDetails.propTypes = {
  downPaymentRatio: PropTypes.number.isRequired,
  setDownPaymentRatio: PropTypes.func.isRequired,
  loanRatio: PropTypes.number.isRequired,
  setLoanRatio: PropTypes.func.isRequired,
};

export default LoanDetails;
