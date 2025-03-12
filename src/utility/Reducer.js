import { Type } from "./action.type";

export const initialState = {
    basket: [],
    user: null
};

export const reducer = (state, action) => {
    switch (action.type) {
        case Type.ADD_TO_BASKET:
            const existingItem = state.basket.find((item) => item.id === action.item.id);
            if (!existingItem) {
                return {
                    ...state,
                    basket: [...state.basket, { ...action.item, amount: 1 }] 
                };
            } else {
                const updatedBasket = state.basket.map((item) =>
                    item.id === action.item.id ? { ...item, amount: item.amount + 1 } : item
                );
                return {
                    ...state,
                    basket: updatedBasket
                };
            }

        case Type.REMOVE_FROM_BASKET:
            const index = state.basket.findIndex(item => item.id === action.id);
            if (index >= 0) {
                let updatedBasket = [...state.basket]; // ✅ Clone array
                if (updatedBasket[index].amount > 1) {
                    updatedBasket[index] = { ...updatedBasket[index], amount: updatedBasket[index].amount - 1 };
                } else {
                    updatedBasket.splice(index, 1); // ✅ Remove item if quantity is 1
                }
                return {
                    ...state,
                    basket: updatedBasket
                };
            }
            return state;
        case Type.SET_USER:
            return {
                ...state,
                user:action.user
            } 
        case Type.EMPTY_BASKET:
            return{
                ...state,
                basket: [],
            }       

        default:
            return state;
    }
};
