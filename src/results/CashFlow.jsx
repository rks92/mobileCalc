import React, { useEffect, useState } from 'react';
import {
  Divider,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import CurrencyText from '../shared/texts/CurrencyText';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
import { roundNumber } from '../shared/utilities';
import CashFlowChart from './CashFlowChart';

function CashFlow() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [oneYearCashFlow, setOneYearCashFlow] = useState(0);
  const [fiveYearCashFlow, setFiveYearCashFlow] = useState(0);
  const [tenYearCashFlow, setTenYearCashFlow] = useState(0);
  const [years, setYears] = useState([]);

  const {
    monthlyRent,
    vacancy,
    propertyTaxes,
    propertyInsurance,
    hoaFees,
    maintenance,
    utilities,
    propertyManagement,
    otherExpenses,
    downPayment,
    closingCosts,
    rehabCost,
    monthlyPrincipalAndInterest,
    upFrontCashInvestment,
  } = state;

  // Calculating Up-front Cash Investment
  useEffect(() => {
    const value = roundNumber(downPayment + closingCosts + rehabCost);
    dispatch({ type: AppAction.UpdateUpFrontCashInvestment, value });
  }, [downPayment, closingCosts, rehabCost]);

  // Calculating the future values (expenses etc.) for 30 years
  useEffect(() => {
    const calculatedYears = [];

    for (let yearIndex = 0; yearIndex < 30; yearIndex += 1) {
      const year = yearIndex + 1;
      const isTheFirstYear = yearIndex === 0;
      const previousYear = isTheFirstYear ? null : calculatedYears[yearIndex - 1];

      const nextMonthlyRent = isTheFirstYear
        ? monthlyRent
        : roundNumber(previousYear.monthlyRent + previousYear.monthlyRent * 0.03);
      const nextVacancy = isTheFirstYear
        ? vacancy
        : roundNumber(previousYear.vacancy + previousYear.vacancy * 0.05);

      const netRent = roundNumber(nextMonthlyRent + nextVacancy);

      const nextPropertyTaxes = isTheFirstYear
        ? propertyTaxes
        : roundNumber(previousYear.propertyTaxes + previousYear.propertyTaxes * 0.03);
      const nextPropertyInsurance = isTheFirstYear
        ? propertyInsurance
        : roundNumber(previousYear.propertyInsurance + previousYear.propertyInsurance * 0.03);
      const nextHoaFees = isTheFirstYear
        ? hoaFees
        : roundNumber(previousYear.hoaFees + previousYear.hoaFees * 0.03);
      const nextMaintenance = isTheFirstYear
        ? maintenance
        : roundNumber(previousYear.maintenance + previousYear.maintenance * 0.03);
      const nextUtilities = isTheFirstYear
        ? utilities
        : roundNumber(previousYear.utilities + previousYear.utilities * 0.03);
      const nextPropertyManagement = isTheFirstYear
        ? propertyManagement
        : roundNumber(previousYear.propertyManagement + previousYear.propertyManagement * 0.03);

      const netOperatingExpenses = roundNumber(nextPropertyTaxes
          + nextPropertyInsurance
          + nextHoaFees
          + nextMaintenance
          + nextUtilities
          + nextPropertyManagement
          + otherExpenses); // <-- It doesn't grow yearly

      const netOperatingIncome = roundNumber(netRent - netOperatingExpenses);

      const annualMortgage = roundNumber(monthlyPrincipalAndInterest * 12);

      const cashFlowBeforeTaxes = roundNumber(netOperatingIncome + annualMortgage);

      const netCumulativeCashReturn = roundNumber(upFrontCashInvestment + cashFlowBeforeTaxes);

      // Adding the new calculated year
      calculatedYears.push({
        year,
        monthlyRent: nextMonthlyRent,
        vacancy: nextVacancy,
        netRent,
        propertyTaxes: nextPropertyTaxes,
        propertyInsurance: nextPropertyInsurance,
        hoaFees: nextHoaFees,
        maintenance: nextMaintenance,
        utilities: nextUtilities,
        propertyManagement: nextPropertyManagement,
        otherExpenses,
        netOperatingExpenses,
        netOperatingIncome,
        annualMortgage,
        cashFlowBeforeTaxes,
        netCumulativeCashReturn,
      });
    }

    // Updating state after calculations
    setYears(calculatedYears);
    setOneYearCashFlow(calculatedYears[0].cashFlowBeforeTaxes);
    setFiveYearCashFlow(calculatedYears[4].cashFlowBeforeTaxes);
    setTenYearCashFlow(calculatedYears[9].cashFlowBeforeTaxes);
  }, [
    monthlyRent,
    vacancy,
    propertyTaxes,
    propertyInsurance,
    hoaFees,
    maintenance,
    utilities,
    propertyManagement,
    otherExpenses,
    monthlyPrincipalAndInterest,
    upFrontCashInvestment,
  ]);

  return (
    <>
      <CashFlowChart data={years} />
      <SimpleGrid rows={4} spacing="4px" mt={8}>
        <Row>
          <InputLabel tooltipLabel="Up-Front Cash Investment" text="Up-Front Cash Investment" />
          <Spacer />
          <CurrencyText fontSize="lg" text={upFrontCashInvestment.toString()} />
        </Row>
        <Divider color="primary.100" my="12px" />
        <Row>
          <InputLabel tooltipLabel="1 Year Cash Flow" text="1 Year Cash Flow" />
          <Spacer />
          <CurrencyText fontSize="lg" text={oneYearCashFlow.toString()} />
        </Row>
        <Divider color="primary.100" my="12px" />
        <Row>
          <InputLabel tooltipLabel="5 Year Cash Flow" text="5 Year Cash Flow" />
          <Spacer />
          <CurrencyText fontSize="lg" text={fiveYearCashFlow.toString()} />
        </Row>
        <Divider color="primary.100" my="12px" />
        <Row>
          <InputLabel tooltipLabel="10 Year Cash Flow" text="10 Year Cash Flow" />
          <Spacer />
          <CurrencyText fontSize="lg" text={tenYearCashFlow.toString()} />
        </Row>
      </SimpleGrid>
    </>
  );
}

export default CashFlow;
