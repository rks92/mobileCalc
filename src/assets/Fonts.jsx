import React from 'react';
import { Global } from '@emotion/react';

const styles = `
      @font-face {
        font-family: 'Graphik';
        src: url('./assets/fonts/Graphik/Graphik-Super.woff') format('woff');
        font-weight: 900;
        font-style: normal;
      }
      
      @font-face {
        font-family: 'Graphik';
        src: url('./assets/fonts/Graphik/Graphik-SuperItalic.woff') format('woff');
        font-weight: 900;
        font-style: italic;
      }
      
      @font-face {
        font-family: 'Graphik';
        src: url('./assets/fonts/Graphik/Graphik-Black.woff') format('woff');
        font-weight: 800;
        font-style: normal;
      }
      
      @font-face {
        font-family: 'Graphik';
        src: url('./assets/fonts/Graphik/Graphik-BlackItalic.woff') format('woff');
        font-weight: 800;
        font-style: italic;
      }
      
      @font-face {
        font-family: 'Graphik';
        src: url('./assets/fonts/Graphik/Graphik-Bold.woff') format('woff');
        font-weight: 700;
        font-style: normal;
      }
      
      @font-face {
        font-family: 'Graphik';
        src: url('./assets/fonts/Graphik/Graphik-BoldItalic.woff') format('woff');
        font-weight: 700;
        font-style: italic;
      }
      
      @font-face {
        font-family: 'Graphik';
        src: url('./assets/fonts/Graphik/Graphik-Semibold.woff') format('woff');
        font-weight: 600;
        font-style: normal;
      }
      
      @font-face {
        font-family: 'Graphik';
        src: url('./assets/fonts/Graphik/Graphik-SemiboldItalic.woff') format('woff');
        font-weight: 600;
        font-style: italic;
      }
      
      @font-face {
        font-family: 'Graphik';
        src: url('./assets/fonts/Graphik/Graphik-Medium.woff') format('woff');
        font-weight: 500;
        font-style: normal;
      }
      
      @font-face {
        font-family: 'Graphik';
        src: url('./assets/fonts/Graphik/Graphik-MediumItalic.woff') format('woff');
        font-weight: 500;
        font-style: italic;
      }
      
      @font-face {
        font-family: 'Graphik';
        src: url('./assets/fonts/Graphik/Graphik-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
      }
      
      @font-face {
        font-family: 'Graphik';
        src: url('./assets/fonts/Graphik/Graphik-RegularItalic.woff') format('woff');
        font-weight: 400;
        font-style: italic;
      }
      
      @font-face {
        font-family: 'Graphik';
        src: url('./assets/fonts/Graphik/Graphik-Light.woff') format('woff');
        font-weight: 300;
        font-style: normal;
      }
      
      @font-face {
        font-family: 'Graphik';
        src: url('./assets/fonts/Graphik/Graphik-LightItalic.woff') format('woff');
        font-weight: 300;
        font-style: italic;
      }
      
      @font-face {
        font-family: 'Graphik';
        src: url('./assets/fonts/Graphik/Graphik-Extralight.woff') format('woff');
        font-weight: 200;
        font-style: normal;
      }
      
      @font-face {
        font-family: 'Graphik';
        src: url('./assets/fonts/Graphik/Graphik-ExtralightItalic.woff') format('woff');
        font-weight: 200;
        font-style: italic;
      }
      
      @font-face {
        font-family: 'Graphik';
        src: url('./assets/fonts/Graphik/Graphik-Thin.woff') format('woff');
        font-weight: 100;
        font-style: normal;
      }
      
      @font-face {
        font-family: 'Graphik';
        src: url('./assets/fonts/Graphik/Graphik-ThinItalic.woff') format('woff');
        font-weight: 100;
        font-style: italic;
      }`;

function Fonts() {
  return (
    <Global
      styles={styles}
    />
  );
}

export default Fonts;
