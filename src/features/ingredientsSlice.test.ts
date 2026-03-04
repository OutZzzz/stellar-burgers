import {
  IIngredientState,
  ingredientsSlice,
  ingredientsTrunk
} from './ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('Тесты редьюсера слайса ingredients', () => {
  const initialState: IIngredientState = {
    isLoading: false,
    data: [],
    error: null
  };

  it('когда запрос ingredientsTrunk становиться pending, state должен устанавливать isLoading в true, а error в null', () => {
    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        error: 'Test Error'
      },
      ingredientsTrunk.pending('')
    );

    expect(actualState).toEqual({
      data: [],
      isLoading: true,
      error: null
    });
  });

  it('когда запрос ingredientsTrunk становиться rejected, state должен устанавливать isLoading в false, а в error передаваться сообщение об ошибке', () => {
    const testError = new Error('Test Error');

    const expectedState: IIngredientState = {
      data: [],
      isLoading: false,
      error: testError.message
    };

    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        isLoading: true
      },
      ingredientsTrunk.rejected(testError, '')
    );

    expect(actualState).toMatchObject(expectedState);
  });

  it('когда запрос ingredientsTrunk становится fulfilled, state должен устанавливать isLoading в false, в data сохранять данные', () => {
    const testData: TIngredient[] = [
      {
        _id: '1',
        name: 'Лунная булка L-3000i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 9999,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      }
    ];

    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        isLoading: true
      },
      ingredientsTrunk.fulfilled(testData, '')
    );

    expect(actualState).toEqual({
      data: testData,
      isLoading: false,
      error: null
    });
  });
});
