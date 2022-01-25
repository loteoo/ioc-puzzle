import { FormEventHandler } from "react";
import useAuth from "/src/hooks/useAuth";

const LoginForm = () => {
  const { login } = useAuth();

  const handleForm: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    login(ev.currentTarget.email.value, ev.currentTarget.password.value);
  };

  return (
    <div>
      <hgroup>
        <h1>Sign in</h1>
        <h2>Enter your credentials to manage users</h2>
      </hgroup>
      <form onSubmit={handleForm}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          defaultValue="demo@example.com"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          defaultValue="password"
          required
        />
        <button type="submit" className="contrast">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
