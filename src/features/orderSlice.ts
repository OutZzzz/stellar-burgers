import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
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

export const orderBurger = createAsyncThunk(
  'orders/orderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async () => await getOrdersApi()
);

interface IOrderState {
  orderData: TOrdersData | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderByNumber: TOrder[] | null;
  orderRequestError: string | null;
  orders: TOrder[] | null;
}

const initialState: IOrderState = {
  orderData: null,
  orderModalData: null,
  orderByNumber: null,
  orderRequest: false,
  orderRequestError: null,
  orders: null
};

export const orderSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearOrderData: (state) => {
      state.orderModalData = null;
      state.orderRequestError = null;
      state.orderRequest = false;
    }
  },
  selectors: {
    orderRequestSelector: (state) => state.orderRequest,
    getFeedOrders: (state) => state.orderData?.orders,
    getFeedData: (state) => state.orderData,
    getOrderModalData: (state) => state.orderModalData,
    getOrderError: (state) => state.orderRequestError,
    getProfileOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.orderRequest = true;
        state.orderRequestError = null;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderRequestError = action.error.message ?? '';
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
        state.orderRequestError = action.error.message ?? '';
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderByNumber = action.payload.orders;
        state.orderRequest = false;
        state.orderRequestError = null;
      })
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.orderRequestError = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderRequestError = action.error.message ?? '';
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
        state.orderRequestError = null;
      })
      .addCase(getOrders.pending, (state) => {
        state.orderRequest = true;
        state.orderRequestError = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderRequestError = action.error.message ?? '';
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.orderRequest = false;
        state.orderRequestError = null;
      });
  }
});

export const {
  orderRequestSelector,
  getFeedOrders,
  getFeedData,
  getOrderModalData,
  getOrderError,
  getProfileOrders
} = orderSlice.getSelectors((state: RootState) => state.feed);

export const { clearOrderData } = orderSlice.actions;

export const ordersInfoDataSelector =
  (number: string) => (state: RootState) => {
    if (state.feed.orderData?.orders.length) {
      const data = state.feed.orderData.orders.find(
        (item) => item.number === +number
      );
      if (data) return data;
    }

    if (state.feed.orders?.length) {
      const data = state.feed.orders.find((item) => item.number === +number);
      if (data) return data;
    }

    if (state.feed.orderByNumber?.length) {
      const data = state.feed.orderByNumber.find(
        (item) => item.number === +number
      );
      if (data) return data;
    }

    return null;
  };
