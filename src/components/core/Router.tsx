import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "/src/hooks/useAuth";

import HomePage from "/src/pages/home";
import UsersPage from "/src/pages/users";

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  let auth = useAuth();
  if (!auth.me) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const Router = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route
      path="/users"
      element={
        <AuthGuard>
          <UsersPage />
        </AuthGuard>
      }
    />
  </Routes>
);

export default Router;
