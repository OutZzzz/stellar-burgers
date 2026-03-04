import {
  IConstructirState,
  reducer,
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetIngredients
} from './constructorSlice';

describe('Тесты редьюсера слайса burgerConstructor', () => {
  const initialState: IConstructirState = {
    bun: null,
    ingredients: [
      {
        id: '1',
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
      },
      {
        id: '2',
        _id: '2',
        name: 'Котлета из нургла',
        type: 'main',
        proteins: 999,
        fat: 120,
        carbohydrates: 242,
        calories: 4242,
        price: 19999,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      }
    ]
  };
  it('Добавление ингредиента', () => {
    const newState = reducer(
      initialState,
      addIngredient({
        id: '3',
        _id: '2',
        name: 'Котлета из нургла',
        type: 'main',
        proteins: 999,
        fat: 120,
        carbohydrates: 242,
        calories: 4242,
        price: 19999,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      })
    );
    const { ingredients } = newState;
    expect(ingredients.length).toBe(3);
  });
  it('Удаление ингредиента', () => {
    const newState = reducer(
      initialState,
      removeIngredient({
        id: '2',
        _id: '2',
        name: 'Котлета из нургла',
        type: 'main',
        proteins: 999,
        fat: 120,
        carbohydrates: 242,
        calories: 4242,
        price: 19999,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      })
    );
    const { ingredients } = newState;
    expect(ingredients.length).toBe(1);
  });
  it('Изменение порядка ингредиентов', () => {
    const newState = reducer(
      initialState,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );
    const { ingredients } = newState;
    expect(ingredients).toEqual([
      {
        id: '2',
        _id: '2',
        name: 'Котлета из нургла',
        type: 'main',
        proteins: 999,
        fat: 120,
        carbohydrates: 242,
        calories: 4242,
        price: 19999,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        id: '1',
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
    ]);
  });
  it('Очищение конструктора', () => {
    const newState = reducer(initialState, resetIngredients());

    const { ingredients } = newState;
    expect(ingredients.length).toBe(0);
  });
});
