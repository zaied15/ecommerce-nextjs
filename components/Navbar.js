import Image from "next/image";
import React from "react";
import Link from "next/link";
import logo from "../public/logo.jpg";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
  return (
    <nav className="flex flex-col justify-center items-center md:flex-row md:justify-start">
      <div className="mx-5">
        <Image src={logo} alt="" width={200} height={60} />
      </div>
      <div>
        <ul className="flex space-x-3">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
        </ul>
      </div>
      <div className="absolute right-2">
        <AiOutlineShoppingCart />
      </div>
    </nav>
  );
};

export default Navbar;
