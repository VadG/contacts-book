import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactsFilter from '../contacts/ContactsFilter';
import AuthContext from '../../context/auth/authContext';

const Home = ({ history }) => {
  const { loadUser, isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    // if (isAuthenticated) {
      loadUser();
      // history.push('/login');
    // }
    //  else {
    //   loadUser();
    // }
    // eslint-disable-next-line
  }, [isAuthenticated]);
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactsFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
