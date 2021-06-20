import Container from "./Container";
import { Link } from "react-router-dom";

const CheckoutStep = ({ step1, step2, step3, step4 }) => {
  return (
    <Container>
      <div className="grid grid-cols-4 gap-4 bg-gray-200 w-1/2 mx-auto">
        {step1 ? (
          <Link to="/login" className="bg-green-500 text-white text-center">
            Login
          </Link>
        ) : (
          <Link to="/login" className="bg-gray-500 text-white text-center">
            Login
          </Link>
        )}
        {step2 ? (
          <Link to="/shipping" className="bg-green-500 text-white text-center">
            Shipping
          </Link>
        ) : (
          <Link to="/shipping" className="bg-gray-500 text-white text-center">
            Shipping
          </Link>
        )}
        {step3 ? (
          <Link to="/payment-method" className="bg-green-500 text-white text-center">
            Meyment Method
          </Link>
        ) : (
          <Link to="/payment-method" className="bg-gray-500 text-white text-center">
            Payment Method
          </Link>
        )}
        {step4? (
          <Link to="/place-order" className="bg-green-500 text-white text-center">
            Place Order
          </Link>
        ) : (
          <Link to="/place-order" className="bg-gray-500 text-white text-center">
            Place Order
          </Link>
        )}
      </div>
    </Container>
  );
};

export default CheckoutStep;
