
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
    },
    clearProduct(state,action){
        return {
            ...state,
            showCart: false,
            products: [],
        }
    }
}

export default reducers