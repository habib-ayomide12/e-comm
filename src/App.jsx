import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Account from "./pages/Account";

function App() {

  const [cartItems, setCartItems] = useState([]);

  const [wishlist, setWishlist] = useState([]);

  const [search, setSearch] = useState("");


  const addToCart = (product) => {

    setCartItems((currentItems) => {

      const existingItem =
        currentItems.find(
          (item) => item.id === product.id
        );

      if (existingItem) {

        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );

      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];

    });

  };


  const updateCartQuantity = (id, quantity) => {
    setCartItems((items) =>
      items
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    );
  };


  const removeFromCart = (id) => {

    setCartItems((items) =>
      items.filter(
        (item) => item.id !== id
      )
    );

  };


  const toggleWishlist = (product) => {

    setWishlist((currentWishlist) => {

      const exists =
        currentWishlist.some(
          (item) => item.id === product.id
        );

      if (exists) {

        return currentWishlist.filter(
          (item) => item.id !== product.id
        );

      }

      return [
        ...currentWishlist,
        product,
      ];

    });

  };


  const cartCount = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );


  return (

    <BrowserRouter>

      <div className="app-shell">

        <Navbar
          cartCount={cartCount}
          wishlistCount={wishlist.length}
          search={search}
          setSearch={setSearch}
        />

        <div className="app-shell__content">

          <Routes>

            <Route
              path="/"
              element={
                <Home
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  wishlist={wishlist}
                  search={search}
                />
              }
            />

            <Route
              path="/shop"
              element={
                <Shop
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  wishlist={wishlist}
                />
              }
            />

            <Route
              path="/product/:id"
              element={
                <ProductDetails
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  wishlist={wishlist}
                />
              }
            />

            <Route
              path="/cart"
              element={
                <Cart
                  items={cartItems}
                  onQuantityChange={updateCartQuantity}
                  onRemove={removeFromCart}
                />
              }
            />

            <Route
              path="/wishlist"
              element={
                <Wishlist
                  items={wishlist}
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                />
              }
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            <Route
              path="/account"
              element={<Account />}
            />

          </Routes>

        </div>

        <Footer />

      </div>

    </BrowserRouter>

  );
}

export default App;