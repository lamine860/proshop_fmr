import { useReducer } from "react";
import CheckoutStep from "../components/common/CheckoutStep";
import Container from "../components/common/Container";
import { cartReducer } from "../reducers/cart";
import CartContext from "../context/CartContext";
import PaymentMethod from "../components/cart/PaymentMethod";

const PaymentMethodPage = () => {
  const paymentMethod = localStorage.getItem("paymentMethod")
    ? localStorage.getItem("paymentMethod")
    : "";
  const [state, dispatch] = useReducer(cartReducer, { paymentMethod });
  return (
    <Container>
      <CheckoutStep step1 step2 step3 />
      <h2 className="text-4xl text-center">Payment Method</h2>
      <CartContext.Provider value={{ state, dispatch }}>
        <PaymentMethod />
      </CartContext.Provider>
    </Container>
  );
};

export default PaymentMethodPage;
