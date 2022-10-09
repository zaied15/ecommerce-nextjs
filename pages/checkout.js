import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AiFillCloseCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineCloseSquare,
  AiOutlineShopping,
} from "react-icons/ai";
import { useRouter } from "next/router";

const Checkout = ({ cart, subTotal, removeFromCart, clearCart }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [district, setDistrict] = useState("");
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();

  const handlePayment = async () => {
    const fullAddress = `${address}, ${district}, ${zip}`;
    const orderId = Math.floor(Math.random() * new Date());
    // const fakeOrderId = `${orderId}${Math.floor(Math.random() * 90000) + 10000}`
    const data = {
      name,
      email,
      address: fullAddress,
      zip,
      phone,
      district,
      orderId,
      cart,
      subTotal,
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status == 300) {
      toast.error("order did not made!!!");
      return;
    } else {
      const orderRes = await res.json();
      clearCart();
      setTimeout(() => {
        toast.success("Your order placed successfully");
        router.push(`/order?id=${orderId}`);
      }, 500);
    }
  };
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
                onChange={(e) => setName(e.target.value)}
                value={name}
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                name="email"
                className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="flex w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div className="relative flex-grow w-full">
              <label
                htmlFor="address"
                className="leading-7 text-sm text-gray-600"
              >
                Address
              </label>
              <textarea
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                id="address"
                name="address"
                className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative flex-grow w-full">
              <label htmlFor="zip" className="leading-7 text-sm text-gray-600">
                Zip Code
              </label>
              <input
                onChange={(e) => setZip(e.target.value)}
                value={zip}
                type="text"
                id="zip"
                name="zip"
                className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          {/* <div className="flex w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            
          </div> */}
          <div className="flex w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div className="relative flex-grow w-full">
              <label
                htmlFor="phone"
                className="leading-7 text-sm text-gray-600"
              >
                Phone
              </label>
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="text"
                id="phone"
                name="phone"
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
                onChange={(e) => setDistrict(e.target.value)}
                value={district}
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
                    <li>
                      {cart[k].name} ({cart[k].size} / {cart[k].variant}){" "}
                    </li>
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
          <button
            onClick={handlePayment}
            disabled={
              name && email && address && phone && district ? false : true
            }
            className="disabled:bg-indigo-300 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded flex justify-center items-center"
          >
            <AiOutlineShopping className="text-2xl" /> Pay ${subTotal}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
