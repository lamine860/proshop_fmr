import * as cartConstants from "../constants/cart";
export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART:
      const newItem = action.payload;
      const itemExist = state.cartItems.find(
        (item) => item.product === newItem.product
      );
      let updatedState = null;
      if (itemExist) {
        updatedState = {
          ...state,

          cartItems: [
            ...state.cartItems.map((item) =>
              item.product === newItem.product ? newItem : item
            ),
          ],
        };
      } else {
        updatedState = {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
      localStorage.setItem("cartItems", JSON.stringify(updatedState.cartItems));
      return updatedState;
    case cartConstants.REMOVE_FROM_CART:
      const itemProduct = action.payload;
      const filtredState = {
        ...state,
        cartItems: [
          ...state.cartItems.filter((item) => item.product !== itemProduct),
        ],
      };
      localStorage.setItem("cartItems", JSON.stringify(filtredState.cartItems));
      return filtredState;
    case cartConstants.CLEAR_CART:
      localStorage.removeItem("cartItems");
      return {
      ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
