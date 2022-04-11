import React, { useEffect } from 'react';
import {
  Box,
  Divider,
  Flex,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react';
import * as PropTypes from 'prop-types';
import PurchasePrice from './PurchasePrice';
import DownPayment from './DownPayment';
import Loan from './Loan';
import InterestRate from './InterestRate';
import LengthOfLoan from './LengthOfLoan';
import MonthlyPrincipalAndInterest from './MonthlyPrincipalAndInterest';
import ClosingCosts from './ClosingCosts';
import RehabCost from './RehabCost';
import AfterRepairValue from './AfterRepairValue';
import PropertyState from './PropertyState';
import GrossRent from './GrossRent';
import Vacancy from './Vacancy';
import OperatingIncome from './OperatingIncome';
import { getTaxRateMultiplierForState } from '../shared/models';
import { roundNumber } from '../shared/utilities';
import OperatingExpenses from './OperatingExpenses';
import PropertyTaxes from './PropertyTaxes';
import PropertyInsurance from './PropertyInsurance';
import PropertyManagement from './PropertyManagement';
import Maintenance from './Maintenance';
import HoaFees from './HoaFees';
import Utilities from './Utilities';
import OtherExpenses from './OtherExpenses';
import NetOperatingIncome from './NetOperatingIncome';
import LoanPayments from './LoanPayments';
import CashFlow from './CashFlow';
import Sliders from './sliders/Sliders';
import { AppAction } from '../appReducer';

function Settings({
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
  interestRate,
  lengthOfLoan,
  loan,
  loanRatio,
  downPayment,
  downPaymentRatio,
  closingCosts,
  rehabCost,
  afterRepairValue,
  dispatch,
}) {
  const loanPayments = monthlyPrincipalAndInterest * -1;

  useEffect(() => {
    dispatch({ type: AppAction.UpdateVacancy, value: monthlyRent * -0.05 });
  }, [monthlyRent]);

  useEffect(() => {
    dispatch({
      type: AppAction.UpdateOperatingIncome, value: monthlyRent + vacancy,
    });
  }, [monthlyRent, vacancy]);

  useEffect(() => {
    const sumOfExpenses = propertyTaxes
        + propertyInsurance
        + propertyManagement
        + maintenance
        + hoaFees
        + utilities
        + otherExpenses;
    dispatch({
      type: AppAction.UpdateOperatingExpenses, value: sumOfExpenses * -1,
    });
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
    dispatch({
      type: AppAction.UpdatePropertyTaxes,
      value: (purchasePrice * getTaxRateMultiplierForState(propertyState)) / 12,
    });
  }, [purchasePrice, propertyState]);

  // Net Operating Income
  useEffect(() => {
    dispatch({
      type: AppAction.UpdateNetOperatingIncome, value: operatingIncome + operatingExpenses,
    });
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
    <SimpleGrid rows={3} spacing={5} mt={6}>
      <VisuallyHidden>v1.1</VisuallyHidden>
      <Sliders dispatch={dispatch} />
      <Flex
        alignContent="center"
        alignItems="center"
        justifyContent="flex-start"
        flexWrap="nowrap"
        flexDirection="row"
      >
        <Text
          whiteSpace="nowrap"
          fontSize="md"
          color="primary.700"
          fontWeight="normal"
        >
          Advanced Settings
        </Text>
        <Divider ml={3} color="primary.100" />
      </Flex>
      <Tabs variant="unstyled">
        <TabList>
          <Tab
            color="neutral.400"
            borderRadius="4px 0px 0px 4px"
            border="1px"
            borderColor="neutral.100"
            fontSize="sm"
            fontWeight="medium"
            _selected={{
              color: 'primary.500',
              bg: 'primary.100',
              borderColor: 'primary.100',
            }}
          >
            Loan Details
          </Tab>
          <Tab
            color="neutral.400"
            borderRadius="0px 4px 4px 0px"
            border="1px"
            borderColor="neutral.100"
            fontSize="sm"
            fontWeight="medium"
            _selected={{
              color: 'primary.500',
              bg: 'primary.100',
              borderColor: 'primary.100',
            }}
          >
            Monthly Cash Flow
          </Tab>
        </TabList>
        <TabPanels mt={7}>
          <TabPanel p={0}>
            <SimpleGrid rows={6} spacing="4px">
              <PurchasePrice purchasePrice={purchasePrice} dispatch={dispatch} />
              <DownPayment
                dispatch={dispatch}
                downPaymentRatio={downPaymentRatio}
                downPayment={downPayment}
              />
              <Loan dispatch={dispatch} loan={loan} loanRatio={loanRatio} />
              <InterestRate dispatch={dispatch} interestRate={interestRate} />
              <LengthOfLoan dispatch={dispatch} lengthOfLoan={lengthOfLoan} />
              <MonthlyPrincipalAndInterest
                interestRate={interestRate}
                lengthOfLoan={lengthOfLoan}
                loan={loan}
                monthlyPrincipalAndInterest={monthlyPrincipalAndInterest}
                dispatch={dispatch}
              />
            </SimpleGrid>
            <Box my={5}>
              <Text
                color="neutral.400"
                fontSize="xs"
                fontWeight="medium"
              >
                ADVANCED OPTIONS
              </Text>
            </Box>
            <SimpleGrid rows={4} spacing="4px">
              <ClosingCosts
                dispatch={dispatch}
                purchasePrice={purchasePrice}
                closingCosts={closingCosts}
              />
              <RehabCost purchasePrice={purchasePrice} dispatch={dispatch} rehabCost={rehabCost} />
              <AfterRepairValue dispatch={dispatch} afterRepairValue={afterRepairValue} />
              <PropertyState dispatch={dispatch} propertyState={propertyState} />
            </SimpleGrid>
          </TabPanel>
          <TabPanel p={0}>
            <SimpleGrid rows={15} spacing="4px">
              <GrossRent
                value={monthlyRent}
                onChange={(value) => dispatch({ type: AppAction.UpdateMonthlyRent, value })}
              />
              <Vacancy
                value={vacancy}
                onChange={(value) => dispatch({ type: AppAction.UpdateVacancy, value })}
              />
              {divider}
              <OperatingIncome value={operatingIncome} />
              <OperatingExpenses value={operatingExpenses} />
              <PropertyTaxes
                value={propertyTaxes}
                onChange={(value) => dispatch({ type: AppAction.UpdatePropertyTaxes, value })}
              />
              <PropertyInsurance
                value={propertyInsurance}
                onChange={(value) => dispatch({
                  type: AppAction.UpdatePropertyInsurance, value,
                })}
              />
              <PropertyManagement
                value={propertyManagement}
                onChange={(value) => dispatch({
                  type: AppAction.UpdatePropertyManagement, value,
                })}
              />
              <Maintenance
                value={maintenance}
                onChange={(value) => dispatch({ type: AppAction.UpdateMaintenance, value })}
              />
              <HoaFees
                value={hoaFees}
                onChange={(value) => dispatch({ type: AppAction.UpdateHoaFees, value })}
              />
              <Utilities
                value={utilities}
                onChange={(value) => dispatch({ type: AppAction.UpdateUtilities, value })}
              />
              <OtherExpenses
                value={otherExpenses}
                onChange={(value) => dispatch({ type: AppAction.UpdateOtherExpenses, value })}
              />
              {divider}
              <NetOperatingIncome value={netOperatingIncome} />
              <LoanPayments value={loanPayments} />
              {divider}
              <CashFlow value={cashFlow} />
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </SimpleGrid>
  );
}

Settings.propTypes = {
  vacancy: PropTypes.number.isRequired,
  operatingIncome: PropTypes.number.isRequired,
  operatingExpenses: PropTypes.number.isRequired,
  propertyTaxes: PropTypes.number.isRequired,
  propertyInsurance: PropTypes.number.isRequired,
  propertyManagement: PropTypes.number.isRequired,
  maintenance: PropTypes.number.isRequired,
  hoaFees: PropTypes.number.isRequired,
  utilities: PropTypes.number.isRequired,
  otherExpenses: PropTypes.number.isRequired,
  netOperatingIncome: PropTypes.number.isRequired,
  cashFlow: PropTypes.number.isRequired,
  monthlyRent: PropTypes.number.isRequired,
  purchasePrice: PropTypes.number.isRequired,
  propertyState: PropTypes.string.isRequired,
  monthlyPrincipalAndInterest: PropTypes.number.isRequired,
  interestRate: PropTypes.number.isRequired,
  lengthOfLoan: PropTypes.number.isRequired,
  loan: PropTypes.number.isRequired,
  downPayment: PropTypes.number.isRequired,
  downPaymentRatio: PropTypes.number.isRequired,
  loanRatio: PropTypes.number.isRequired,
  closingCosts: PropTypes.number.isRequired,
  rehabCost: PropTypes.number.isRequired,
  afterRepairValue: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Settings;
