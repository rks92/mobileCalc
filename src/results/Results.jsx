import {
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import PropertyMetrics from './PropertyMetrics';
import CashFlow from './CashFlow';
import MonthlyExpenses from './MonthlyExpenses';

function Results() {
  return (
    <SimpleGrid rows={3} spacing={5}>
      <Text
        my="16px"
        mx="20px"
        color="neutral.500"
        fontSize="xs"
        fontWeight="medium"
      >
        VIEW DETAILED RESULTS BELOW
      </Text>
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
            Cash Flow
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
            Monthly Expenses
          </Tab>
        </TabList>
        <TabPanels mt="28px">
          <TabPanel p="0">
            <CashFlow />
          </TabPanel>
          <TabPanel p="0">
            <MonthlyExpenses />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <PropertyMetrics />
    </SimpleGrid>
  );
}

export default Results;
