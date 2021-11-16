import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/shipping" component={ShippingScreen} />
        <Route exact path="/payment" component={PaymentScreen} />
        <Route exact path="/placeorder" component={PlaceOrderScreen} />
        <Route exact path="/order/:id" component={OrderScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route exact path="/cart/:id?" component={CartScreen} />
        <Route exact path="/admin/userlist" component={UserListScreen} />
        <Route exact path="/admin/productlist" component={ProductListScreen} />
        <Route
          exact
          path="/admin/productlist/:pageNumber"
          component={ProductListScreen}
        />
        <Route exact path="/admin/orderlist" component={OrderListScreen} />
        <Route
          exact
          path="/admin/product/:id/edit"
          component={ProductEditScreen}
        />
        <Route exact path="/admin/user/:id/edit" component={UserEditScreen} />
        <Route path="/search/:keyword" component={HomeScreen} exact />
        <Route path="/page/:pageNumber" component={HomeScreen} />
        <Route
          path="/search/:keyword/page/:pageNumber"
          component={HomeScreen}
        />
        <Route exact path="/" component={HomeScreen} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
