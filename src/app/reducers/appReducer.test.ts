import { AppInitialState, appReducer, setAppErrorAC, setAppStatusAC, Status } from "./appReducer"

let status: Status;
let error: string | null;
let newError_1: string | null;
let newError_2: string | null;
let newStatus_1: Status;
let newStatus_2: Status;
let appState: AppInitialState

// We can use tests without beforeEach() because we work with PURE functions
beforeEach(() => {
    status = 'idle';
    error = null;
    newError_1 = 'some error text';
    newError_2 = null;
    newStatus_1 = 'succeeded';
    newStatus_2 = 'failed';

    appState = {
        status: status,
        error: error,
        isInitialized: false
    }
})


// ------------------- 'SET_STATUS' ------------------- //

test ('appReducer should SET_STATUS', () => {
    // action
    const newState_1 = appReducer(appState, setAppStatusAC(newStatus_1));
    const newState_2 = appReducer(appState, setAppStatusAC(newStatus_2));
    // expectation
    expect(appState.status).toBe(status);
    expect(newState_1.status).toBe(newStatus_1);
    expect(newState_2.status).toBe(newStatus_2);
})


// ------------------- 'SET_ERROR' ------------------- //

test ('appReducer should SET_ERROR', () => {
    // action
    const newState_1 = appReducer(appState, setAppErrorAC(newError_1));
    const newState_2 = appReducer(appState, setAppErrorAC(newError_2));
    // expectation
    expect(appState.error).toBe(error);
    expect(newState_1.error).toBe(newError_1);
    expect(newState_2.error).toBe(newError_2);
})