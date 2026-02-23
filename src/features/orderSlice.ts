import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { RootState } from 'src/services/store';

export const getFeed = createAsyncThunk(
  'orders/feed',
  async () => await getFeedsApi()
);

export const getOrderByNumber = createAsyncThunk(
  'orders/orderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

interface IOrderState {
  orderData: TOrdersData | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderRequestError: string | null;
}

const initialState: IOrderState = {
  orderData: null,
  orderModalData: null,
  orderRequest: false,
  orderRequestError: null
};

export const orderSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    orderRequestSelector: (state) => state.orderRequest,
    getFeedOrders: (state) => state.orderData?.orders,
    getFeedData: (state) => state.orderData
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.orderRequest = true;
        state.orderRequestError = null;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderRequestError = action.error.message!;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.orderData = action.payload;
        state.orderRequest = false;
        state.orderRequestError = null;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.orderRequest = true;
        state.orderRequestError = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderRequestError = action.error.message!;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderModalData = action.payload.orders[0];
        state.orderRequest = false;
        state.orderRequestError = null;
      });
  }
});

export const { orderRequestSelector, getFeedOrders, getFeedData } =
  orderSlice.getSelectors((state: RootState) => state.feed);
