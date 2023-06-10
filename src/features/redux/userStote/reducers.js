
const reducers = {
    updateEmail(state,action){
        const newState = {
          ...state,
          email: action.payload.email
        }
        return newState
    }
}

export default reducers