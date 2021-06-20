import { useReducer } from "react";
import Shipping from "../components/cart/Shipping";
import CheckoutStep from "../components/common/CheckoutStep";
import Container from "../components/common/Container";
import CartContext from "../context/CartContext";
import { cartReducer } from "../reducers/cart";

const ShippingPage = () => {
  const shippingAddress = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};
  const [state, dispatch] = useReducer(cartReducer, { shippingAddress });
  return (
    <Container>
      <CheckoutStep step1 step2 />
      <h2 className="text-4xl text-center">Shipping Address</h2>
      <CartContext.Provider value={{ state, dispatch }}>
        <Shipping />
      </CartContext.Provider>
    </Container>
  );
};

export default ShippingPage;
