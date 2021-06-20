import axios from "axios";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST } from "../../constants/order";
import OrderContext from "../../context/OrderContext";
import Alert from "../common/Alert";

const Order = ({user}) => {
  const { state, dispatch } = useContext(OrderContext);
  const { cartItems, shippingAddress, paymentMethod } = state;
  console.log(cartItems)
  const total = cartItems.reduce(
    (acc, item) => (acc += item.price * item.qty),
    0
  );
  const shippingPrice = total < 100 ? 100 : 0;
  const tax = (total + shippingPrice) * 0.15;
  const taxPrice = tax.toFixed(2);
  const totalPrice = (total + shippingPrice + tax).toFixed(2);
  const handlePlaceOrder = async () => {
    const order = {
      orderItems: cartItems,
      paymentMethod,
      shippingPrice,
      taxPrice,
      totalPrice,
      user: user
    };
    dispatch({ type: ORDER_CREATE_REQUEST });
    try {
      const { data } = await axios.post("/api/orders", order);
      dispatch({ type: ORDER_CREATE_REQUEST, payload: data });
    } catch (e) {
      dispatch({ type: ORDER_CREATE_FAIL, payload: e.response.data });
    }
  };
  useEffect(() => {

  },[])

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="md:col-span-3">
        <div className="border-b-2 p-4">
          <h2 className="text-4xl">Shipping</h2>

          <p>
            <span className="font-black">Method</span>
            {shippingAddress.address},{shippingAddress.city},
            {shippingAddress.postalCode},{shippingAddress.country}
          </p>
        </div>
        <div className="border-b-2 p-4">
          <h2 className="text-2xl">Payment Method</h2>
          <p>
            <span className="font-black">Method</span>: {paymentMethod}
          </p>
        </div>
        <div className="p-4">
          <h2 className="text-2xl">Order Items</h2>
          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              return (
                <div
                  className="grid md:grid-cols-7 gap-2 mt-2"
                  key={item.product}
                >
                  <Link to={`/products/${item.product}`}>
                    <img src={`${item.image}`} alt={item.name} />
                  </Link>
                  <h4 className="text-xl md:col-span-3">{item.name}</h4>
                  <div className="font-black">${item.price}</div>
                  <div className="font-black">{item.qty}</div>
                  <div>${(item.price * item.qty).toFixed(2)}</div>
                </div>
              );
            })
          ) : (
            <Alert type="error">Your car is empty</Alert>
          )}
        </div>
      </div>
      <div className="h-60 border-2 p-4 rounded-md hover:bg-gray-100">
        <h4 className="text-2xl">Order Summary</h4>
        <div>
          <span className="font-black">Items: </span>
          {cartItems.reduce((acc, item) => (acc += item.qty), 0)}
        </div>
        <div>
          <span className="font-black">Shipping: </span>${shippingPrice}
        </div>
        <div>
          <span className="font-black">Tax: </span>${taxPrice}
        </div>
        <div>
          <span className="font-black">Total: </span>${totalPrice}
        </div>
        <button
          className="p-2 bg-yellow-600 text-white w-full rounded-md mt-2 focus:outline-none"
        //   onClick={handlePlaceOrder}
        >
          Place order
        </button>
      </div>
    </div>
  );
};

export default Order;
