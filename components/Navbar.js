import Image from "next/image";
import React, { useRef, useState } from "react";
import Link from "next/link";
import logo from "../public/logo.jpg";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiFillShopping,
} from "react-icons/ai";
import { MdAccountBox } from "react-icons/md";
import { useRouter } from "next/router";

const Navbar = ({
  user,
  cart,
  addToCart,
  decreaseItem,
  increaseItem,
  clearCart,
  subTotal,
  removeFromCart,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef();
  const router = useRouter();

  const toggleCart = () => {
    if (ref.current.classList.contains("hidden")) {
      ref.current.classList.remove("hidden");
      ref.current.classList.add("block");
    } else if (!ref.current.classList.contains("hidden")) {
      ref.current.classList.remove("none");
      ref.current.classList.add("hidden");
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    user.value = null;
    router.push("/login");
  };
  return (
    <nav className="flex flex-col px-2 md:flex-row md:justify-start items-center shadow-md my-2 md:py-2 sticky top-0 z-10 bg-white">
      <div className="md:mx-5">
        <Link href="/">
          <a>
            <Image src={logo} alt="" width={200} height={60} />
          </a>
        </Link>
      </div>
      <div>
        <ul className="flex space-x-3">
          <li>
            <Link href="/tshirt">T-shrit</Link>
          </li>
          <li>
            <Link href="/watches">Watches</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li className="md:hidden">
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </div>

      {/* Login and Cart Counter Area */}
      <div className="absolute right-5 text-xl flex space-x-2 items-center">
        {user.value ? (
          <span
            className="cursor-pointer"
            onMouseOver={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            <MdAccountBox className="cursor-pointer text-2xl" />
            {dropdown && (
              <div className="absolute right-5 top-5 mt-1 bg-indigo-500 text-white p-2 w-32 text-sm rounded">
                <ul className="mx-2">
                  <Link href={"/myaccount"}>
                    <li className="my-1 hover:text-indigo-900">My account</li>
                  </Link>
                  <Link href={"/orders"}>
                    <li className="my-1 hover:text-indigo-900">Orders</li>
                  </Link>
                  <span onClick={logout}>
                    <li className="my-1 hover:text-indigo-900">Logout</li>
                  </span>
                </ul>
              </div>
            )}
          </span>
        ) : (
          <Link href={"/login"}>
            <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-1 px-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Login
            </button>
          </Link>
        )}
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="cursor-pointer text-2xl"
        />
        <span className="absolute text-sm -right-4 -top-2 bg-indigo-500 rounded-full text-white w-5 h-5 text-center">
          {Object.keys(cart).length}
        </span>
      </div>

      {/* Side Cart Area Started */}
      <div
        ref={ref}
        className="bg-slate-800 h-[100vh] w-96 md:w-[50%] absolute -top-2 right-0 text-white transition-transform hidden overflow-y-scroll"
      >
        <span
          className="absolute top-3 right-2 text-xl p-1 cursor-pointer bg-red-600"
          onClick={toggleCart}
        >
          <AiFillCloseCircle />
        </span>
        <div className="py-12 px-8 ">
          {Object.keys(cart).length == 0 && <p>Your cart is empty!</p>}
          {Object.keys(cart).map((k) => {
            return (
              <div
                key={k}
                className="flex justify-between items-center space-x-2 my-2"
              >
                <ol className="flex items-center space-x-2 w-[70%]">
                  <span
                    className="cursor-pointer text-lg bg-red-600"
                    onClick={() => removeFromCart(k)}
                  >
                    <AiFillCloseCircle />
                  </span>{" "}
                  <li className="text-lg font-semibold">
                    {cart[k].name} ({cart[k].size}/{cart[k].variant}){" "}
                  </li>
                </ol>
                <div className="w-[15%] text-lg">
                  <span>${cart[k].price * cart[k].qty}</span>
                </div>
                <div className="flex items-center justify-end text-2xl pl-2 w-[15%]">
                  <AiFillMinusCircle
                    onClick={() =>
                      decreaseItem(
                        k,
                        1,
                        cart[k].price,
                        cart[k].name,
                        cart[k].size,
                        cart[k].variant
                      )
                    }
                    className="cursor-pointer"
                  />
                  <span className="mx-1">{cart[k].qty}</span>
                  <AiFillPlusCircle
                    onClick={() => increaseItem(k, 1)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            );
          })}
        </div>
        {Object.keys(cart).length !== 0 && (
          <div className="ml-4 mb-3 text-xl font-semibold">
            <p>Sub Total: ${subTotal}</p>
          </div>
        )}
        {Object.keys(cart).length !== 0 && (
          <div className="flex justify-start ml-4 space-x-3 mb-5">
            <Link href="/checkout">
              <button
                onClick={toggleCart}
                className=" text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded flex justify-center items-center"
              >
                <AiFillShopping />
                Checkout
              </button>
            </Link>
            <button
              onClick={clearCart}
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
