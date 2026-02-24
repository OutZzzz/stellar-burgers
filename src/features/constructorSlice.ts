import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface IConstructirState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: IConstructirState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const ingredient = action.payload;

      if (ingredient.type === 'bun') {
        state.bun = ingredient;
        return;
      }

      state.ingredients.push({
        ...ingredient,
        id: crypto.randomUUID()
      });
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = [
        ...state.ingredients.filter((item) => item.id != action.payload.id)
      ];
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const [item] = state.ingredients.splice(fromIndex, 1);
      state.ingredients.splice(toIndex, 0, item);
    },
    resetIngredients: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getBurgerIngredients: (state) => state.ingredients,
    getBurgerBun: (state) => state.bun
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetIngredients
} = constructorSlice.actions;
export const reducer = constructorSlice.reducer;
export const { getBurgerIngredients, getBurgerBun } =
  constructorSlice.selectors;
