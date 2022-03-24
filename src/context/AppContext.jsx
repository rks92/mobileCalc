import React, { useReducer } from 'react';

const defaultState = {
  // Load Details --------------------------------------------------------------------------------
  purchasePrice: 100_000,
  monthlyRent: 1000,
  downPayment: 20_000,
  loan: 80_000,
  interestRate: 4.5,
  lengthOfLoan: 30,
  // `loanPayments` is the same, usually it's `monthlyPrincipalAndInterest` * -1
  monthlyPrincipalAndInterest: 0,
  closingCost: 0, // `purchasePrice` * 0,03 (3%) < -- assumption user can edit, saad
  rehabCost: 0,
  afterRepairValue: 0, // `purchasePrice` + `rehabCost`
  propertyState: 'Ohio', // in expences (`propertyTaxes` * interest rate of state) / 12
  // Monthly Cash Flow --------------------------------------------------------------------------------
  vacancy: 0, // -(`grossRent` * 0,05 (5%)) (should be negative)
  operatingIncome: 0, // Readonly, `grossRent` + `vacancyRate`
  operatingExpenses: 0, // Readonly, -(`propertyTaxes` + `propertyInsurance` + `propertyManagement` + `maintenance` + `hoaFees` + `utilities` + `otherExpenses`) (should be negative)
  propertyTaxes: 0,
  propertyInsurance: 120,
  propertyManagement: 0,
  maintenance: 50,
  hoaFees: 0,
  utilities: 0,
  otherExpenses: 0,
  netOperatingIncome: 0, // Readonly, `operatingIncome` + `operatingExpenses`
  cashFlow: 0, // Readonly, `netOperatingIncome` + `loanPayments`
  annualCashFlow: 0, // Readonly, --> `cashFlow` * 12
  // Cash Flow --------------------------------------------------------------------------------
  upFrontCashInvestment: 0, // Readonly,
  oneYearCashFlow: 0, // Readonly,
  fiveYearCashFlow: 0, // Readonly,
  tenYearCashFlow: 0, // Readonly,
  // Monthly Expenses --------------------------------------------------------------------------------
  totalMonthlyExpenses: 0, // Readonly, sum of all expenses
  // Property Metrics --------------------------------------------------------------------------------
  annualNOI: 0, // Readonly
  CashOnCashReturn: 0, // Readonly --> `annualCashFlow` / `upFrontCashInvestment`
  CapRate: 0, // Readonly, --> `annualNOI`/ (to megalurto apo `purchasePrice` kai `afterRepairValue`)
  fiftyPercentRule: 0, // Readonly
  onePercentRule: 0, // Readonly, `purchasePrice` / `grossRent` an einai > 1% einai green
};

const AppAction = {
  UpdatePurchasePrice: 'app/updatePurchasePrice',
  UpdateMonthlyRent: 'app/updateMonthlyRent',
  UpdateDownPayment: 'app/updateDownPayment',
  UpdateLoan: 'app/updateLoan',
  UpdateInterestRate: 'app/updateInterestRate',
  UpdateLengthOfLoan: 'app/updateLengthOfLoan',
  UpdateMonthlyPrincipalAndInterest: 'app/updateMonthlyPrincipalAndInterest',
  UpdateClosingCost: 'app/updateClosingCost',
  UpdateRehabCost: 'app/updateRehabCost',
  UpdateAfterRepairValue: 'app/updateAfterRepairValue',
  UpdatePropertyState: 'app/updatePropertyState',
  UpdateVacancy: 'app/updateVacancy',
  UpdateOperatingIncome: 'app/updateOperatingIncome',
  UpdateOperatingExpenses: 'app/updateOperatingExpenses',
  UpdatePropertyTaxes: 'app/updatePropertyTaxes',
  UpdatePropertyInsurance: 'app/updatePropertyInsurance',
  UpdatePropertyManagement: 'app/updatePropertyManagement',
  UpdateMaintenance: 'app/updateMaintenance',
  UpdateHoaFees: 'app/updateHoaFees',
  UpdateUtilities: 'app/updateUtilities',
  UpdateOtherExpenses: 'app/updateOtherExpenses',
  UpdateNetOperatingIncome: 'app/updateNetOperatingIncome',
  UpdateCashFlow: 'app/updateCashFlow',
  UpdateAnnualCashFlow: 'app/updateAnnualCashFlow',
};

