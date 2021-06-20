import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from "../constants/order";

export const orderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
