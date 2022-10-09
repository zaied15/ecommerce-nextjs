import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const jwt = require("jsonwebtoken");

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      const res = await a.json();
      setOrders(res.orders);
    };
    if (!localStorage.getItem("token")) {
      router.push("/");
    } else {
      fetchOrders();
    }
  }, []);
  return (
    <div>
      <div className="w-full md:max-w-[80%] mx-auto my-5">
        <h2 className="text-center text-3xl font-semibold my-10">My Orders</h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  # Order Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {order.orderId}
                  </th>
                  <td className="px-6 py-4">{order.name}</td>
                  <td className="px-6 py-4">{order.userId}</td>
                  <td className="px-6 py-4">${order.amount}</td>
                  <td className="px-6 py-4">{order.status}</td>
                  <td className="px-6 py-4">
                    <button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-red-600 border-0 py-2 px-2 focus:outline-none hover:bg-red-700 rounded">
                      Cancel
                    </button>
                    <Link href={`/order?id=${order.orderId}`}>
                      <button className="lg:mt-2 xl:mt-0 ml-2 flex-shrink-0 inline-flex text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <script src="https://unpkg.com/flowbite@1.3.4/dist/flowbite.js"></script> */}
      </div>
    </div>
  );
};

// export async function getServerSideProps(context) {
//   if (!mongoose.connections[0].readyState) {
//     await mongoose.connect(process.env.MONGO_URI);
//   }

//   let orders = await Order.find({});

//   return {
//     props: {
//       orders: orders,
//     },
//   };
// }

export default Orders;
