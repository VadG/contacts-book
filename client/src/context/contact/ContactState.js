import React, { useReducer } from 'react';
import uuid from 'uuid';
import contactReducer from './ContactReducer';
import ContactContext from './ContactContext';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        name: 'name',
        phone: '2131',
        _id: 24,
        email: 'mail@mail.com',
        type: 'personal',
      },
      {
        name: 'vad',
        phone: '2131',
        _id: 2,
        email: 'mail@mail.com',
        type: 'personal',
      },
    ],
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);
  // Add contact
  const addContact = contact => {
    contact._id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };
  // Delete
  const deleteContact = _id => {
    dispatch({ type: DELETE_CONTACT, payload: _id });
  };
  // Set current contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  // Update
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };
  // Filter
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // ClearFilter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filtered: state.filtered,
        clearFilter,
        filterContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
