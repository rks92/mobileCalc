import React from 'react';
import { Select, Spacer } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import InputLabel from '../shared/texts/InputLabel';
import Row from '../shared/Row';
import { AppAction } from '../appReducer';
import { taxRateByState } from '../shared/models';

function PropertyState({ propertyState, dispatch }) {
  const onChange = (value) => dispatch({ type: AppAction.UpdatePropertyState, value });
  return (
    <Row>
      <InputLabel tooltipLabel="Property State " text="Property State" />
      <Spacer />
      <Select
        isFullWidth
        size="sm"
        fontSize="xs"
        fontWeight="medium"
        color="neutral.600"
        maxW="100px"
        placeholder="State"
        border="1px solid"
        borderColor="neutral.100"
        borderRadius="4px"
        iconSize="18px"
        value={propertyState}
        style={{
          WebkitPaddingEnd: '1rem',
          paddingInlineEnd: '1rem',
        }}
        onChange={(event) => onChange(event.target.value)}
      >
        {Object.keys(taxRateByState)
          .map((state) => <option key={state} value={state}>{state}</option>)}
      </Select>
    </Row>
  );
}

PropertyState.propTypes = {
  propertyState: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default React.memo(
  PropertyState,
  (prevProps, nextProps) => prevProps.propertyState === nextProps.propertyState,
);
