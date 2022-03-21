import { extendTheme } from '@chakra-ui/react';

const styles = {
  global: {
    body: {
      lineHeight: 'base',
    },
  },
};

const colors = {
  primary: {
    80: '#FAFCFF',
    100: '#E5F0FF',
    300: '#80B3FF',
    400: '#4D94FF',
    500: '#0066FF',
    600: '#025DE4',
    700: '#0A4296',
  },
  secondary: {
    6: '#E24916',
  },
  neutral: {
    100: '#E6E9F0',
    400: '#9BA9C1',
    500: '#687DA3',
    600: '#4F6893',
    900: '#042765',
  },
};

const fonts = {
  heading: 'Graphik, sans-serif',
  body: 'Graphik, sans-serif',
};

const theme = extendTheme({ styles, colors, fonts });

export default theme;
