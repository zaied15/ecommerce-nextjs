import mongoose from "mongoose";
import Order from "../models/Order";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const MyOrder = ({ order }) => {
  const router = useRouter();
  const products = order?.products;
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto">
          <div className="w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              E-Shop.com
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              Order Id # {order?.orderId}
            </h1>
            <p className="mb-5">
              Your order has been successfully placed. Please pay{" "}
              <span className="font-bold text-red-600">${order?.amount}</span>{" "}
              to the delivery man after receiving your products. Thank you
            </p>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Color
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Size
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(products).map((key) => (
                    <tr
                      key={key}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        {products[key].name}
                      </th>
                      <td className="px-6 py-4">{products[key].variant}</td>
                      <td className="px-6 py-4">{products[key].size}</td>
                      <td className="px-6 py-4">{products[key].qty}</td>
                      <td className="px-6 py-4">${products[key].price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex mt-5">
              <button className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Track Order
              </button>
              <span className="ml-auto title-font font-medium text-2xl text-gray-900">
                Total: ${order.amount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(context);
  }

  // let products = await Product.find({ category: "tshirt" });
  const order = await Order.findOne({ orderId: context.query.id });
  console.log(context);

  return {
    props: { order: JSON.parse(JSON.stringify(order)) },
  };
}

export default MyOrder;
