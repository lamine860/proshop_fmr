import { useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/common/Header";
import UserContext from "./context/UserContext";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import NotFound from "./pages/NotFound";
import { userLoginReducer } from "./reducers/user";
import ShippingPage from "./pages/ShippingPage";
import OrderPage from './pages/OrderPage'

const App = () => {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  const [state, dispatch] = useReducer(userLoginReducer, { userInfo });
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Header />
        <Switch>
          <Route path="/" component={HomePage} exact={true} />
          <Route path="/products/:id" component={ProductPage} exact={true} />
          <Route path="/cart/:product_id?" component={CartPage} exact={true} />
          <Route path="/login" component={LoginPage} exact={true} />
          <Route path="/register" component={RegisterPage} exact={true} />
          <Route path="/shipping" component={ShippingPage} exact={true} />
          <Route path="/payment-method" component={PaymentMethodPage} exact={true} />
          <Route path="/place-order" component={OrderPage} exact={true} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
