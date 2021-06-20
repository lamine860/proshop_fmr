import { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import CartContext from "../../context/CartContext";
import { ADD_TO_CART, CLEAR_CART } from "../../constants/cart";
import Container from "../common/Container";
import Alert from "../common/Alert";
import CartItem from "./cartItem";
import userContext from "../../context/UserContext";

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);
  const { state: userState } = useContext(userContext);
  const { cartItems } = state;
  const [cartItemCount, setCartItemCount] = useState(null);
  const [total, setTotal] = useState(null);
  const { product_id } = useParams();
  const history = useHistory()
  const search = useLocation().search.split("=");
  const qty = search.length > 1 ? parseInt(search[1]) : null;
  const handlerClearCart = () => dispatch({ type: CLEAR_CART });
  const handleProccessToCheckout = () => {
    const to = userState.userInfo ? "/shipping" : "/login"
    history.push(to);

  }

  useEffect(() => {
    const handleProductParam = async () => {
      try {
        const { data } = await axios.get(`/api/products/${product_id}`);
        dispatch({
          type: ADD_TO_CART,
          payload: {
            product: data._id.$oid,
            qty,
            price: data.price,
            image: data.image,
            name: data.name,
            countInStock: data.quantity,
          },
        });
      } catch (e) {
        console.log(e);
      }
    };
    if (product_id) {
      handleProductParam();
      history.push("/cart");
    }
    setCartItemCount(cartItems.reduce((acc, item) => (acc += item.qty), 0));
    setTotal(
      cartItems
        .reduce((acc, item) => (acc += item.qty * item.price), 0)
        .toFixed(2)
    );
  }, [qty, dispatch, product_id, cartItems, history]);

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          {cartItems.length === 0 ? (
            <Alert>
              Sorry! Your cart is empty.{" "}
              <Link to="/" className="text-purple-800">
                Add some
              </Link>
            </Alert>
          ) : (
            <div>
              <div className="text-right">
                <button
                  className="bg-yellow-600 p-2 text-white rounded-md focus:outline-none"
                  onClick={handlerClearCart}
                >
                  Empty the card
                </button>
              </div>
              {cartItems.map((item) => {
                return (
                  <CartItem
                    key={item.product}
                    item={item}
                    dispatch={dispatch}
                    updateCartItemCount={setCartItemCount}
                  />
                );
              })}
            </div>
          )}
        </div>
        {total ? (
          <div className="border-2 p-4 rounded-md h-44">
            <div className="text-xl">{cartItemCount} Items</div>
            <div>Total: {total}</div>
            <button
              className="bg-yellow-600 p-2 text-gray-50 w-full mt-4 rounded hover:bg-yellow-500 focus:outline-none"
              onClick={() => handleProccessToCheckout()}
            >
              Proceed to checkout
            </button>
          </div>
        ) : null}
      </div>
    </Container>
  );
};

export default Cart;
