import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="container h-20 px-5 max-w-full bg-gray-600  text-white font-black flex justify-between items-center shadow-2xl ">
      <div className="flex-1">
        <Link to="/" className="w-8">
          <i className="fas fa-shopping-cart text-4xl"></i>
        </Link>
      </div>
      <nav className="flex-1">
        <form>
          <input
            type="text"
            placeholder="Search"
            className="h-8 w-full rounded focus:outline-none px-4"
          />
        </form>
      </nav>
      <nav className="flex-1 flex justify-end">
        <Link to="/cart" className="ml-5 mr-2">
          Cart
        </Link>
        <Link to="/login" className="mr-2">
          login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
