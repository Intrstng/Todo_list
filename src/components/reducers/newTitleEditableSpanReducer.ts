export const newTitleEditableSpanReducer = (state: string, action: ChangeNewTitleAC): string => {
    switch (action.type) {
        case 'CHANGE-NEW-TITLE': {
            return action.payload.title;
        }
        default: return state;
    }
}

export type ChangeNewTitleAC = ReturnType<typeof changeNewTitleAC>

export const changeNewTitleAC = (title: string) => {
    return {
        type: 'CHANGE-NEW-TITLE',
        payload: {
            title
        }
    } as const
}