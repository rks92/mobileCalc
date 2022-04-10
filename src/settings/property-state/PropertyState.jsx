import React from 'react';
import { Spacer } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import StateSelect from './StateSelect';
import InputLabel from '../../shared/texts/InputLabel';
import Row from '../../shared/Row';
import { AppAction } from '../../appReducer';

function PropertyState({ propertyState, dispatch }) {
  const onChange = (value) => dispatch({ type: AppAction.UpdatePropertyState, value });

  return (
    <Row>
      <InputLabel tooltipLabel="Property State " text="Property State" />
      <Spacer />
      <StateSelect value={propertyState} onChange={onChange} />
    </Row>
  );
}

PropertyState.propTypes = {
  propertyState: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default PropertyState;
