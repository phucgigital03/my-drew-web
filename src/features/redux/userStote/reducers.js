
const reducers = {
    updateUser(state,action){
      const infoUser = action.payload
      const {roles, ...userSave} = infoUser
      return {
        ...state,
        ...userSave
      }
    },
    updateAccessToken(state,action){
      const accessToken = action.payload
      console.log("new AccessToken",accessToken)
      return {
        ...state,
        accessToken: accessToken
      }
    },
    deleUser(state,action){
      return {};
    }
}

export default reducers