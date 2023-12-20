export const errorAddItemFormReducer = (state: string | null, action: ChangeErrorAC): string | null => {
    switch (action.type) {
        case 'CHANGE-ERROR': {
            return action.payload.error;
        }
        default: return state;
    }
}

export type ChangeErrorAC = ReturnType<typeof changeErrorAC>

export const changeErrorAC = (error: string | null) => {
    return {
        type: 'CHANGE-ERROR',
        payload: {
            error
        }
    } as const
}