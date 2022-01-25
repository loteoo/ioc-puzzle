import { useContext } from 'react';
import { AuthContext } from '/src/components/core/AuthProvider';

const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
}

export default useAuth
