
const reducers = {
    openCart(state,action){
        return {
            ...state,
            showCart: true,
        }
    },
    hiddenCart(state,action){
        return {
            ...state,
            showCart: false,
        }
    }
}

export default reducers