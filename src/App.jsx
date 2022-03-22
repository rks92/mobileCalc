import React, { useState } from 'react';
import {
  ChakraProvider, Collapse, Container,
} from '@chakra-ui/react';
import theme from './theme';
import Settings from './settings/Settings';
import Fonts from './assets/Fonts';
import Section from './shared/enums/Section';
import AnnualCashFlowButton from './AnnualCashFlowButton';
import { CalculationProvider } from './context/CalculationContext';

// eslint-disable-next-line react/prop-types
function PageContainer({ children }) {
  { /* 72px is the button that toggles the sections */ }
  return (
    <Container h="calc(100vh - 72px)" overflow="auto" paddingBottom="1rem">
      {children}
    </Container>
  );
}

function App() {
  const [section, setSection] = useState(Section.Settings);

  const handleToggle = () => {
    const newSection = section === Section.Settings ? Section.Results : Section.Settings;
    setSection(newSection);
  };

  return (
    <ChakraProvider theme={theme}>
      <CalculationProvider>
        <Fonts />
        <Collapse in={section === Section.Settings}>
          <PageContainer>
            <Settings />
          </PageContainer>
        </Collapse>
        <AnnualCashFlowButton selectedSection={section} onToggle={handleToggle} value={1000} />
        <Collapse in={section === Section.Results}>
          <PageContainer>
            Results
          </PageContainer>
        </Collapse>
      </CalculationProvider>
    </ChakraProvider>
  );
}

export default App;
