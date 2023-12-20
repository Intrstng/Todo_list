export const editSpanReducer = (state: boolean, action: ActivateEditAC): boolean => {
    switch (action.type) {
        case 'ACTIVATE-EDIT': {
            return action.payload.isEdit;
        }
        default: return state
    }
}

type ActivateEditAC = ReturnType<typeof activateEditAC>

export const activateEditAC = (isEdit: boolean) => {
    return {
        type: 'ACTIVATE-EDIT',
        payload: {isEdit}
    } as const
}


