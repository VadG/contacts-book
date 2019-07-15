import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
// import Spinner from '../layout/Spinner';
import ContactContext from '../../context/contact/ContactContext';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = contactContext;
  const visibleContacts = !!filtered ? filtered : contacts;
  return (
    <Fragment>
      <TransitionGroup>
        {visibleContacts.map(contact => {
          return (
            <CSSTransition key={contact._id} timeout={500} classNames="item">
              <ContactItem contact={contact} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
