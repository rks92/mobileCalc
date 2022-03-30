import React, { useEffect } from 'react';
import {
  Divider,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react';
import InputLabel from '../shared/texts/InputLabel';
import SmallCurrencyInput from '../shared/inputs/SmallCurrencyInput';
import Row from '../shared/Row';
import NestedInputLabel from '../shared/texts/NestedInputLabel';
import CurrencyText from '../shared/texts/CurrencyText';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import { getTaxRateMultiplierForState } from '../shared/models';
import { roundNumber } from '../shared/utilities';

function MonthlyCashFlow() {
  const dispatch = useAppDispatch();
  const state = useAppState();

  const {
    vacancy,
    operatingIncome,
    operatingExpenses,
    propertyTaxes,
    propertyInsurance,
    propertyManagement,
    maintenance,
    hoaFees,
    utilities,
    otherExpenses,
    netOperatingIncome,
    cashFlow,
    monthlyRent,
    purchasePrice,
    propertyState,
    monthlyPrincipalAndInterest,
  } = state;

  const loanPayments = monthlyPrincipalAndInterest * -1;

  const updateGrossRent = (value) => dispatch({ type: AppAction.UpdateMonthlyRent, value });
  const updateVacancy = (value) => dispatch({ type: AppAction.UpdateVacancy, value });
  const updateOperatingIncome = (value) => dispatch({
    type: AppAction.UpdateOperatingIncome, value,
  });
  const updateOperatingExpenses = (value) => dispatch({
    type: AppAction.UpdateOperatingExpenses, value,
  });
  const updatePropertyTaxes = (value) => dispatch({ type: AppAction.UpdatePropertyTaxes, value });
  const updatePropertyInsurance = (value) => dispatch({
    type: AppAction.UpdatePropertyInsurance, value,
  });
  const updatePropertyManagement = (value) => dispatch({
    type: AppAction.UpdatePropertyManagement, value,
  });
  const updateMaintenance = (value) => dispatch({ type: AppAction.UpdateMaintenance, value });
  const updateHoaFees = (value) => dispatch({ type: AppAction.UpdateHoaFees, value });
  const updateUtilities = (value) => dispatch({ type: AppAction.UpdateUtilities, value });
  const updateOtherExpenses = (value) => dispatch({ type: AppAction.UpdateOtherExpenses, value });
  const updateNetOperatingIncome = (value) => dispatch({
    type: AppAction.UpdateNetOperatingIncome, value,
  });

  useEffect(() => {
    updateVacancy(monthlyRent * -0.05);
  }, [monthlyRent]);

  useEffect(() => {
    updateOperatingIncome(monthlyRent + vacancy);
  }, [monthlyRent, vacancy]);

  useEffect(() => {
    const sumOfExpenses = propertyTaxes
        + propertyInsurance
        + propertyManagement
        + maintenance
        + hoaFees
        + utilities
        + otherExpenses;
    updateOperatingExpenses(sumOfExpenses * -1);
  }, [
    propertyTaxes,
    propertyInsurance,
    propertyManagement,
    maintenance,
    hoaFees,
    utilities,
    otherExpenses,
  ]);

  useEffect(() => {
    updatePropertyTaxes((purchasePrice * getTaxRateMultiplierForState(propertyState)) / 12);
  }, [purchasePrice, propertyState]);

  // Net Operating Income
  useEffect(() => {
    updateNetOperatingIncome(operatingIncome + operatingExpenses);
  }, [operatingIncome, operatingExpenses]);

  // Cash Flow
  useEffect(() => {
    dispatch({
      type: AppAction.UpdateCashFlow,
      value: roundNumber(netOperatingIncome + loanPayments),
    });
  }, [netOperatingIncome, loanPayments]);

  const divider = <Divider color="primary.100" my="8px" />;
  return (
    <SimpleGrid rows={15} spacing="4px">
      <Row>
        <InputLabel tooltipLabel="Gross Rent" text="Gross Rent" />
        <Spacer />
        <SmallCurrencyInput value={monthlyRent} onChange={updateGrossRent} />
      </Row>
      <Row>
        <InputLabel tooltipLabel="Vacancy" text="Vacancy" />
        <Spacer />
        <SmallCurrencyInput value={vacancy} onChange={updateVacancy} />
      </Row>
      {divider}
      <Row>
        <InputLabel tooltipLabel="Operating Income" text="Operating Income" />
        <Spacer />
        <CurrencyText text={operatingIncome.toString()} />
      </Row>
      <Row mt={3}>
        <InputLabel tooltipLabel="Operating Expenses" text="Operating Expenses" />
        <Spacer />
        <CurrencyText text={operatingExpenses.toString()} />
      </Row>
      <Row mt={2}>
        <NestedInputLabel text="Property Taxes" />
        <Spacer />
        <SmallCurrencyInput value={propertyTaxes} onChange={updatePropertyTaxes} />
      </Row>
      <Row>
        <NestedInputLabel text="Property Insurance" />
        <Spacer />
        <SmallCurrencyInput value={propertyInsurance} onChange={updatePropertyInsurance} />
      </Row>
      <Row>
        <NestedInputLabel text="Property Management" />
        <Spacer />
        <SmallCurrencyInput value={propertyManagement} onChange={updatePropertyManagement} />
      </Row>
      <Row>
        <NestedInputLabel text="Maintenance" />
        <Spacer />
        <SmallCurrencyInput value={maintenance} onChange={updateMaintenance} />
      </Row>
      <Row>
        <NestedInputLabel text="HOA Fees" />
        <Spacer />
        <SmallCurrencyInput value={hoaFees} onChange={updateHoaFees} />
      </Row>
      <Row>
        <NestedInputLabel text="Utilities" />
        <Spacer />
        <SmallCurrencyInput value={utilities} onChange={updateUtilities} />
      </Row>
      <Row>
        <NestedInputLabel text="Other Expenses" />
        <Spacer />
        <SmallCurrencyInput value={otherExpenses} onChange={updateOtherExpenses} />
      </Row>
      {divider}
      <Row>
        <InputLabel tooltipLabel="Net Operating Income" text="Net Operating Income" />
        <Spacer />
        <CurrencyText text={netOperatingIncome.toString()} />
      </Row>
      <Row mt={3}>
        <InputLabel tooltipLabel="Loan Payments" text="Loan Payments" />
        <Spacer />
        <CurrencyText text={loanPayments.toString()} />
      </Row>
      {divider}
      <Row>
        <InputLabel tooltipLabel="Cash Flow" text="Cash Flow" />
        <Spacer />
        <CurrencyText fontSize="lg" text={cashFlow.toString()} />
      </Row>
    </SimpleGrid>
  );
}

export default MonthlyCashFlow;
