import { Link } from "react-router-dom";
import Rating from "../common/Rating";
const Product = ({ product }) => {
  return (
    <div className="ring-gray-50 shadow-xl">
      <Link to={`/products/${product._id.$oid}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="p-4">
        <div className="text-xl">{product.name}</div>
        <div className="opacity-50">{product.brand}</div>
        <p className="text-sm">{product.description}</p>
        <div className="flex justify-between">
          <span className="font-black">${product.price}</span>
          <span className="text-red-600">{product.category}</span>
        </div>
        <Rating rating={product.rating}>{product.numReviews} Reviews</Rating>
      </div>
    </div>
  );
};

export default Product;
