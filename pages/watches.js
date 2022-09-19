import React, { useState } from "react";
import Product from "../models/Product";
import mongoose from "mongoose";
import Link from "next/link";

const Watches = ({ products }) => {
  const [loadProduct, setLoadProduct] = useState(6);
  const productsLoad = () => {
    if (loadProduct < products.length) {
      setLoadProduct(loadProduct + 6);
    }
  };
  // const productsLess = () => {
  //   if (products.length <= 6) {
  //     return;
  //   }
  //   setLoadProduct(loadProduct - 6);
  // };
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center items-center">
          {Object.keys(products).length == 0 && (
            <h3 className="text-2xl font-bold">
              {" "}
              No products is available right now. Please stay tuned for coming
              products!!!
            </h3>
          )}
          {Object.keys(products)
            .slice(0, loadProduct)
            .map((item) => (
              <div
                key={products[item]._id}
                className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-md m-3"
              >
                <a className="block relative rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="md:h-[20vw] mx-auto"
                    src={products[item].img}
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {products[item].category}
                  </h3>
                  <Link
                    passHref={true}
                    href={`/product/${products[item].slug}`}
                  >
                    <a>
                      <h2 className="text-gray-900 title-font text-lg font-medium line-clamp-1">
                        {products[item].title}
                      </h2>
                    </a>
                  </Link>
                  <div className="my-2">
                    {products[item].size.map((s, i) => (
                      <span
                        key={i}
                        className="border border-gray-500 px-1 mr-1"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="my-2">
                    {products[item].color.map((c, i) => (
                      <button
                        key={i}
                        style={{ background: `${c}` }}
                        className={`border-2 mr-1 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    ))}
                  </div>
                  <p className="mt-1">${products[item].price}</p>
                </div>
              </div>
            ))}
        </div>
        {/* Product Loader */}
        {products.length > loadProduct && (
          <div className="text-center mt-3">
            <button
              onClick={productsLoad}
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Load more...
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let products = await Product.find({ category: "watch" });
  let watches = {};
  for (let item of products) {
    if (item.title in watches) {
      if (
        !watches[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        watches[item.title].color.push(item.color);
      }
      if (
        !watches[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        watches[item.title].size.push(item.size);
      }
    } else {
      watches[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        watches[item.title].color = [item.color];
        watches[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(watches)) },
  };
}

export default Watches;
