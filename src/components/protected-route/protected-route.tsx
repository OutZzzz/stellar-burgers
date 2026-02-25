import { Navigate, useLocation } from 'react-router-dom';
import {
  isAuthCheckedSelector,
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
  const location = useLocation();
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const isLoading = useSelector(loginUserRequestSelector);
  const user = useSelector(userDataSelector);

  if (!isAuthChecked || isLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    return <Navigate replace to='/' />;
  }

  return children;
};
