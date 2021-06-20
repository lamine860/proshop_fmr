import { useReducer } from "react";
import Container from "../components/common/Container";
import Home from "../components/Home";
import ProductContext from "../context/ProductContext";
import { productsReducer } from "../reducers/products";
const HomePage = () => {
  const [state, dispatch] = useReducer(productsReducer, { products: [] });
  return (
    <Container>
      <ProductContext.Provider value={{ dispatch, state }}>
        <Home />
      </ProductContext.Provider>
    </Container>
  );
};

export default HomePage;
