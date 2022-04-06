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
import { trigger } from './shared/events';
import useHasTouchScreen from './shared/hooks/useHasTouchScreen';

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
  const hasTouchScreen = useHasTouchScreen();

  const handleToggle = () => {
    if (hasTouchScreen) trigger('popover:close'); // For some reason it doesnt triggers the onTouchStart event

    const newSection = section === Section.Settings ? Section.Results : Section.Settings;
    setSection(newSection);
  };

  const handleTouchStart = (event) => {
    if (event.target.closest('div[role="tooltip"]')) return;
    if (hasTouchScreen) trigger('popover:close');
  };

  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <Fonts />
        <Collapse in={section === Section.Settings} onTouchStart={handleTouchStart}>
          <PageContainer>
            <Settings />
          </PageContainer>
        </Collapse>
        <AnnualCashFlowButton
          selectedSection={section}
          onToggle={handleToggle}
          event
        />
        <Collapse in={section === Section.Results} onTouchStart={handleTouchStart}>
          <PageContainer>
            <Results />
          </PageContainer>
        </Collapse>
      </AppProvider>
    </ChakraProvider>
  );
}

export default App;
