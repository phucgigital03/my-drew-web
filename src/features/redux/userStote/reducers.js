
const reducers = {
    updateUser(state,action){
      const infoUser = action.payload
      return {
        ...state,
        ...infoUser
      }
    }
}

export default reducers