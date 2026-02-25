import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from 'react-redux';
import { loginErrorSelector, loginUser } from '../../features/userSlice';
import { AppDispatch, useSelector } from '../../services/store';
import { TLoginData } from '@api';

export const Login: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginUserError = useSelector(loginErrorSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    const userData: TLoginData = {
      email: email,
      password: password
    };
    dispatch(loginUser(userData));
  };

  return (
    <LoginUI
      errorText={loginUserError ?? ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
