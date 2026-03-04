import { TAuthResponse, TLoginData, TRegisterData, TUserResponse } from "@api";
import { IUserState, getUser, loginUser, registerUser, updateUser, userSlice } from "./userSlice"

describe('Тесты редьюсера слайса user', () => {
    const initialState: IUserState = {
        isAuthChecked: false,
        data: null,
        loginUserError: null,
        loginUserRequest: false
    };

    const testError = new Error('Test Error')

    const testLoginData: TLoginData = {
            email: 'test@test.test',
            password: 'test123456'
    }

    const testRegisterData: TRegisterData = {
            email: 'test@test.test',
            name: 'Test',
            password: 'test123456'
        }

    /* pending  */
    it('когда запрос loginUser становиться pending, state должен устанавливать loginUserRequest в true, а loginUserError в null', () => {
        
        const actualState = userSlice.reducer(
            {...initialState, loginUserError: testError.message},
            loginUser.pending('', testLoginData)
        );

        expect(actualState).toEqual({
            isAuthChecked: false,
            data: null,
            loginUserRequest: true,
            loginUserError: null
        });
    });
    it('когда запрос registerUser становиться pending, state должен устанавливать loginUserRequest в true, а loginUserError в null', () => {
        
        const actualState = userSlice.reducer(
            {...initialState, loginUserError: testError.message},
            registerUser.pending('', testRegisterData)
        );

        expect(actualState).toEqual({
            isAuthChecked: false,
            data: null,
            loginUserRequest: true,
            loginUserError: null
        });
    });
    it('когда запрос updateUser становиться pending, state должен устанавливать loginUserRequest в true, а loginUserError в null', () => {

        const actualState = userSlice.reducer(
            {...initialState, loginUserError: testError.message},
            updateUser.pending('', testRegisterData)
        );

        expect(actualState).toEqual({
            isAuthChecked: false,
            data: null,
            loginUserRequest: true,
            loginUserError: null
        });
    });
    it('когда запрос getUser становиться pending, state должен устанавливать loginUserRequest в true, а loginUserError в null', () => {
     
        const actualState = userSlice.reducer(
            {...initialState, loginUserError: testError.message},
            getUser.pending('')
        );

        expect(actualState).toEqual({
            isAuthChecked: false,
            data: null,
            loginUserRequest: true,
            loginUserError: null
        });
    });

    /* rejected  */
    it('когда запрос loginUser становиться rejected, state должен устанавливать loginUserRequest в false, isAuthChecked в true, а в loginUserError передаваться сообщение об ошибке', () => {
        const expectedState: IUserState = {
            isAuthChecked: true,
            data: null,
            loginUserError: testError.message,
            loginUserRequest: false
        };

        const actualState = userSlice.reducer(
            {...initialState, loginUserRequest: true},
            loginUser.rejected(testError, '', testLoginData)
        )

        expect(actualState).toMatchObject(expectedState);
    });

    it('когда запрос registerUser становиться rejected, state должен устанавливать loginUserRequest в false, а в loginUserError передаваться сообщение об ошибке', () => {
        const expectedState: IUserState = {
            isAuthChecked: false,
            data: null,
            loginUserError: testError.message,
            loginUserRequest: false
        };

        const actualState = userSlice.reducer(
            {...initialState, loginUserRequest: true},
            registerUser.rejected(testError, '', testRegisterData)
        )

        expect(actualState).toMatchObject(expectedState);
    });

    it('когда запрос updateUser становиться rejected, state должен устанавливать loginUserRequest в false, а в loginUserError передаваться сообщение об ошибке', () => {
        const expectedState: IUserState = {
            isAuthChecked: false,
            data: null,
            loginUserError: testError.message,
            loginUserRequest: false
        };

        const actualState = userSlice.reducer(
            {...initialState, loginUserRequest: true},
            updateUser.rejected(testError, '', testRegisterData)
        )

        expect(actualState).toMatchObject(expectedState);
    });

    it('когда запрос getUser становиться rejected, state должен устанавливать loginUserRequest в false, isAuthChecked в true, а в loginUserError передаваться сообщение об ошибке', () => {
        const expectedState: IUserState = {
            isAuthChecked: true,
            data: null,
            loginUserError: testError.message,
            loginUserRequest: false
        };

        const actualState = userSlice.reducer(
            {...initialState, loginUserRequest: true},
            getUser.rejected(testError, '')
        )

        expect(actualState).toMatchObject(expectedState);
    });

    /* fulfilled  */
    it('когда запрос loginUser становится fulfilled, state должен устанавливать loginUserRequest в false, в data сохранять данные', () => {
        const testData: TAuthResponse = {
            success: true,
            refreshToken: 'test',
            accessToken: 'Bearer test',
            user: {
                email: 'test@test.test',
                name: 'Test'
            }
        };

        const actualState = userSlice.reducer(
            {...initialState, loginUserRequest: true},
            loginUser.fulfilled(testData, '', testLoginData)
        );

        expect(actualState).toEqual({
            isAuthChecked: true,
            data: testData.user,
            loginUserError: null,
            loginUserRequest: false
        });
    });

    it('когда запрос registerUser становится fulfilled, state должен устанавливать loginUserRequest в false, в data сохранять данные', () => {
        const testData: TAuthResponse = {
            success: true,
            refreshToken: 'test',
            accessToken: 'Bearer test',
            user: {
                email: 'test@test.test',
                name: 'Test'
            }
        };

        const actualState = userSlice.reducer(
            {...initialState, loginUserRequest: true},
            registerUser.fulfilled(testData, '', testRegisterData)
        );

        expect(actualState).toEqual({
            isAuthChecked: true,
            data: testData.user,
            loginUserError: null,
            loginUserRequest: false
        });
    });

    it('когда запрос updateUser становится fulfilled, state должен устанавливать loginUserRequest в false, в data сохранять данные', () => {
        const testData: TUserResponse = {
            success: true,
            user: {
                email: 'test@test.test',
                name: 'Test'
            }
        };

        const actualState = userSlice.reducer(
            {...initialState, loginUserRequest: true},
            updateUser.fulfilled(testData, '', testRegisterData)
        );

        expect(actualState).toEqual({
            isAuthChecked: true,
            data: testData.user,
            loginUserError: null,
            loginUserRequest: false
        });
    });

    it('когда запрос getUser становится fulfilled, state должен устанавливать loginUserRequest в false, в data сохранять данные', () => {
        const testData: TUserResponse = {
            success: true,
            user: {
                email: 'test@test.test',
                name: 'Test'
            }
        };

        const actualState = userSlice.reducer(
            {...initialState, loginUserRequest: true},
            getUser.fulfilled(testData, '')
        );

        expect(actualState).toEqual({
            isAuthChecked: true,
            data: testData.user,
            loginUserError: null,
            loginUserRequest: false
        });
    });
})