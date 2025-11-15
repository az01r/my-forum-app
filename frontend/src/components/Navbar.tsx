import { Form, NavLink, useRouteLoaderData } from "react-router";

import classes from "./Navbar.module.css";

function Navbar() {
  // the token is retrieved from the loader data and not with the util/auth function to re-evaluate
  // its state and eventually update the page
  const token = useRouteLoaderData("root");

  const isActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? classes.active : undefined;

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarLeft}>
        <ul className={classes.list}>
          <li>
            <NavLink to="/" className={isActive} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/topics" className={isActive} end>
              Topics
            </NavLink>
          </li>
          <li>
            <NavLink to="/topics/new" className={isActive}>
              Start a new discussion
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={classes.navbarRight}>
        {token ? (
          <Form action="/logout" method="post">
            <button>Logout</button>
          </Form>
        ) : (
          <NavLink to="/auth?mode=login" className={isActive}>
            Login / Register
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
