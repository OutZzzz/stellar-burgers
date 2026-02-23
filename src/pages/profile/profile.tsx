import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import { TRegisterData } from '@api';
import { updateUser } from '../../features/userSlice';

export const Profile: FC = () => {
  const user = useSelector((state) => state.user.data);
  const dispatch: AppDispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userData: Partial<TRegisterData> = {
      name: formValue?.name,
      email: formValue?.email,
      password: formValue.password
    };
    dispatch(updateUser(userData));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
