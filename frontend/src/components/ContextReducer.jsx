import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext()
const CartDispatchContext = createContext()

const reducer = (state,action)=>{
        switch (action.type) {
               
            case "ADD":
                    const existingItem = state.find(item => item.id === action.id);
                    if (existingItem) {
                        return state.map(item =>
                            item.id === action.id ? { ...item, qty: item.qty + action.qty } : item
                        );
                    }
                    return [...state, { id: action.id, name: action.name, price: action.price, img: action.img, qty: action.qty }];
                    break;
            case "REMOVE":
                    return state.filter((_, idx) => idx !== action.index);
            case "DROP":
                    let empArr = []
                    return empArr
            default:
                return state
                
        }
}

export const CartProvider = ({children})=>{
    const[state,dispatch] = useReducer(reducer,[])
    return(
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext)
export const useDispatchCart = () => useContext(CartDispatchContext)