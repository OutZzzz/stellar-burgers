import { Navigate } from 'react-router-dom';
import {
  loginUserRequestSelector,
  userDataSelector
} from '../../features/userSlice';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(loginUserRequestSelector);
  const user = useSelector(userDataSelector);

  if (isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' />;
  }

  if (onlyUnAuth && user) {
    return <Navigate replace to='/' />;
  }

  return children;
};
