
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
    getProductCart(state,action){
        const { products } = action.payload
        return {
            ...state,
            products: products
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