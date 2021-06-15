import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import ProductContext from "../context/ProductContext";
import Rating from "../components/common/Rating";
import Alert from "../components/common/Alert";
import Loader from "../components/common/Loader";
import Container from "../components/common/Container";

const ProductPage = ({ history }) => {
  const [qty, setQty] = useState(1);
  const {
    detailState: { product, loading, error },
    detailDispatch,
  } = useContext(ProductContext);
  const { id } = useParams();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        detailDispatch({ type: "PRODUCT_REQUEST_SUCCESS", payload: data });
      } catch (e) {
        detailDispatch({
          type: "PRODUCT_REQUEST_FAIL",
          payload: e.response.data,
        });
      }
    };
    fetchProducts();
  }, [id, detailDispatch]);
  const handleQtyChange = (e) => {
    setQty(e.target.value);
  };
  const handleAdToCart = () => {
    history.push(`/cart/${product._id.$oid}?qty=${qty}`);
  };

  return (
    <Container>
      <div className="bg-yellow-500 text-white w-max px-2 py-1 rounded-md hover:bg-yellow-600">
        <Link to="/">Return to home</Link>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert type="error">{error.message} </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-5  gap-4 mt-4">
          <img
            src={product.image}
            alt={product.name}
            className="md:col-span-2"
          />
          <div className="md:col-span-2">
            <h1 className="text-xl">{product.name}</h1>
            <div>
              Category:{" "}
              <span className="text-yellow-600">{product.category}</span>
            </div>
            <Rating rating={product.rating}>
              {product.numReviews} Reviews
            </Rating>
            <div className="text-2xl font-black">${product.price}</div>
            <p className="text-sm mt-2">{product.description}</p>
            <div>
              Brand: <span className="text-yellow-600">{product.brand}</span>
            </div>
          </div>
          <div className="border-2 border-yellow-500 rounded-md p-4 hover:bg-gray-100 h-44">
            <div>
              Status:{" "}
              {parseInt(product.countInStock) > 0 ? (
                <span>In stock </span>
              ) : (
                <span className="text-red-500">Out of stock </span>
              )}
              <div>
                Price: <span className="text-xl">${product.price}</span>
              </div>
              <div>
                {product.countInStock && (
                  <>
                    Quanttity:
                    <select
                      name="qty"
                      id="qty"
                      value={qty}
                      onChange={(e) => handleQtyChange(e)}
                      className="p-2 ml-4 focus:outline-none rounded-md"
                    >
                      {[...Array(product.quantity)].map((_, i) => {
                        return (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        );
                      })}
                    </select>
                  </>
                )}
                <div className="mt-4">
                  <button
                    disabled={product.countInStock === 0}
                    type="button"
                    className="bg-yellow-500  text-white py-2 px-4 rounded w-full focus:outline-none"
                    onClick={handleAdToCart}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProductPage;
