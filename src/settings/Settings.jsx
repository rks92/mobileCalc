import React, { useState } from 'react';
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
import PurchasePrice from './purchase-price/PurchasePrice';
import MonthlyRent from './MonthlyRent';
import MonthlyCashFlow from './MonthlyCashFlow';
import SimplePurchasePrice from './purchase-price/SimplePurchasePrice';
import DownPayment from './DownPayment';
import Loan from './Loan';
import InterestRate from './InterestRate';
import LengthOfLoan from './length-of-loan/LengthOfLoan';
import MonthlyPrincipalAndInterest from './MonthlyPrincipalAndInterest';
import ClosingCosts from './ClosingCosts';
import RehabCost from './RehabCost';
import AfterRepairValue from './AfterRepairValue';
import PropertyState from './property-state/PropertyState';

function Settings() {
  const [downPaymentRatio, setDownPaymentRatio] = useState(0);
  const [loanRatio, setLoanRatio] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);

  return (
    <SimpleGrid rows={3} spacing={5} mt={6}>
      <PurchasePrice
        downPaymentRatio={downPaymentRatio}
        loanRatio={loanRatio}
        purchasePrice={purchasePrice}
        setPurchasePrice={setPurchasePrice}
      />
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
              <SimplePurchasePrice
                loanRatio={loanRatio}
                downPaymentRatio={downPaymentRatio}
                purchasePrice={purchasePrice}
                setPurchasePrice={setPurchasePrice}
              />
              <DownPayment
                setLoanRatio={setLoanRatio}
                downPaymentRatio={downPaymentRatio}
                setDownPaymentRatio={setDownPaymentRatio}
              />
              <Loan
                loanRatio={loanRatio}
                setDownPaymentRatio={setDownPaymentRatio}
                setLoanRatio={setLoanRatio}
              />
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
            <MonthlyCashFlow />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </SimpleGrid>
  );
}

export default Settings;
