import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { AppDispatch, useSelector } from '../../services/store';
import {
  getFeed,
  getFeedOrders,
  orderRequestSelector
} from '../../features/orderSlice';
import { useDispatch } from 'react-redux';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const isFeedLoading = useSelector(orderRequestSelector);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(getFeedOrders) ?? [];

  const handleGetFeeds = () => dispatch(getFeed());

  if (isFeedLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
