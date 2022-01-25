import { MouseEventHandler } from 'react';
import { NavLink } from "react-router-dom";
import useAuth from "/src/hooks/useAuth";

const Header = () => {
  const { me, logout } = useAuth();
  const handleLogout: MouseEventHandler = (ev) => {
    ev.preventDefault();
    logout();
  }
  return (
    <header className="container">
      <hgroup>
        <h1>User table app</h1>
        <h2>
          {me
            ? `Logged in as ${me.email}`
            : "Login and manage the users in the database"}
        </h2>
      </hgroup>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {me && (
            <>
              <li>
                <NavLink to="/users">Dashboard</NavLink>
              </li>
              <li>
                <a href="#" onClick={handleLogout}>Logout</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
