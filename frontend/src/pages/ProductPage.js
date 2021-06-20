import { useReducer } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import Container from "../components/common/Container";
import Detail from "../components/Detail";
import { productDetailReducer } from "../reducers/products";

const ProductPage = () => {
  const [state, dispatch] = useReducer(productDetailReducer, { product: {} });

  return (
    <Container>
      <div className="bg-yellow-500 text-white w-max px-2 py-1 rounded-md hover:bg-yellow-600">
        <Link to="/">Return to home</Link>
      </div>
      <ProductContext.Provider value={{ state, dispatch }}>
        <Detail />
      </ProductContext.Provider>
    </Container>
  );
};

export default ProductPage;
