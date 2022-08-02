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
import PropTypes from 'prop-types';

function Results({ cashFlow, monthlyExpenses, saveOnInsurance, propertyMetrics }) {
  return (
    <SimpleGrid rows={3} spacing={5}>
      <Text
        my={4}
        mx={5}
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
            Save On Insurance
          </Tab>
        </TabList>
        <TabPanels mt={7}>
          <TabPanel p={0}>
            {cashFlow}
          </TabPanel>
          <TabPanel p={0}>
            {monthlyExpenses}
          </TabPanel>
          <TabPanel>
            {saveOnInsurance}
          </TabPanel>
        </TabPanels>
      </Tabs>
      {propertyMetrics}
    </SimpleGrid>
  );
}

Results.propTypes = {
  cashFlow: PropTypes.element.isRequired,
  monthlyExpenses: PropTypes.element.isRequired,
  propertyMetrics: PropTypes.element.isRequired,
};

export default Results;
