import { useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { productsReducer, productReducer } from "./reducers/products";
import Header from "./components/common/Header";
import ProductContext from "./context/ProductContext";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";

const App = () => {
  const [state, dispatch] = useReducer(productsReducer, {
    loading: true,
    products: [],
  });
  const [detailState, detailDispatch] = useReducer(productReducer, {
    loading: true,
    product: {},
  });

  return (
    <ProductContext.Provider
      value={{ state, dispatch, detailState, detailDispatch }}
    >
      <Router>
        <Header />
        <Switch>
          <Route path="/" component={HomePage} exact={true} />
          <Route path="/products/:id" component={ProductPage} exact={true} />
          <Route path="/cart/:product_id?" component={CartPage} exact={true} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ProductContext.Provider>
  );
};

export default App;
