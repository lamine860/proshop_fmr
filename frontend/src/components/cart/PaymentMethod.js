import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { SAVE_PAYMENT_METHOD } from "../../constants/cart";
import CartContext from "../../context/CartContext";
import UserContext from "../../context/UserContext";
import ButtonField from "../common/ButtonFiled";
import RadioField from "../common/RadioField";
const PaymentMethod = () => {
  const {
    state: { userInfo },
  } = useContext(UserContext);
  const { state: paymentState, dispatch } = useContext(CartContext);
  const [method, setMethod] = useState(paymentState.paymentMethod ? paymentState.paymentMethod: "no payment method");
  const history = useHistory();
  useEffect(() => {
    if (!userInfo) {
      history.push("/login?redirect=payment-method");
    }
  }, [userInfo, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: SAVE_PAYMENT_METHOD, payload: method });
    localStorage.setItem("paymentMethod", method);
    history.push("/place-order");
  };
  return (
    <form
      className="border-2 rounded-md md:w-1/2 mx-auto mt-8 p-4 bg-gray-300"
      onSubmit={(e) => handleSubmit(e)}
    >
      <legend>Select payment</legend>
      <RadioField
        name="paymentMethod"
        checked={method === "paypal"}
        value="paypal"
        label="Paypal"
        onChange={setMethod}
      />
      <RadioField
        name="paymentMethod"
        checked={method === "stripe"}
        value="stripe"
        label="Stripe"
        onChange={setMethod}
      />
      <RadioField
        name="paymentMethod"
        checked={method === "no payment method"}
        value="no payment method"
        label="no payment method"
        onChange={setMethod}
      />
      <ButtonField value="Save" />
    </form>
  );
};

export default PaymentMethod;
