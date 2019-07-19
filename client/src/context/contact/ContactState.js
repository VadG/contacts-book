import React, { useReducer } from 'react';
import axios from 'axios';
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
    contacts: [],
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);
  // Get contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts/');
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (error) {

      console.log(error);
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };
  // Add contact
  const addContact = async contact => {
    try {
      const res = await axios.post('/api/contacts', contact);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };
  // Delete
  const deleteContact = async _id => {
    try {
      const res = await axios.delete(`/api/contacts/${_id}`);
      dispatch({ type: DELETE_CONTACT, payload: _id });
    } catch (error) {
      console.log(error);
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
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
  const updateContact = async contact => {
    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact);
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
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
        error: state.error,
        getContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
