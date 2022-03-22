import React, { useReducer } from 'react';

const defaultState = {
  // Load Details
  purchasePrice: 0,
  monthlyRent: 0,
  downPayment: 0,
  loan: 0,
  interestRate: 0,
  monthlyPrincipalAndInterest: 0,
  closingCost: 0,
  rehabCost: 0,
  afterRepairValue: 0,
  propertyState: 'Alaska',
  // Monthly Cash Flow
  grossRent: 0,
  vacancy: 0,
  operatingIncome: 0, // Readonly
  operatingExpenses: 0, // Readonly
  propertyTaxes: 0,
  propertyInsurance: 0,
  propertyManagement: 0,
  maintenance: 0,
  hoaFees: 0,
  utilities: 0,
  otherExpenses: 0,
  netOperatingIncome: 0, // Readonly
  loanPayments: 0, // Readonly
  cashFlow: 0, // Readonly
  annualCashFlow: 0, // Readonly, the same with cashFlow?
  // Cash Flow
  upFrontCashInvestment: 0, // Readonly
  oneYearCashFlow: 0, // Readonly
  fiveYearCashFlow: 0, // Readonly
  tenYearCashFlow: 0, // Readonly
  // Monthly Expenses
  totalMonthlyExpenses: 0, // Readonly
  // Property Metrics
  annualNOI: 0, // Readonly
  CashOnCashReturn: 0, // Readonly
  CapRate: 0, // Readonly
  fiftyPercentRule: 0, // Readonly
  onePercentRule: 0, // Readonly
};

const CalculationAction = {
  UpdatePurchasePrice: 'calculation/updatePurchasePrice',
  UpdateMonthlyRent: 'calculation/updateMonthlyRent',
  UpdateDownPayment: 'calculation/updateDownPayment',
  UpdateLoan: 'calculation/updateLoan',
  UpdateInterestRate: 'calculation/updateInterestRate',
  UpdateMonthlyPrincipalAndInterest: 'calculation/updateMonthlyPrincipalAndInterest',
  UpdateClosingCost: 'calculation/updateClosingCost',
  UpdateRehabCost: 'calculation/updateRehabCost',
  UpdateAfterRepairValue: 'calculation/updateAfterRepairValue',
  UpdatePropertyState: 'calculation/updatePropertyState',
  UpdateGrossRent: 'calculation/updateGrossRent',
  UpdateVacancy: 'calculation/updateVacancy',
  UpdatePropertyTaxes: 'calculation/updatePropertyTaxes',
  UpdatePropertyInsurance: 'calculation/updatePropertyInsurance',
  UpdatePropertyManagement: 'calculation/updatePropertyManagement',
  UpdateMaintenance: 'calculation/updateMaintenance',
  UpdateHoaFees: 'calculation/updateHoaFees',
  UpdateUtilities: 'calculation/updateUtilities',
  UpdateOtherExpenses: 'calculation/updateOtherExpenses',
};

const CalculationReducer = (state, action) => {
  switch (action.type) {
    case CalculationAction.UpdatePurchasePrice: {
      return { ...state, purchasePrice: action.data };
    }

    case CalculationAction.UpdateMonthlyRent: {
      return { ...state, monthlyRent: action.data };
    }

    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
};

const CalculationStateContext = React.createContext(undefined);
CalculationStateContext.displayName = 'CalculationStateContext';
const CalculationDispatchContext = React.createContext(undefined);

// eslint-disable-next-line react/prop-types
function CalculationProvider({ children }) {
  const [state, dispatch] = useReducer(CalculationReducer, defaultState);

  return (
    <CalculationStateContext.Provider value={state}>
      <CalculationDispatchContext.Provider value={dispatch}>
        {children}
      </CalculationDispatchContext.Provider>
    </CalculationStateContext.Provider>
  );
}

const useCalculationState = () => {
  const context = React.useContext(CalculationStateContext);
  if (context === undefined) {
    throw new Error('useCalculationState must be used within a CalculationProvider');
  }
  return context;
};

const useCalculationDispatch = () => {
  const context = React.useContext(CalculationDispatchContext);
  if (context === undefined) {
    throw new Error('useCalculationDispatch must be used within a CalculationProvider');
  }
  return context;
};

export {
  CalculationProvider, useCalculationState, useCalculationDispatch, CalculationAction,
};
