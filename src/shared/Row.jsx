/* eslint-disable react/prop-types,react/jsx-props-no-spreading */
import React from 'react';
import {
  Flex,
} from '@chakra-ui/react';

function Row({ children, ...restProps }) {
  return (
    <Flex
      flexDirection="row"
      flexWrap="nowrap"
      alignContent="center"
      justifyContent="flex-start"
      alignItems="center"
      {...restProps}
    >
      {children}
    </Flex>
  );
}

export default Row;
