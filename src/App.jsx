import React, { useState } from 'react';
import {
  ChakraProvider, Collapse, Container,
} from '@chakra-ui/react';
import theme from './theme';
import Settings from './settings/Settings';
import Fonts from './assets/Fonts';
import Section from './shared/enums/Section';
import AnnualCashFlowButton from './AnnualCashFlowButton';
import { AppProvider } from './context/AppContext';
import Results from './results/Results';

// eslint-disable-next-line react/prop-types
function PageContainer({ children }) {
  { /* 72px is the button that toggles the sections in mobile devices */ }
  return (
    <Container h={`calc(${window.innerHeight}px - 72px)`} overflow="auto" paddingBottom="1rem">
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
      <AppProvider>
        <Fonts />
        <Collapse in={section === Section.Settings}>
          <PageContainer>
            <Settings />
          </PageContainer>
        </Collapse>
        <AnnualCashFlowButton selectedSection={section} onToggle={handleToggle} />
        <Collapse in={section === Section.Results}>
          <PageContainer>
            <Results />
          </PageContainer>
        </Collapse>
      </AppProvider>
    </ChakraProvider>
  );
}

export default App;
