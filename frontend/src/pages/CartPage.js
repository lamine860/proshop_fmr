import { useReducer } from "react";
import Cart from "../components/cart/Cart";
import Container from "../components/common/Container";
import CartContext from "../context/CartContext";
import { cartReducer } from "../reducers/cart";

const CartPage = (props) => {
  let fromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : []
  const cart = {
    cartItems: fromStorage
  };
  const [state, dispatch] = useReducer(cartReducer, cart);

  return (
    <Container>
      <h1 className="text-2xl">Your shopping cart</h1>
      <CartContext.Provider value={{ state, dispatch }}>
        <Cart {...props} />
      </CartContext.Provider>
    </Container>
  );
};

export default CartPage;
