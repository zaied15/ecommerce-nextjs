import React from "react";

const Order = () => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              E-Shop.com
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              Order Id # 877256
            </h1>
            <p>Your order has been successfully placed.</p>
            <div className="flex my-4">
              <span className="flex-grow py-2 text-lg px-1">
                Item Description
              </span>
              <span className="flex-grow py-2 text-lg px-1">Quantity</span>
              <span className="flex-grow py-2 text-lg px-1">Item Total</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500 w-1/3">Color</span>
              <span className="text-gray-900 w-1/3 text-center">1</span>
              <span className="text-gray-900 w-1/3 text-center">$400</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500 w-1/3">Size</span>
              <span className="text-gray-900 w-1/3 text-center">1</span>
              <span className="text-gray-900 w-1/3 text-center">$500</span>
            </div>
            <div className="flex border-t border-b mb-6 border-gray-200 py-2">
              <span className="text-gray-500 w-1/3">Quantity</span>
              <span className="text-gray-900 w-1/3 text-center">1</span>
              <span className="text-gray-900 w-1/3 text-center">$300</span>
            </div>
            <div className="flex">
              <button className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Track Order
              </button>
              <span className="ml-auto title-font font-medium text-2xl text-gray-900">
                Total: $58.00
              </span>
            </div>
          </div>
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src="https://dummyimage.com/400x400"
          />
        </div>
      </div>
    </section>
  );
};

export default Order;
