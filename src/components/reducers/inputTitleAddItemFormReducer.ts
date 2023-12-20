export const inputTitleAddItemFormReducer = (state: string, action: ChangeInputTitle): string => {
    switch (action.type) {
        case 'CHANGE-INPUT-TITLE': {
            return action.payload.newInputTitle;
        }
        default: return state;
    }
}

export type ChangeInputTitle = ReturnType<typeof changeInputTitleAC>

export const changeInputTitleAC = (newInputTitle: string) => {
    return {
        type: 'CHANGE-INPUT-TITLE',
        payload: {
            newInputTitle
        }
    } as const
}