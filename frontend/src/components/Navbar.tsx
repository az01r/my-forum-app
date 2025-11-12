import { NavLink } from 'react-router';

import classes from './Navbar.module.css';

const Navbar: React.FC = () => {
  const isActive = ({isActive}: { isActive: boolean}) => isActive ? classes.active : undefined;
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarLeft}>
        <ul className={classes.list}>
          <li>
            <NavLink to="/topics" className={isActive}>
            Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/new-topic" className={isActive}>Start a new discussion</NavLink>
          </li>
        </ul>
      </div>
      <div className={classes.navbarRight}>
        <NavLink to="/auth" className={isActive}>
          Login / Register
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;