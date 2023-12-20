export const currentTasksQuantityToShowReducer = (state: number, action: ChangeCurrentTasksQuantityToShowAC): number => {
    switch (action.type) {
        case 'CHANGE-CURRENT-TASKS-QUANTITY-TO-SHOW': {
            return action.payload.value;
        }
        default: return state;
    }
}

export type ChangeCurrentTasksQuantityToShowAC = ReturnType<typeof changeCurrentTasksQuantityToShowAC>

export const changeCurrentTasksQuantityToShowAC = (value: number) => {
    return {
        type: 'CHANGE-CURRENT-TASKS-QUANTITY-TO-SHOW',
        payload: {
            value
        }
    } as const
}