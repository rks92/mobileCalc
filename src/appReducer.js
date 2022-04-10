import { roundNumber } from './shared/utilities';

export const initialState = {
  purchasePrice: 100_000,
  monthlyRent: 1000,
  downPayment: 20_000,
  downPaymentRatio: 0.2,
  loan: 80_000,
  loanRatio: 0.8,
  interestRate: 4.5,
  lengthOfLoan: 30,
  monthlyPrincipalAndInterest: 0,
  closingCosts: 0,
  rehabCost: 0,
  afterRepairValue: 0,
  propertyState: 'Ohio',
  vacancy: 0,
  operatingIncome: 0,
  operatingExpenses: 0,
  propertyTaxes: 0,
  propertyInsurance: 120,
  propertyManagement: 0,
  maintenance: 50,
  hoaFees: 0,
  utilities: 0,
  otherExpenses: 0,
  netOperatingIncome: 0,
  cashFlow: 0,
  annualCashFlow: 0,
  upFrontCashInvestment: 0,
};

export const AppAction = {
  UpdatePurchasePrice: 'app/updatePurchasePrice',
  UpdateMonthlyRent: 'app/updateMonthlyRent',
  UpdateDownPayment: 'app/updateDownPayment',
  UpdateLoan: 'app/updateLoan',
  UpdateInterestRate: 'app/updateInterestRate',
  UpdateLengthOfLoan: 'app/updateLengthOfLoan',
  UpdateMonthlyPrincipalAndInterest: 'app/updateMonthlyPrincipalAndInterest',
  UpdateClosingCosts: 'app/updateClosingCosts',
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
  UpdateUpFrontCashInvestment: 'app/upFrontCashInvestment',
};

export const reducer = (state, action) => {
  if (!('value' in action)) {
    console.error('Action is missing "value" property!');
  }

  switch (action.type) {
    case AppAction.UpdatePurchasePrice: {
      return {
        ...state,
        purchasePrice: action.value,
        downPayment: roundNumber(action.value * state.downPaymentRatio),
        loan: roundNumber(action.value * state.loanRatio),
      };
    }

    case AppAction.UpdateMonthlyRent: {
      return { ...state, monthlyRent: action.value };
    }

    case AppAction.UpdateDownPayment: {
      let update = {};
      if (action.value >= state.purchasePrice) {
        update = {
          downPayment: action.value,
          purchasePrice: action.value,
          downPaymentRatio: 1,
          loan: 0,
          loanRatio: 0,
        };
      } else {
        update = {
          downPaymentRatio: roundNumber(action.value / state.purchasePrice),
          downPayment: action.value,
          loan: state.purchasePrice - action.value,
          loanRatio: roundNumber((state.purchasePrice - action.value) / state.purchasePrice),
        };
      }
      return { ...state, ...update };
    }

    case AppAction.UpdateLoan: {
      let update = {};
      if (action.value >= state.purchasePrice) {
        update = {
          loan: action.value,
          purchasePrice: action.value,
          loanRatio: 1,
          downPayment: 0,
          downPaymentRatio: 0,
        };
      } else {
        update = {
          loanRatio: roundNumber(action.value / state.purchasePrice),
          loan: action.value,
          downPayment: state.purchasePrice - action.value,
          downPaymentRatio: roundNumber((state.purchasePrice - action.value) / state.purchasePrice),
        };
      }
      return { ...state, ...update };
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

    case AppAction.UpdateClosingCosts: {
      return { ...state, closingCosts: action.value };
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

    case AppAction.UpdateUpFrontCashInvestment: {
      return { ...state, upFrontCashInvestment: action.value };
    }

    default: {
      const errorMessage = action?.type ?? 'Unknown action type in AppContext. Possibly action object is null or undefined';
      throw new Error(`Unhandled action type: ${errorMessage}`);
    }
  }
};
