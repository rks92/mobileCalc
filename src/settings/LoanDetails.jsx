import React from 'react';
import {
  Box,
  SimpleGrid,
  Spacer,
  Text,
} from '@chakra-ui/react';
import InputLabel from '../shared/texts/InputLabel';
import Row from '../shared/Row';
import StateSelect from './StateSelect';
import SmallCurrencyInput from '../shared/inputs/SmallCurrencyInput';

function LoanDetails() {
  return (
    <>
      <SimpleGrid rows={6} spacing="4px">
        <Row>
          <InputLabel tooltipLabel="Purchase Price" text="Purchase Price" />
          <Spacer />
          <SmallCurrencyInput value={0} onChange={() => {}} />
        </Row>
        <Row>
          <InputLabel tooltipLabel="Down payment (20%)" text="Down payment (20%)" />
          <Spacer />
          <SmallCurrencyInput value={0} onChange={() => {}} />
        </Row>
        <Row>
          <InputLabel tooltipLabel="Loan (80%)" text="Loan (80%)" />
          <Spacer />
          <SmallCurrencyInput value={0} onChange={() => {}} />
        </Row>
        <Row>
          <InputLabel tooltipLabel="Interest Rate" text="Interest Rate" />
          <Spacer />
          <SmallCurrencyInput value={0} onChange={() => {}} />
        </Row>
        <Row>
          <InputLabel tooltipLabel="Length of loan" text="Length of loan" />
          <Spacer />
          <SmallCurrencyInput value={0} onChange={() => {}} />
        </Row>
        <Row>
          <InputLabel tooltipLabel="Monthly Principal & Interest" text="Monthly Principal & Interest" />
          <Spacer />
          <SmallCurrencyInput value={0} onChange={() => {}} />
        </Row>
      </SimpleGrid>
      <Box my="20px">
        <Text
          color="neutral.400"
          fontSize="xs"
          fontWeight="medium"
        >
          ADVANCED OPTIONS
        </Text>
      </Box>
      <SimpleGrid rows={4} spacing="4px">
        <Row>
          <InputLabel tooltipLabel="Closing Costs (Purchase)" text="Closing Costs (Purchase)" />
          <Spacer />
          <SmallCurrencyInput value={0} onChange={() => {}} />
        </Row>
        <Row>
          <InputLabel tooltipLabel="Rehab Cost" text="Rehab Cost" />
          <Spacer />
          <SmallCurrencyInput value={0} onChange={() => {}} />
        </Row>
        <Row>
          <InputLabel tooltipLabel="After Repair Value " text="After Repair Value " />
          <Spacer />
          <SmallCurrencyInput value={0} onChange={() => {}} />
        </Row>
        <Row>
          <InputLabel tooltipLabel="Property State " text="Property State" />
          <Spacer />
          <StateSelect />
        </Row>
      </SimpleGrid>
    </>
  );
}

export default LoanDetails;