const AppReducer = (state, action) => {
  if (!('value' in action)) {
    console.error('Action is missing "value" property!');
  }

  switch (action.type) {
    case AppAction.UpdatePurchasePrice: {
      return { ...state, purchasePrice: action.value };
    }

    case AppAction.UpdateMonthlyRent: {
      return { ...state, monthlyRent: action.value };
    }

    case AppAction.UpdateDownPayment: {
      return { ...state, downPayment: action.value };
    }

    case AppAction.UpdateLoan: {
      return { ...state, loan: action.value };
    }

    case AppAction.UpdateInterestRate: {
      return { ...state, interestRate: action.value };
    }

    case AppAction.UpdateLengthOfLoan: {
      return { ...state, lengthOfLoan: action.value };
    }

    case AppAction.UpdateMonthlyPrincipalAndInterest: {
      return { ...state, monthlyPrincipalAndInterest: action.value };
    }

    case AppAction.UpdateClosingCost: {
      return { ...state, closingCost: action.value };
    }

    case AppAction.UpdateRehabCost: {
      return { ...state, rehabCost: action.value };
    }

    case AppAction.UpdateAfterRepairValue: {
      return { ...state, afterRepairValue: action.value };
    }

    case AppAction.UpdatePropertyState: {
      return { ...state, propertyState: action.value };
    }

    case AppAction.UpdateVacancy: {
      return { ...state, vacancy: action.value };
    }

    case AppAction.UpdateOperatingIncome: {
      return { ...state, operatingIncome: action.value };
    }

    case AppAction.UpdateOperatingExpenses: {
      return { ...state, operatingExpenses: action.value };
    }

    case AppAction.UpdatePropertyTaxes: {
      return { ...state, propertyTaxes: action.value };
    }

    case AppAction.UpdatePropertyInsurance: {
      return { ...state, propertyInsurance: action.value };
    }

    case AppAction.UpdatePropertyManagement: {
      return { ...state, propertyManagement: action.value };
    }

    case AppAction.UpdateMaintenance: {
      return { ...state, maintenance: action.value };
    }

    case AppAction.UpdateHoaFees: {
      return { ...state, hoaFees: action.value };
    }

    case AppAction.UpdateUtilities: {
      return { ...state, utilities: action.value };
    }

    case AppAction.UpdateOtherExpenses: {
      return { ...state, otherExpenses: action.value };
    }

    case AppAction.UpdateNetOperatingIncome: {
      return { ...state, netOperatingIncome: action.value };
    }

    case AppAction.UpdateCashFlow: {
      return { ...state, cashFlow: action.value };
    }

    case AppAction.UpdateAnnualCashFlow: {
      return { ...state, annualCashFlow: action.value };
    }

    default: {
      const errorMessage = action?.type ?? 'Unknown action type in AppContext. Possibly action object is null or undefined';
      throw new Error(`Unhandled action type: ${errorMessage}`);
    }
  }
};

const AppStateContext = React.createContext(undefined);
AppStateContext.displayName = 'AppStateContext';
const AppDispatchContext = React.createContext(undefined);

// eslint-disable-next-line react/prop-types
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(AppReducer, defaultState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

const useAppState = () => {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider');
  }
  return context;
};

const useAppDispatch = () => {
  const context = React.useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a AppProvider');
  }
  return context;
};

export {
  AppProvider, useAppState, useAppDispatch, AppAction,
};
