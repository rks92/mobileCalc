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
  const [breakEven, setBreakEven] = useState(0);
  const [years, setYears] = useState([]);

  const {
    monthlyRent,
    propertyTaxes,
    propertyInsurance,
    hoaFees,
    maintenance,
    utilities,
    propertyManagement,
    otherExpenses,
    downPayment,
    downPaymentRatio,
    closingCosts,
    rehabCost,
    monthlyPrincipalAndInterest,
    upFrontCashInvestment,
    purchasePrice,
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

      const annualMonthlyRent = isTheFirstYear
        ? monthlyRent * 12
        : roundNumber(previousYear.annualMonthlyRent + previousYear.annualMonthlyRent * 0.03);

      const calculatedVacancy = roundNumber(annualMonthlyRent * 0.05 * -1);

      const netRent = roundNumber(annualMonthlyRent + calculatedVacancy);

      const annualPropertyTaxes = isTheFirstYear
        ? propertyTaxes * 12
        : roundNumber(previousYear.annualPropertyTaxes + previousYear.annualPropertyTaxes * 0.03);

      const annualPropertyInsurance = isTheFirstYear
        ? propertyInsurance * 12
        : roundNumber(
          previousYear.annualPropertyInsurance + previousYear.annualPropertyInsurance * 0.03,
        );

      const annualHoaFees = isTheFirstYear
        ? hoaFees * 12
        : roundNumber(previousYear.annualHoaFees + previousYear.annualHoaFees * 0.03);

      const annualMaintenance = isTheFirstYear
        ? maintenance * 12
        : roundNumber(previousYear.annualMaintenance + previousYear.annualMaintenance * 0.03);

      const annualUtilities = isTheFirstYear
        ? utilities * 12
        : roundNumber(previousYear.annualUtilities + previousYear.annualUtilities * 0.03);

      const annualPropertyManagement = isTheFirstYear
        ? propertyManagement * 12
        : roundNumber(
          previousYear.annualPropertyManagement + previousYear.annualPropertyManagement * 0.03,
        );

      const annualOtherExpenses = otherExpenses * 12;

      const netOperatingExpenses = roundNumber(
        annualPropertyTaxes
          + annualPropertyInsurance
          + annualHoaFees
          + annualMaintenance
          + annualUtilities
          + annualPropertyManagement
          + annualOtherExpenses,
      ); // <-- It doesn't grow yearly

      const netOperatingIncome = roundNumber(netRent - netOperatingExpenses);

      const loanPayments = -1 * monthlyPrincipalAndInterest;

      const annualMortgage = roundNumber(loanPayments * 12);

      const cashFlowBeforeTaxes = roundNumber(netOperatingIncome + annualMortgage);

      const totalInvestment = upFrontCashInvestment * -1;

      const netCumulativeCashReturn = isTheFirstYear
        ? roundNumber(totalInvestment + cashFlowBeforeTaxes)
        : roundNumber(previousYear.netCumulativeCashReturn + cashFlowBeforeTaxes);

      // Adding the new calculated year
      calculatedYears.push({
        year,
        annualMonthlyRent,
        calculatedVacancy,
        netRent,
        annualPropertyTaxes,
        annualPropertyInsurance,
        annualHoaFees,
        annualMaintenance,
        annualUtilities,
        annualPropertyManagement,
        annualOtherExpenses,
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

    let fiveYearCashFlowSum = 0;
    let tenYearCashFlowSum = 0;

    for (let yearIndex = 0; yearIndex < 10; yearIndex += 1) {
      if (yearIndex < 5) {
        fiveYearCashFlowSum += calculatedYears[yearIndex].cashFlowBeforeTaxes;
      }
      tenYearCashFlowSum += calculatedYears[yearIndex].cashFlowBeforeTaxes;
    }

    setFiveYearCashFlow(fiveYearCashFlowSum);
    setTenYearCashFlow(tenYearCashFlowSum);

    const arithmitis = closingCosts + rehabCost + (purchasePrice * downPaymentRatio);
    const paronomastis = calculatedYears[0].cashFlowBeforeTaxes / 12;

    const newBreakEven = Math.floor((arithmitis / paronomastis) / 12);

    setBreakEven(newBreakEven);
  }, [
    monthlyRent,
    propertyTaxes,
    propertyInsurance,
    hoaFees,
    maintenance,
    utilities,
    propertyManagement,
    otherExpenses,
    monthlyPrincipalAndInterest,
    upFrontCashInvestment,
    downPaymentRatio,
    purchasePrice,
  ]);

  return (
    <>
      <CashFlowChart data={years} breakEven={breakEven} />
      <SimpleGrid rows={4} spacing="4px" mt={8}>
        <Row>
          <InputLabel tooltipLabel="Up-Front Cash Investment" text="Up-Front Cash Investment" />
          <Spacer />
          <CurrencyText fontSize="lg" value={upFrontCashInvestment} />
        </Row>
        <Divider color="primary.100" my="12px" />
        <Row>
          <InputLabel tooltipLabel="1 Year Cash Flow" text="1 Year Cash Flow" />
          <Spacer />
          <CurrencyText fontSize="lg" value={oneYearCashFlow} />
        </Row>
        <Divider color="primary.100" my="12px" />
        <Row>
          <InputLabel tooltipLabel="5 Year Cash Flow" text="5 Year Cash Flow" />
          <Spacer />
          <CurrencyText fontSize="lg" value={fiveYearCashFlow} />
        </Row>
        <Divider color="primary.100" my="12px" />
        <Row>
          <InputLabel tooltipLabel="10 Year Cash Flow" text="10 Year Cash Flow" />
          <Spacer />
          <CurrencyText fontSize="lg" value={tenYearCashFlow} />
        </Row>
      </SimpleGrid>
    </>
  );
}

export default CashFlow;
