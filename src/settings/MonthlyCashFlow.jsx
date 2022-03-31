import React, { useEffect } from 'react';
import {
  Divider,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react';
import InputLabel from '../shared/texts/InputLabel';
import DebouncedInlineCurrencyInput from '../shared/inputs/DebouncedInlineCurrencyInput';
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
        <DebouncedInlineCurrencyInput value={monthlyRent} onChange={updateGrossRent} />
      </Row>
      <Row>
        <InputLabel tooltipLabel="Vacancy" text="Vacancy" />
        <Spacer />
        <DebouncedInlineCurrencyInput value={vacancy} onChange={updateVacancy} />
      </Row>
      {divider}
      <Row>
        <InputLabel tooltipLabel="Operating Income" text="Operating Income" />
        <Spacer />
        <CurrencyText value={operatingIncome} />
      </Row>
      <Row mt={3}>
        <InputLabel tooltipLabel="Operating Expenses" text="Operating Expenses" />
        <Spacer />
        <CurrencyText value={operatingExpenses} />
      </Row>
      <Row mt={2}>
        <NestedInputLabel text="Property Taxes" />
        <Spacer />
        <DebouncedInlineCurrencyInput value={propertyTaxes} onChange={updatePropertyTaxes} />
      </Row>
      <Row>
        <NestedInputLabel text="Property Insurance" />
        <Spacer />
        <DebouncedInlineCurrencyInput
          value={propertyInsurance}
          onChange={updatePropertyInsurance}
        />
      </Row>
      <Row>
        <NestedInputLabel text="Property Management" />
        <Spacer />
        <DebouncedInlineCurrencyInput
          value={propertyManagement}
          onChange={updatePropertyManagement}
        />
      </Row>
      <Row>
        <NestedInputLabel text="Maintenance" />
        <Spacer />
        <DebouncedInlineCurrencyInput value={maintenance} onChange={updateMaintenance} />
      </Row>
      <Row>
        <NestedInputLabel text="HOA Fees" />
        <Spacer />
        <DebouncedInlineCurrencyInput value={hoaFees} onChange={updateHoaFees} />
      </Row>
      <Row>
        <NestedInputLabel text="Utilities" />
        <Spacer />
        <DebouncedInlineCurrencyInput value={utilities} onChange={updateUtilities} />
      </Row>
      <Row>
        <NestedInputLabel text="Other Expenses" />
        <Spacer />
        <DebouncedInlineCurrencyInput value={otherExpenses} onChange={updateOtherExpenses} />
      </Row>
      {divider}
      <Row>
        <InputLabel tooltipLabel="Net Operating Income" text="Net Operating Income" />
        <Spacer />
        <CurrencyText value={netOperatingIncome} />
      </Row>
      <Row mt={3}>
        <InputLabel tooltipLabel="Loan Payments" text="Loan Payments" />
        <Spacer />
        <CurrencyText value={loanPayments} />
      </Row>
      {divider}
      <Row>
        <InputLabel tooltipLabel="Cash Flow" text="Cash Flow" />
        <Spacer />
        <CurrencyText fontSize="lg" value={cashFlow} />
      </Row>
    </SimpleGrid>
  );
}

export default MonthlyCashFlow;
