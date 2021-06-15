import { Link } from "react-router-dom";
import Container from "../components/common/Container";

const NotFound = () => {
  return (
    <Container>
      <h1 className="text-2xl">
        Page not found <Link to="/" className="text-purple-800">Go to home page</Link>
      </h1>
    </Container>
  );
};

export default NotFound;
