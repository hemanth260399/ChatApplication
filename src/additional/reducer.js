let userData = JSON.parse(localStorage.getItem("userInfo"))
let autenctionState = Boolean(userData)
const initalvalue = {
    userInfo: userData,
    autenctionState: autenctionState,
}
export const ReduxData = (state = initalvalue, action) => {
    switch (action.type) {
        case "SET_USER_INFO": {
            return {
                ...state,
                userInfo: action.payload,
                autenctionState: true
            }
        }
        case "LOGOUT":
            return { ...state, userInfo: action.payload, autenctionState: false }
        default:
            return state
    }
}
