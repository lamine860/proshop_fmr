import { useState } from "react";
import { Link } from "react-router-dom";
import { REMOVE_FROM_CART, ADD_TO_CART } from "../../constants/cart";
const CartItem = ({ item, dispatch, updateCartItemCount }) => {
  const [total, setTotal] = useState(item.price * item.qty);
  const [qty, setQty] = useState(item.qty);

  const handlerRemoveItem = () => {
    dispatch({ type: REMOVE_FROM_CART, payload: item.product });
  };
  const handleQtyChange = (qty, item) => {
    setQty(qty);
    setTotal(qty * item.price);
    dispatch({
      type: ADD_TO_CART,
      payload: { ...item, qty: qty },
    });
    updateCartItemCount(qty, item);
  };

  return (
    <div className="grid grid-cols-6 gap-2 mt-2">
      <Link to={`/products/${item.product}`}>
        <img src={item.image} alt={item.name} className="rounded-xl w-1/2" />
      </Link>
      <div>{item.name}</div>
      <div>
        <select
          name="qty"
          id="qty"
          onChange={(e) => handleQtyChange(parseInt(e.target.value), item)}
          value={qty}
          className="p-2 ml-4 focus:outline-none rounded-md"
        >
          {[...Array(item.countInStock)].map((_, i) => {
            return (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        Price : <span className="font-black">${item.price}</span>
      </div>
      <div>
        Total : <span className="font-black">${total.toFixed(2)}</span>
      </div>
      <div>
        <button
          className="text-red-600 focus:outline-none text-sm"
          onClick={handlerRemoveItem}
        >
          Remove from cart
        </button>
      </div>
    </div>
  );
};

export default CartItem;
