import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import AuthContext from '../../context/auth/authContext';
// import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ title, icon }) => {
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} />
        {title}
      </h1>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </ul>
    </div>
  );
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
Navbar.defaultProps = {
  title: 'Contacts book',
  icon: 'fas fa-id-card-alt',
};

export default Navbar;
