import { extendTheme } from '@chakra-ui/react';

const styles = {
  global: {
    body: {
      bg: '#FFFFFF',
      lineHeight: 'base',
    },
  },
};

const colors = {
  primary: {
    80: '#FAFCFF',
    90: '#F7F9FE',
    100: '#E5F0FF',
    200: '#B3D1FF',
    300: '#80B3FF',
    400: '#4D94FF',
    500: '#0066FF',
    600: '#025DE4',
    700: '#0A4296',
  },
  secondary: {
    5: '#F05A28',
    6: '#E24916',
  },
  neutral: {
    100: '#E6E9F0',
    400: '#9BA9C1',
    500: '#687DA3',
    600: '#4F6893',
    900: '#042765',
  },
  green: {
    200: '#C7DFC3',
    400: '#569E4A',
  },
  yellow: {
    200: '#FAEBBF',
    400: '#F1C340',
  },
};

const fonts = {
  heading: 'Graphik, sans-serif',
  body: 'Graphik, sans-serif',
};

const theme = extendTheme({ styles, colors, fonts });

export default theme;
