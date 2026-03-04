import { ingredientsSlice } from '../features/ingredientsSlice';
import { constructorSlice } from '../features/constructorSlice';
import { userSlice } from '../features/userSlice';
import { orderSlice } from '../features/orderSlice';
import { rootReducer } from './store';

describe('Инициализация rootReducer', () => {
  it('Проверка корректности initialState', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toEqual({
      ingredients: ingredientsSlice.getInitialState(),
      burgerConstructor: constructorSlice.getInitialState(),
      user: userSlice.getInitialState(),
      feed: orderSlice.getInitialState()
    });
  });
});
