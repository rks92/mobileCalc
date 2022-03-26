import React, { useState } from 'react';
import {
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
import PurchasePrice from './PurchasePrice';
import MonthlyRent from './MonthlyRent';
import LoanDetails from './LoanDetails';
import MonthlyCashFlow from './MonthlyCashFlow';

function Settings() {
  const [downPaymentRatio, setDownPaymentRatio] = useState(0);
  const [loanRatio, setLoanRatio] = useState(0);
  return (
    <SimpleGrid rows={3} spacing={5} mt={6}>
      <PurchasePrice downPaymentRatio={downPaymentRatio} loanRatio={loanRatio} />
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
            <LoanDetails
              downPaymentRatio={downPaymentRatio}
              loanRatio={loanRatio}
              setDownPaymentRatio={setDownPaymentRatio}
              setLoanRatio={setLoanRatio}
            />
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
