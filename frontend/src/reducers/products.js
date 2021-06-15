export const productsReducer = (
  state = { products: [], loading: true },
  action
) => {
  switch (action.type) {
    case "PRODUCTS_REQUEST_SUCCESS":
      return { loading: false, products: action.payload };
    case "PRODUCTS_REQUEST_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const productReducer = (
  state = { product: {}, loading: true },
  action
) => {
  switch (action.type) {
    case "PRODUCT_REQUEST_SUCCESS":
      return { loading: false, product: action.payload };
    case "PRODUCT_REQUEST_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
