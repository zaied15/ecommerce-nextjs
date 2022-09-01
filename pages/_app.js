import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    console.log("I am running from _app.js");
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
  }, []);

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subT = 0;
    const keys = Object.keys(cart);
    for (let i = 0; i < keys.length; i++) {
      subT += myCart[keys[i]]?.price * myCart[keys[i]]?.qty;
    }
    setSubTotal(subT);
  };

  const addToCart = (title, qty, price, name, size, variant) => {
    let newCart = cart;
    if (title in cart) {
      newCart[title].qty = cart[title].qty + qty;
    } else {
      newCart[title] = { qty: 1, price, name, size, variant };
    }
    setCart(newCart);
    saveCart(newCart);
    console.log(newCart);
    console.log(cart);
  };

  const decreaseItem = (title, qty, price, name, size, variant) => {
    let newCart = cart;
    if (title in cart) {
      newCart[title].qty = cart[title].qty - qty;
    }
    if (newCart[title].qty <= 0) {
      delete newCart[title];
    }
    setCart(newCart);
    saveCart(newCart);
  };
  const increaseItem = (title, qty) => {
    let newCart = cart;
    if (title in cart) {
      newCart[title].qty = cart[title].qty + qty;
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };
  const removeFromCart = (title) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    delete newCart[title];
    setCart(newCart);
    saveCart(newCart);
    console.log(title);
    console.log(newCart);
  };

  return (
    <>
      <Navbar
        cart={cart}
        addToCart={addToCart}
        decreaseItem={decreaseItem}
        increaseItem={increaseItem}
        clearCart={clearCart}
        subTotal={subTotal}
        removeFromCart={removeFromCart}
      ></Navbar>
      <Component
        cart={cart}
        addToCart={addToCart}
        decreaseItem={decreaseItem}
        increaseItem={increaseItem}
        clearCart={clearCart}
        subTotal={subTotal}
        removeFromCart={removeFromCart}
        {...pageProps}
      />
      <Footer></Footer>
    </>
  );
}

export default MyApp;
