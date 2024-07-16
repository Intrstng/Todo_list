import { authReducer, LoginInitialState, setIsLoggedInAC } from './loginReducer';

let isLoggedIn: boolean;
let newIsLoggedIn: boolean;
let loginState: LoginInitialState

// We can use tests without beforeEach() because we work with PURE functions
beforeEach(() => {
    isLoggedIn = false;
    newIsLoggedIn = true;
    loginState = {
        isLoggedIn: isLoggedIn
    }
})

// ------------------- 'SET_IS_LOGGED_IN' ------------------- //

test ('authReducer should SET_IS_LOGGED_IN', () => {
    // action
    const newState_1 = authReducer(loginState, setIsLoggedInAC({isLoggedIn: newIsLoggedIn}));
    // expectation
    expect(loginState.isLoggedIn).toBe(isLoggedIn);
    expect(newState_1.isLoggedIn).toBe(newIsLoggedIn);
})