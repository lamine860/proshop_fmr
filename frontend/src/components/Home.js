import { useEffect, useContext } from "react";
import Product from "../components/products/product";
import ProductContext from "../context/ProductContext";
import axios from "axios";
import Loader from "../components/common/Loader";
import Container from "../components/common/Container";
const Home = () => {
  const {
    state: { products, loading, error },
    dispatch,
  } = useContext(ProductContext);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      dispatch({ type: "PRODUCTS_REQUEST_SUCCESS", payload: data });
    };
    fetchProducts();
  }, [dispatch]);
  return (
    <Container>
      <h1 className="text-3xl">Latest product</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>Error</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((product) => {
            return <Product key={product._id.$oid} product={product} />;
          })}
        </div>
      )}
    </Container>
  );
};

export default Home;
