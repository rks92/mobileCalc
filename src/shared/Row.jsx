/* eslint-disable react/prop-types */
import React from 'react';
import {
  Flex,
} from '@chakra-ui/react';

function Row({ children }) {
  return (
    <Flex
      flexDirection="row"
      flexWrap="nowrap"
      alignContent="center"
      justifyContent="flex-start"
      alignItems="center"
    >
      {children}
    </Flex>
  );
}

export default Row;
