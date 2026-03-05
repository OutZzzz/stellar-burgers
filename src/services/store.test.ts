import { ingredientsSlice } from '../features/ingredientsSlice';
import { constructorSlice } from '../features/constructorSlice';
import { userSlice } from '../features/userSlice';
import { orderSlice } from '../features/orderSlice';
import { rootReducer } from './store';

describe('Инициализация rootReducer', () => {
  it('проверка что rootReducer инициализирует с корректным initialState', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      ingredients: ingredientsSlice.getInitialState(),
      burgerConstructor: constructorSlice.getInitialState(),
      user: userSlice.getInitialState(),
      feed: orderSlice.getInitialState()
    });
  });
});
