import { createContext, useReducer, useReducer } from "react";

//for getting vs code auto-completion we are using ofject. it's not necessary
const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {}
});

//these parameters values will be passes by React
function cartReducer(state, action){
    if(action.type === 'ADD_ITEM'){
        // ... update the sate to add a meal item
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);

        const updatedItems = [...state.items];

        //if item already exists in the cart
        if(existingCartItemIndex > -1){ 
          const existingItem = state.items[existingCartItemIndex];

          const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
          };  
          
          updatedItems[existingCartItemIndex] = updatedItem;

        }else{  
           updatedItems.push({...action.item, quantity: 1});
        }
    }
    
    if(action.type === 'REMOVE_ITEM'){
      // ... remove an item from the state
    }

    return {
        ...state,
        items: updatedItems
    };
}

export  function CartContextProvider({children}){
    useReducer(cartReducer, {items: []});

    return (
        <CartContext.Provider>
            {children}
        </CartContext.Provider>
    )
}


export default CartContext;