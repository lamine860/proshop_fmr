import { useContext, useEffect, useReducer } from "react";
import { useHistory } from "react-router";
import CheckoutStep from "../components/common/CheckoutStep";
import Container from "../components/common/Container";
import UserContext from "../context/UserContext";
import { orderReducer } from "../reducers/order";
import OrderContext from "../context/OrderContext";
import Order from "../components/order/Order";

const OrderPage = () => {
  const history = useHistory();

  const {
    state: { userInfo },
  } = useContext(UserContext);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login?redirect=place-order");
    }
  }, [userInfo, history]);
  const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  const shippingAddress = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : [];
  const paymentMethod = localStorage.getItem("paymentMethod")
    ? localStorage.getItem("paymentMethod")
    : "";
  const [state, dispatch] = useReducer(orderReducer, {
    cartItems,
    paymentMethod,
    shippingAddress,
  });
  return (
    <Container>
      <CheckoutStep step1 step2 step3 step4 />
      <OrderContext.Provider value={{ state, dispatch }}>
        <Order user={userInfo} />
      </OrderContext.Provider>
    </Container>
  );
};

export default OrderPage;
