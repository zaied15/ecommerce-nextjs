import Image from "next/image";
import React, { useRef } from "react";
import Link from "next/link";
import logo from "../public/logo.jpg";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiFillShopping,
} from "react-icons/ai";

const Navbar = () => {
  const ref = useRef();
  const toggleCart = () => {
    if (ref.current.classList.contains("hidden")) {
      ref.current.classList.remove("hidden");
      ref.current.classList.add("block");
    } else if (!ref.current.classList.contains("hidden")) {
      ref.current.classList.remove("none");
      ref.current.classList.add("hidden");
    }
  };
  return (
    <nav className="flex flex-col justify-center items-center md:flex-row md:justify-start shadow-md my-2 py-2">
      <div className="mx-5">
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
            <Link href="/mugs">Mugs</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
        </ul>
      </div>
      <div onClick={toggleCart} className="absolute right-2 cursor-pointer">
        <AiOutlineShoppingCart />
      </div>
      <div
        ref={ref}
        className="bg-slate-800 h-full w-80 absolute top-0 right-0 text-white transition-transform hidden"
      >
        <span
          className="absolute top-3 right-2 text-2xl cursor-pointer"
          onClick={toggleCart}
        >
          <AiFillCloseCircle />
        </span>
        <div className="py-12 px-8 flex justify-between items-center space-x-2">
          <ol className="list-decimal">
            <li>T-shirt-Cotton</li>
          </ol>
          <div className="flex items-center justify-end text-lg pl-2">
            <AiFillMinusCircle className="cursor-pointer" />
            <span className="mx-1">1</span>
            <AiFillPlusCircle className="cursor-pointer" />
          </div>
        </div>
        <div className="flex justify-start ml-4 space-x-3">
          <button className=" text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded flex justify-center items-center">
            <AiFillShopping />
            Checkout
          </button>
          <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
            Clear Cart
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
