import React, {Fragment, useContext} from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';

import UserContext from './../UserContext';

import {Navbar, Nav} from 'react-bootstrap';

export default function AppNavbar(){

  const {user, unsetUser} = useContext(UserContext);

  let history = useHistory();


  const logout = () => {
    unsetUser();
    history.push('/login');
  }

  let leftNav = (user.id !== null) ? 
        (user.isAdmin === true) ?
          <Fragment>
            <Nav.Link as={NavLink} to="/addProduct">Add Book</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Fragment>
        :
          <Fragment>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Fragment>
    :
      (
        <Fragment>
            <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
          </Fragment>

      )

  return (
    <Navbar className="navbar navbar-dark bg-dark" expand="lg">
      <Navbar.Brand as={Link} to="/">The Bookstore</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/products">Books</Nav.Link>
        </Nav>
        <Nav>
          {leftNav}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}