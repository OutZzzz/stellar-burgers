import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { AppDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getOrderByNumber,
  ordersInfoDataSelector
} from '../../features/orderSlice';
import { ingredientsData } from '../../features/ingredientsSlice';

export const OrderInfo: FC = () => {
  const ingData = useSelector(ingredientsData);
  const { number } = useParams();
  const dispatch: AppDispatch = useDispatch();

  const orderData = useSelector(ordersInfoDataSelector(number!));
  const ingredients: TIngredient[] = ingData ?? [];

  useEffect(() => {
    if (!orderData) {
      dispatch(getOrderByNumber(+number!));
    }
  }, [dispatch, orderData, number]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
