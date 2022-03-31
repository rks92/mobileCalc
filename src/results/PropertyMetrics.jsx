import {
  Box, SimpleGrid, Spacer,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Row from '../shared/Row';
import InputLabel from '../shared/texts/InputLabel';
import CurrencyText from '../shared/texts/CurrencyText';
import { useAppState } from '../context/AppContext';
import { roundNumber } from '../shared/utilities';

function LargeText({ text, color }) {
  return <Text fontSize="lg" fontWeight="medium" color={color}>{text}</Text>;
}

LargeText.propTypes = { text: PropTypes.string.isRequired, color: PropTypes.string.isRequired };

function PropertyMetrics() {
  const state = useAppState();
  const green = 'green.400';
  const red = 'secondary.6';
  const [annualNOI, setAnnualNOI] = useState(0);
  const [cashOnCashReturn, setCashOnCashReturn] = useState('0.00%');
  const [capRate, setCapRate] = useState('0.00%');
  const [fiftyPercentRule, setFiftyPercentRule] = useState('0.00%');
  const [fiftyPercentRuleColor, setFiftyPercentRuleColor] = useState(green);
  const [onePercentRule, setOnePercentRule] = useState('0.00%');
  const [onePercentRuleColor, setOnePercentRuleColor] = useState(red);

  const {
    netOperatingIncome,
    annualCashFlow,
    upFrontCashInvestment,
    purchasePrice,
    afterRepairValue,
    monthlyRent,
    vacancy,
    operatingExpenses,
  } = state;

  // Annual NOI
  useEffect(() => {
    setAnnualNOI(netOperatingIncome * 12);
  }, [netOperatingIncome]);

  // Cash on Cash Return
  useEffect(() => {
    const ratio = annualCashFlow / upFrontCashInvestment;
    const formattedCashOnCashReturn = `${roundNumber(ratio * 100)}%`;
    setCashOnCashReturn(formattedCashOnCashReturn);
  }, [annualCashFlow, upFrontCashInvestment]);

  // Cap Rate
  useEffect(() => {
    const marketValue = Math.max(purchasePrice, afterRepairValue);
    const ratio = annualNOI / marketValue;
    const formattedCapRate = `${roundNumber(ratio * 100)}%`;
    setCapRate(formattedCapRate);
  }, [annualNOI, purchasePrice, afterRepairValue]);

  // 50% Rule
  useEffect(() => {
    const totalAdjustedOperatingExpenses = operatingExpenses + vacancy;
    const ratio = totalAdjustedOperatingExpenses / monthlyRent;
    const formattedFiftyPercentRule = `${Math.abs(roundNumber(ratio * 100))}%`;
    setFiftyPercentRule(formattedFiftyPercentRule);
    const color = ratio < 0.5 ? 'green.400' : 'secondary.6';
    setFiftyPercentRuleColor(color);
  }, [operatingExpenses, vacancy, monthlyRent]);

  // 1% Rule
  useEffect(() => {
    const ratio = monthlyRent / purchasePrice;
    const formattedOnePercentRule = `${Math.abs(roundNumber(ratio * 100))}%`;
    setOnePercentRule(formattedOnePercentRule);
    const color = ratio >= 0.01 ? 'green.400' : 'secondary.6';
    setOnePercentRuleColor(color);
  }, []);

  return (
    <Box borderRadius="8px" bg="primary.90" mt={9} p={6}>
      <Text fontSize="md" fontWeight="medium" color="neutral.900">Property metrics</Text>
      <SimpleGrid rows={5} spacing={4} mt={3}>
        <Row>
          <InputLabel tooltipLabel="Annual NOI" text="Annual NOI" textStyleOverrides={{ color: 'neutral.600' }} />
          <Spacer />
          <CurrencyText fontSize="lg" value={annualNOI} />
        </Row>
        <Row>
          <InputLabel tooltipLabel="Cash on Cash Return" text="Cash on Cash Return" textStyleOverrides={{ color: 'neutral.600' }} />
          <Spacer />
          <LargeText fontSize="lg" text={cashOnCashReturn} color="neutral.900" />
        </Row>
        <Row>
          <InputLabel tooltipLabel="Cap Rate" text="Cap Rate" textStyleOverrides={{ color: 'neutral.600' }} />
          <Spacer />
          <LargeText fontSize="lg" text={capRate} color="neutral.900" />
        </Row>
        <Row>
          <InputLabel tooltipLabel="50% Rule" text="50% Rule" textStyleOverrides={{ color: 'neutral.600' }} />
          <Spacer />
          <LargeText fontSize="lg" text={fiftyPercentRule} color={fiftyPercentRuleColor} />
        </Row>
        <Row>
          <InputLabel tooltipLabel="1% Rule" text="1% Rule" textStyleOverrides={{ color: 'neutral.600' }} />
          <Spacer />
          <LargeText fontSize="lg" text={onePercentRule} color={onePercentRuleColor} />
        </Row>
      </SimpleGrid>
    </Box>
  );
}

export default PropertyMetrics;
