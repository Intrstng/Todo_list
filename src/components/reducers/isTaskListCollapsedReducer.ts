export const isTaskListCollapsedReducer = (state: boolean, action: ChangeIsTaskListCollapsed): boolean => {
    switch (action.type) {
        case 'CHANGE-IS-TASK-LIST-COLLAPSED': {
            return action.payload.isCollapsed;
        }
        default: return state;
    }
}

export type ChangeIsTaskListCollapsed = ReturnType<typeof changeIsTaskListCollapsedAC>

export const changeIsTaskListCollapsedAC = (isCollapsed: boolean) => {
    return {
        type: 'CHANGE-IS-TASK-LIST-COLLAPSED',
        payload: {
            isCollapsed
        }
    } as const
}