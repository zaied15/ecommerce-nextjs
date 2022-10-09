import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import React from "react";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState();
  const [progress, setProgress] = useState(0);
  const [oid, setOid] = useState("");
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      localStorage.clear();
    }

    const token = localStorage.getItem("token");
    if (token) {
      setUser({ value: token });
      setKey(Math.random());
    }

    const hours = 1;
    const now = new Date().getTime();
    const setupTime = localStorage.getItem("setupTime");
    if (setupTime == null) {
      localStorage.setItem("setupTime", now);
    } else {
      if (now - setupTime > hours * 60 * 60 * 1000) {
        setUser({ value: null });
        localStorage.removeItem("token");
        localStorage.setItem("setupTime", now);
      }
    }
  }, [router.query]);

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));

    let subT = 0;
    const keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subT += myCart[keys[i]]?.price * myCart[keys[i]]?.qty;
    }
    setSubTotal(subT.toFixed(2));
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
  };

  const buyNow = (title, qty, price, name, size, variant) => {
    let newCart = {};
    newCart[title] = { qty, price, name, size, variant };
    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
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
    let newCart = cart;
    delete newCart[title];
    setCart(newCart);
    saveCart(newCart);
    console.log(title);
    console.log(newCart);
  };

  return (
    <>
      <LoadingBar
        color="#007aff"
        progress={progress}
        waitingTime={500}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar
        key={key}
        user={user}
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
        buyNow={buyNow}
        {...pageProps}
      />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      ></ToastContainer>
      <Footer></Footer>
    </>
  );
}

export default MyApp;
