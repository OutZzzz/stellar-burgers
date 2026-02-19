import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const ingredientsTrunk = createAsyncThunk(
  'ingredients/getIngredients',
  async () => getIngredientsApi()
);

export interface IIngredientState {
  isLoading: boolean;
  data: TIngredient[] | null;
  error: string | null | undefined;
}

const initialState: IIngredientState = {
  isLoading: false,
  data: null,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ingredientsTrunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(ingredientsTrunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(ingredientsTrunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
  }
});
