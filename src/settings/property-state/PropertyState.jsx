import React from 'react';
import { Spacer } from '@chakra-ui/react';
import StateSelect from './StateSelect';
import { AppAction, useAppDispatch, useAppState } from '../../context/AppContext';
import InputLabel from '../../shared/texts/InputLabel';
import Row from '../../shared/Row';

function PropertyState() {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const {
    propertyState,
  } = state;

  const onChange = (value) => dispatch({ type: AppAction.UpdatePropertyState, value });

  return (
    <Row>
      <InputLabel tooltipLabel="Property State " text="Property State" />
      <Spacer />
      <StateSelect value={propertyState} onChange={onChange} />
    </Row>
  );
}

export default PropertyState;
