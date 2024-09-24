import { createContext } from "react";

//The value that is actually produced by createContext will actually be an object that contains a React Component.
export const CartContext = createContext({
    items: [], //to get better auto-completion, we define here items (optional)
    addItemToCart: () => { },
    updateItemQuantity: ()=> {},
});