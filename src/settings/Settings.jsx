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
} from '@chakra-ui/react';
import PurchasePriceWithSlider from './purchase-price/PurchasePriceWithSlider';
import MonthlyRent from './MonthlyRent';
import PurchasePrice from './purchase-price/PurchasePrice';
import DownPayment from './DownPayment';
import Loan from './Loan';
import InterestRate from './InterestRate';
import LengthOfLoan from './length-of-loan/LengthOfLoan';
import MonthlyPrincipalAndInterest from './MonthlyPrincipalAndInterest';
import ClosingCosts from './ClosingCosts';
import RehabCost from './RehabCost';
import AfterRepairValue from './AfterRepairValue';
import PropertyState from './property-state/PropertyState';
import GrossRent from './GrossRent';
import { Vacancy } from './Vacancy';
import { OperatingIncome } from './OperatingIncome';
import { AppAction, useAppDispatch, useAppState } from '../context/AppContext';
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

function Settings() {
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
    <SimpleGrid rows={3} spacing={5} mt={6}>
      <PurchasePriceWithSlider />
      <MonthlyRent />
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
              <PurchasePrice />
              <DownPayment />
              <Loan />
              <InterestRate />
              <LengthOfLoan />
              <MonthlyPrincipalAndInterest />
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
              <ClosingCosts />
              <RehabCost />
              <AfterRepairValue />
              <PropertyState />
            </SimpleGrid>
          </TabPanel>
          <TabPanel p={0}>
            <SimpleGrid rows={15} spacing="4px">
              <GrossRent value={monthlyRent} onChange={updateGrossRent} />
              <Vacancy value={vacancy} onChange={updateVacancy} />
              {divider}
              <OperatingIncome value={operatingIncome} />
              <OperatingExpenses value={operatingExpenses} />
              <PropertyTaxes value={propertyTaxes} onChange={updatePropertyTaxes} />
              <PropertyInsurance value={propertyInsurance} onChange={updatePropertyInsurance} />
              <PropertyManagement value={propertyManagement} onChange={updatePropertyManagement} />
              <Maintenance value={maintenance} onChange={updateMaintenance} />
              <HoaFees value={hoaFees} onChange={updateHoaFees} />
              <Utilities value={utilities} onChange={updateUtilities} />
              <OtherExpenses value={otherExpenses} onChange={updateOtherExpenses} />
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

export default Settings;
