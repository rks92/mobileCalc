import React, { useReducer, useState } from 'react';
import {
  ChakraProvider, Collapse, Container,
} from '@chakra-ui/react';
import theme from './theme';
import Settings from './settings/Settings';
import Fonts from './assets/Fonts';
import Section from './shared/enums/Section';
import AnnualCashFlowButton from './AnnualCashFlowButton';
import Results from './results/Results';
import { trigger } from './shared/events';
import useHasTouchScreen from './shared/hooks/useHasTouchScreen';
import { initialState, reducer } from './appReducer';
import CashFlow from './results/CashFlow';
import MonthlyExpenses from './results/MonthlyExpenses';
import PropertyMetrics from './results/PropertyMetrics';

// eslint-disable-next-line react/prop-types
function PageContainer({ children }) {
  return (
    <Container
      h={`calc(${window.innerHeight}px - 72px)`}
      overflow="auto"
      paddingBottom="1rem"
      css={{
        '&::-webkit-scrollbar': {
          width: '17px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#c1c1c1',
          borderRadius: '20px',
          border: '5px solid transparent',
          backgroundClip: 'content-box',
        },
      }}
    >
      {children}
    </Container>
  );
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [section, setSection] = useState(Section.Settings);
  const hasTouchScreen = useHasTouchScreen();
  const handleToggle = () => {
    if (hasTouchScreen) trigger('popover:close'); // For some reason it doesnt triggers the onTouchStart event

    const newSection = section === Section.Settings ? Section.Results : Section.Settings;
    setSection(newSection);
  };
  const handleTouchStart = (event) => {
    if (event.target.closest('div[role="tooltip"]')) return;
    if (hasTouchScreen) trigger('popover:close');
  };

  const cashFlow = (
    <CashFlow
      closingCosts={state.closingCosts}
      dispatch={dispatch}
      purchasePrice={state.purchasePrice}
      propertyInsurance={state.propertyInsurance}
      monthlyRent={state.monthlyRent}
      propertyTaxes={state.propertyTaxes}
      downPayment={state.downPayment}
      downPaymentRatio={state.downPaymentRatio}
      hoaFees={state.hoaFees}
      maintenance={state.maintenance}
      monthlyPrincipalAndInterest={state.monthlyPrincipalAndInterest}
      otherExpenses={state.otherExpenses}
      propertyManagement={state.propertyManagement}
      upFrontCashInvestment={state.upFrontCashInvestment}
      utilities={state.utilities}
      rehabCost={state.rehabCost}
    />
  );

  const monthlyExpenses = (
    <MonthlyExpenses
      utilities={state.utilities}
      propertyManagement={state.propertyManagement}
      monthlyPrincipalAndInterest={state.monthlyPrincipalAndInterest}
      otherExpenses={state.otherExpenses}
      maintenance={state.maintenance}
      hoaFees={state.hoaFees}
      propertyTaxes={state.propertyTaxes}
      propertyInsurance={state.propertyInsurance}
    />
  );

  const propertyMetrics = (
    <PropertyMetrics
      operatingExpenses={state.operatingExpenses}
      monthlyRent={state.monthlyRent}
      vacancy={state.vacancy}
      netOperatingIncome={state.netOperatingIncome}
      upFrontCashInvestment={state.upFrontCashInvestment}
      annualCashFlow={state.annualCashFlow}
      afterRepairValue={state.afterRepairValue}
      purchasePrice={state.purchasePrice}
    />
  );

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Collapse
        in={section === Section.Settings}
        onTouchStart={handleTouchStart}
      >
        <PageContainer>
          <Settings
            dispatch={dispatch}
            vacancy={state.vacancy}
            operatingIncome={state.operatingIncome}
            operatingExpenses={state.operatingExpenses}
            propertyTaxes={state.propertyTaxes}
            propertyInsurance={state.propertyInsurance}
            propertyManagement={state.propertyManagement}
            maintenance={state.maintenance}
            hoaFees={state.hoaFees}
            utilities={state.utilities}
            otherExpenses={state.otherExpenses}
            netOperatingIncome={state.netOperatingIncome}
            cashFlow={state.cashFlow}
            monthlyRent={state.monthlyRent}
            purchasePrice={state.purchasePrice}
            propertyState={state.propertyState}
            monthlyPrincipalAndInterest={state.monthlyPrincipalAndInterest}
            interestRate={state.interestRate}
            lengthOfLoan={state.lengthOfLoan}
            downPayment={state.downPayment}
            downPaymentRatio={state.downPaymentRatio}
            loan={state.loan}
            loanRatio={state.loanRatio}
            closingCosts={state.closingCosts}
            rehabCost={state.rehabCost}
            afterRepairValue={state.afterRepairValue}
          />
        </PageContainer>
      </Collapse>
      <AnnualCashFlowButton
        selectedSection={section}
        onToggle={handleToggle}
        annualCashFlow={state.annualCashFlow}
        cashFlow={state.cashFlow}
        dispatch={dispatch}
      />
      <Collapse in={section === Section.Results} onTouchStart={handleTouchStart}>
        <PageContainer>
          <Results
            cashFlow={cashFlow}
            monthlyExpenses={monthlyExpenses}
            propertyMetrics={propertyMetrics}
          />
        </PageContainer>
      </Collapse>
    </ChakraProvider>
  );
}

export default App;
