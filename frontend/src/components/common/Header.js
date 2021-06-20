import { useContext, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { USER_LOGOUT } from "../../constants/user";
import UserContext from "../../context/UserContext";
import "./Header.css";
const Header = () => {
  const dropdownRef = useRef();
  const [userInfo, setUserInfo] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory()

  const handleDropdown = () => {
    dropdownRef.current.classList.toggle("active");
  };
  const handleLogount = () => {
    dispatch({ type: USER_LOGOUT });
    localStorage.removeItem("userInfo");
    history.push('/login')

  };
  useEffect(() => {
    setUserInfo(state.userInfo);
  }, [userInfo, state]);

  return (
    <header className="container h-20 px-8 max-w-full bg-gray-600  text-white font-black flex justify-between items-center shadow-2xl ">
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
      <nav className="flex-1 flex justify-center text-sm">
        <Link to="/cart" className="ml-5 mr-4">
          <i className="fas fa-shopping-cart"></i> Cart
        </Link>
        {userInfo && userInfo.name ? (
          <div className="relative">
            <button
              className="focus:outline-none"
              onClick={() => handleDropdown()}
            >
              <i className="fas fa-user cursor-pointer"></i> {userInfo.name}
            </button>
            <div
              id="dropdown"
              className="dropdown mt-2 flex flex-col bg-white py-2 px-4 text-gray-600 absolute shadow-md rounded-md"
              ref={dropdownRef}
            >
              <Link to="/profile" className="font-medium">
                Profile
              </Link>
              <button
                className="focus:outline-none font-medium"
                onClick={handleLogount}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="mr-2">
            login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
