const SET_STATUS = 'APP/SET-STATUS';
const SET_ERROR = 'APP/SET-ERROR';

const appInitialState: AppInitialState = {
    status: 'idle',
    error: null
}

export const appReducer = (state: AppInitialState = appInitialState, action: AppReducer): AppInitialState => {
    const {type, payload} = action;
    switch (type) {
        case SET_STATUS: {
            const {status} = payload;
            return {...state, status};
        }
        case SET_ERROR: {
            const {error} = payload;
            return {...state, error};
        }

        default: return state;
    }
}

// ACTION CREATORS
export const setAppStatusAC = (status: Status) => ({
    type: SET_STATUS,
    payload: {
        status
    }
}) as const

export const setAppErrorAC = (error: string | null) => ({
    type: SET_ERROR,
    payload: {
        error
    }
}) as const

// TYPES
export type Status = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppInitialState = {
    status: Status
    error: string | null
}

export type AppReducer = SetAppStatusAC | SetAppErrorAC

type SetAppStatusAC = ReturnType<typeof setAppStatusAC>
type SetAppErrorAC = ReturnType<typeof setAppErrorAC>