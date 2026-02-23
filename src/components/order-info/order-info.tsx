import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { AppDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getOrderByNumber } from '../../features/orderSlice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const { data } = useSelector((state) => state.ingredients);
  const { number } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const orderNumber = number ? Number(number) : NaN;
  /* const orderData = {
    createdAt: '',
    ingredients: [],
    _id: '',
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  }; */

  useEffect(() => {
    if (!Number.isFinite(orderNumber)) return;
    dispatch(getOrderByNumber(orderNumber));
  }, [dispatch, orderNumber]);

  const orderData = useSelector((state) => state.feed.orderModalData);

  const ingredients: TIngredient[] = data ?? [];

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
