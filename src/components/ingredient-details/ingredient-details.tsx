import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import {
  ingredientsData,
  isLoadingSelector
} from '../../features/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const data = useSelector(ingredientsData);
  const isLoading = useSelector(isLoadingSelector);
  const { id } = useParams();

  const ingredientData = data?.find((item) => item._id === id);

  if (isLoading) {
    return <Preloader />;
  }

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
