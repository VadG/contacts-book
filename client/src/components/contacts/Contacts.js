import React, { Fragment, useContext, useEffect } from 'react';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
// import Spinner from '../layout/Spinner';
import ContactContext from '../../context/contact/ContactContext';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = contactContext;
  const visibleContacts = !!filtered ? filtered : contacts;
  return (
    <div>
      <Fragment>
        {visibleContacts.map(contact => {
          return <ContactItem contact={contact} key={contact._id} />;
        })}
      </Fragment>
    </div>
  );
};

export default Contacts;
