import React from 'react';
import {
  Center,
  Divider,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import CurrencyText from '../shared/texts/CurrencyText';
import { useAppDispatch, useAppState } from '../context/AppContext';

function CashFlow() {
  const divider = <Divider color="primary.100" my="12px" />;
  const dispatch = useAppDispatch();
  const state = useAppState();

  const {
    upFrontCashInvestment, oneYearCashFlow, fiveYearCashFlow, tenYearCashFlow,
  } = state;
  return (
    <>
      <Center h="183px" bg="tomato">Chart</Center>
      <SimpleGrid rows={4} spacing="4px" mt="31px">
        <Row>
          <InputLabel tooltipLabel="Up-Front Cash Investment" text="Up-Front Cash Investment" />
          <Spacer />
          <CurrencyText fontSize="lg" text={upFrontCashInvestment.toString()} />
        </Row>
        {divider}
        <Row>
          <InputLabel tooltipLabel="1 Year Cash Flow" text="1 Year Cash Flow" />
          <Spacer />
          <CurrencyText fontSize="lg" text={oneYearCashFlow.toString()} />
        </Row>
        {divider}
        <Row>
          <InputLabel tooltipLabel="5 Year Cash Flow" text="5 Year Cash Flow" />
          <Spacer />
          <CurrencyText fontSize="lg" text={fiveYearCashFlow.toString()} />
        </Row>
        {divider}
        <Row>
          <InputLabel tooltipLabel="10 Year Cash Flow" text="10 Year Cash Flow" />
          <Spacer />
          <CurrencyText fontSize="lg" text={tenYearCashFlow.toString()} />
        </Row>
      </SimpleGrid>
    </>
  );
}

export default CashFlow;
