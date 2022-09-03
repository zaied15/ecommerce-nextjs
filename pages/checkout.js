import React from "react";
import {
  AiFillCloseCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineCloseSquare,
  AiOutlineShopping,
} from "react-icons/ai";

const Checkout = ({ cart, subTotal, removeFromCart }) => {
  return (
    <section className="container mx-auto px-5 py-12">
      <h2 className="text-center text-3xl font-semibold">Checkout</h2>
      <div className="body-font">
        <div className="py-6">
          <h3 className="text-2xl font-semibold mb-5">
            1. Shipping Information
          </h3>
          <div className="flex w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div className="relative flex-grow w-full">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative flex-grow w-full">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="relative flex-grow w-full">
            <label htmlFor="adress" className="leading-7 text-sm text-gray-600">
              Address
            </label>
            <textarea
              id="adress"
              name="adress"
              className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="flex w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div className="relative flex-grow w-full">
              <label
                htmlFor="phone"
                className="leading-7 text-sm text-gray-600"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative flex-grow w-full">
              <label
                htmlFor="zipcode"
                className="leading-7 text-sm text-gray-600"
              >
                Zip Code
              </label>
              <input
                type="text"
                id="zipcode"
                name="zipcode"
                className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="flex w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div className="relative flex-grow w-full">
              <label
                htmlFor="state"
                className="leading-7 text-sm text-gray-600"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative flex-grow w-full">
              <label
                htmlFor="district"
                className="leading-7 text-sm text-gray-600"
              >
                District
              </label>
              <input
                type="text"
                id="district"
                name="district"
                className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
        {/* Cart Details Here */}
        <h3 className="text-2xl font-semibold mb-5">2. Review Cart Items </h3>
        <div className="bg-indigo-500 w-full text-white">
          <div className="py-6 px-8 ">
            {Object.keys(cart).length == 0 && <p>Your cart is empty!</p>}
            {Object.keys(cart).map((k) => {
              return (
                <div
                  key={k}
                  className="flex justify-start items-center space-x-2 my-1 bg-slate-800 px-3"
                >
                  <ol className="flex items-center space-x-2 flex-grow">
                    <li>{cart[k].name} </li>
                  </ol>
                  <div className="flex items-center justify-end text-lg pl-2 px-5">
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
                  <div
                    className="cursor-pointer text-xl text-red-500 "
                    onClick={() => removeFromCart(k)}
                  >
                    <AiOutlineCloseSquare />
                  </div>
                </div>
              );
            })}
          </div>
          {Object.keys(cart).length !== 0 && (
            <div className="ml-4 pb-3 font-semibold">
              <p>SubTotal: ${subTotal}</p>
            </div>
          )}
        </div>
        {/* Apply Promo Code */}
        <div className="mt-3 font-semibold">
          <p>Apply Promo Code</p>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full md:w-1/3 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <button
            type="submit"
            className=" text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded mx-1"
          >
            Apply
          </button>
        </div>
        {/* Pay now button */}
        <div className="mt-3 font-semibold">
          <button className=" text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded flex justify-center items-center">
            <AiOutlineShopping className="text-2xl" /> Pay ${subTotal}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
