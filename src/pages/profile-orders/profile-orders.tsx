import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { AppDispatch, useSelector } from '../../services/store';
import {
  getOrders,
  getProfileOrders,
  orderRequestSelector
} from '../../features/orderSlice';
import { Preloader } from '@ui';
import { useDispatch } from 'react-redux';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const isLoading = useSelector(orderRequestSelector);
  const orders: TOrder[] = useSelector(getProfileOrders) ?? [];

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
