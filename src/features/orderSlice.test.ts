import { TOrder, TOrdersData } from '@utils-types';
import {
  IOrderState,
  getFeed,
  getOrderByNumber,
  getOrders,
  orderBurger,
  orderSlice
} from './orderSlice';
import { TFeedsResponse, TNewOrderResponse, TOrderResponse } from '@api';

describe('Тесты редьюсера слайса feed/order', () => {
  const initialState: IOrderState = {
    orderData: null,
    orderModalData: null,
    orderByNumber: null,
    orderRequest: false,
    orderRequestError: null,
    orders: null
  };

  const testError = new Error('Test Error');

  const expectedState: IOrderState = {
    orderData: null,
    orderModalData: null,
    orderByNumber: null,
    orderRequest: false,
    orderRequestError: testError.message,
    orders: null
  };

  /* pending  */
  it('когда запрос getFeed становиться pending, state должен устанавливать orderRequest в true, а orderRequestError в null', () => {
    const actualState = orderSlice.reducer(
      {
        ...initialState,
        orderRequestError: 'Test Error'
      },
      getFeed.pending('')
    );

    expect(actualState).toEqual({
      orderData: null,
      orderModalData: null,
      orderByNumber: null,
      orderRequest: true,
      orderRequestError: null,
      orders: null
    });
  });
  it('когда запрос getOrderByNumber становиться pending, state должен устанавливать orderRequest в true, а orderRequestError в null', () => {
    const actualState = orderSlice.reducer(
      {
        ...initialState,
        orderRequestError: 'Test Error'
      },
      getOrderByNumber.pending('', 1)
    );

    expect(actualState).toEqual({
      orderData: null,
      orderModalData: null,
      orderByNumber: null,
      orderRequest: true,
      orderRequestError: null,
      orders: null
    });
  });
  it('когда запрос orderBurger становиться pending, state должен устанавливать orderRequest в true, а orderRequestError в null', () => {
    const actualState = orderSlice.reducer(
      {
        ...initialState,
        orderRequestError: 'Test Error'
      },
      orderBurger.pending('', ['1', '2', '3'])
    );

    expect(actualState).toEqual({
      orderData: null,
      orderModalData: null,
      orderByNumber: null,
      orderRequest: true,
      orderRequestError: null,
      orders: null
    });
  });
  it('когда запрос getOrders становиться pending, state должен устанавливать orderRequest в true, а orderRequestError в null', () => {
    const actualState = orderSlice.reducer(
      {
        ...initialState,
        orderRequestError: 'Test Error'
      },
      getOrders.pending('')
    );

    expect(actualState).toEqual({
      orderData: null,
      orderModalData: null,
      orderByNumber: null,
      orderRequest: true,
      orderRequestError: null,
      orders: null
    });
  });

  /* rejected  */
  it('когда запрос getFeed становиться rejected, state должен устанавливать orderRequest в false, а в orderRequestError передаваться сообщение об ошибке', () => {
    const actualState = orderSlice.reducer(
      {
        ...initialState,
        orderRequest: true
      },
      getFeed.rejected(testError, '')
    );

    expect(actualState).toMatchObject(expectedState);
  });
  it('когда запрос getOrderByNumber становиться rejected, state должен устанавливать orderRequest в false, а в orderRequestError передаваться сообщение об ошибке', () => {
    const actualState = orderSlice.reducer(
      {
        ...initialState,
        orderRequest: true
      },
      getOrderByNumber.rejected(testError, '', 1)
    );

    expect(actualState).toMatchObject(expectedState);
  });
  it('когда запрос orderBurger становиться rejected, state должен устанавливать orderRequest в false, а в orderRequestError передаваться сообщение об ошибке', () => {
    const actualState = orderSlice.reducer(
      {
        ...initialState,
        orderRequest: true
      },
      orderBurger.rejected(testError, '', ['1', '2', '3'])
    );

    expect(actualState).toMatchObject(expectedState);
  });
  it('когда запрос getOrders становиться rejected, state должен устанавливать orderRequest в false, а в orderRequestError передаваться сообщение об ошибке', () => {
    const actualState = orderSlice.reducer(
      {
        ...initialState,
        orderRequest: true
      },
      getOrders.rejected(testError, '')
    );

    expect(actualState).toMatchObject(expectedState);
  });

  /* fulfilled  */
  it('когда запрос getFeed становится fulfilled, state должен устанавливать orderRequest в false, в orderData сохранять данные', () => {
    const testData: TFeedsResponse = {
      success: true,
      orders: [
        {
          _id: '1',
          status: 'done',
          name: 'Test 1',
          createdAt: '2026-02-22T17:41:28.878Z',
          updatedAt: '2026-02-23T07:27:17.438Z',
          number: 1,
          ingredients: []
        },
        {
          _id: '2',
          status: 'done',
          name: 'Test 2',
          createdAt: '2026-02-22T17:41:28.878Z',
          updatedAt: '2026-02-23T07:27:17.438Z',
          number: 2,
          ingredients: []
        }
      ],
      total: 2,
      totalToday: 2
    };

    const actualState = orderSlice.reducer(
      {
        ...initialState,
        orderRequest: true
      },
      getFeed.fulfilled(testData, '')
    );

    expect(actualState).toEqual({
      orderData: testData,
      orderRequest: false,
      orderByNumber: null,
      orderRequestError: null,
      orderModalData: null,
      orders: null
    });
  });

  it('когда запрос getOrderByNumber становится fulfilled, state должен устанавливать orderRequest в false, в orderByNumber сохранять данные', () => {
    const testData: TOrderResponse = {
      success: true,
      orders: [
        {
          _id: '1',
          status: 'done',
          name: 'Test 1',
          createdAt: '2026-02-22T17:41:28.878Z',
          updatedAt: '2026-02-23T07:27:17.438Z',
          number: 1,
          ingredients: []
        }
      ]
    };

    const actualState = orderSlice.reducer(
      {
        ...initialState,
        orderRequest: true
      },
      getOrderByNumber.fulfilled(testData, '', 1)
    );

    expect(actualState).toEqual({
      orderData: null,
      orderRequest: false,
      orderByNumber: testData.orders,
      orderRequestError: null,
      orderModalData: null,
      orders: null
    });
  });
  it('когда запрос orderBurger становится fulfilled, state должен устанавливать orderRequest в false, в orderModalData сохранять данные', () => {
    const testData: TNewOrderResponse = {
      success: true,
      name: 'Test 1',
      order: {
        _id: '1',
        status: 'done',
        name: 'Test 1',
        createdAt: '2026-02-22T17:41:28.878Z',
        updatedAt: '2026-02-23T07:27:17.438Z',
        number: 1,
        ingredients: []
      }
    };

    const actualState = orderSlice.reducer(
      {
        ...initialState,
        orderRequest: true
      },
      orderBurger.fulfilled(testData, '', [])
    );

    expect(actualState).toEqual({
      orderData: null,
      orderRequest: false,
      orderByNumber: null,
      orderRequestError: null,
      orderModalData: testData.order,
      orders: null
    });
  });
  it('когда запрос getOrders становится fulfilled, state должен устанавливать orderRequest в false, в orders сохранять данные', () => {
    const testData: TOrder[] = [
      {
        _id: '1',
        status: 'done',
        name: 'Test 1',
        createdAt: '2026-02-22T17:41:28.878Z',
        updatedAt: '2026-02-23T07:27:17.438Z',
        number: 1,
        ingredients: []
      }
    ];

    const actualState = orderSlice.reducer(
      {
        ...initialState,
        orderRequest: true
      },
      getOrders.fulfilled(testData, '')
    );

    expect(actualState).toEqual({
      orderData: null,
      orderRequest: false,
      orderByNumber: null,
      orderRequestError: null,
      orderModalData: null,
      orders: testData
    });
  });
});
