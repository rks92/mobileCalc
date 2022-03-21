import React from 'react';
import { Select } from '@chakra-ui/react';

function StateSelect() {
  return (
    <Select placeholder="State" size="md" w="100px">
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  );
}

export default StateSelect;
