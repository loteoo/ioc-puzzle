import useAuth from '/src/hooks/useAuth'
import css from './home.module.css'
import LoginForm from '/src/components/other/LoginForm';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
  const { me, logout } = useAuth();
  return (
    <article className={css.home}>
      {me ? (
        <>
          <h2>Logged in!</h2>
          <NavLink to="/users">
            <button className="contrast">Go to dashboard</button>
          </NavLink>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <LoginForm />
      )}
    </article>
  );
}

export default HomePage;
