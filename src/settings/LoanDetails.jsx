import React, { useEffect } from 'react';
import {
  NumberInput,
  NumberInputField,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react';
import InputLabel from '../shared/texts/InputLabel';
import Row from '../shared/Row';
import SmallCurrencyInput from '../shared/inputs/SmallCurrencyInput';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import AdvancedOptions from './AdvancedOptions';
import LengthOfLoanInput from './LengthOfLoanInput';
import CurrencyText from '../shared/texts/CurrencyText';
import { pmt, roundNumber } from '../shared/utilities';

function LoanDetails() {
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

  const updatePurchasePrice = (value) => dispatch({ type: AppAction.UpdatePurchasePrice, value });
  const updateDownPayment = (value) => dispatch({ type: AppAction.UpdateDownPayment, value });
  const updateLoan = (value) => dispatch({ type: AppAction.UpdateLoan, value });
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

  const getPercentage = (part, total) => (total === 0 ? 0 : roundNumber(part / total));

  useEffect(() => {
    const previousPurchasePrice = downPayment + loan;
    const downPaymentPercentage = getPercentage(downPayment, previousPurchasePrice);
    const loanPercentage = getPercentage(loan, previousPurchasePrice);

    updateDownPayment(roundNumber(purchasePrice * downPaymentPercentage));
    updateLoan(roundNumber(purchasePrice * loanPercentage));
  }, [purchasePrice, downPayment, loan]);

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
          <InputLabel tooltipLabel="Down payment" text={`Down payment (${getPercentage(downPayment, purchasePrice) * 100})%`} />
          <Spacer />
          <SmallCurrencyInput
            value={downPayment}
            onChange={updateDownPayment}
          />
        </Row>
        <Row>
          <InputLabel tooltipLabel="Loan" text={`Loan (${getPercentage(loan, purchasePrice) * 100})%`} />
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
            precision={2}
            step={0.5}
            min={0.01}
            max={100}
          >
            <NumberInputField
              border="1px solid"
              borderColor="neutral.100"
              borderRadius="4px"
              fontSize="sm"
              fontWeight="medium"
              color="neutral.600"
              maxW="98px"
            />
          </NumberInput>
        </Row>
        <Row>
          <InputLabel tooltipLabel="Length of loan" text="Length of loan" />
          <Spacer />
          <LengthOfLoanInput value={lengthOfLoan} onChange={updateLengthOfLoan} />
        </Row>
        <Row mt="4px">
          <InputLabel tooltipLabel="Monthly Principal & Interest" text="Monthly Principal & Interest" />
          <Spacer />
          <CurrencyText text={monthlyPrincipalAndInterest.toString()} />
        </Row>
      </SimpleGrid>
      <AdvancedOptions />
    </>
  );
}

export default LoanDetails;
