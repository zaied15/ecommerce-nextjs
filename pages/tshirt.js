import React, { useState } from "react";
import Product from "../models/Product";
import mongoose from "mongoose";
import Link from "next/link";

const Tshirt = ({ products }) => {
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
                    {/* {products[item].size.includes("SM") && (
                      <span className="border border-gray-500 px-1 mr-1">
                        SM
                      </span>
                    )}
                    {products[item].size.includes("M") && (
                      <span className="border border-gray-500 px-1 mr-1">
                        M
                      </span>
                    )}
                    {products[item].size.includes("L") && (
                      <span className="border border-gray-500 px-1 mr-1">
                        L
                      </span>
                    )}
                    {products[item].size.includes("XL") && (
                      <span className="border border-gray-500 px-1 mr-1">
                        XL
                      </span>
                    )}
                    {products[item].size.includes("XXL") && (
                      <span className="border border-gray-500 px-1 mr-1">
                        XXL
                      </span>
                    )} */}
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
        {/* {products.length <= loadProduct && (
          <div className="text-center mt-3">
            <button
              onClick={productsLess}
              className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
            >
              Less products..
            </button>
          </div>
        )} */}
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  // let products = await Product.find({ category: "men's clothing" });
  let products = await Product.find({ category: "tshirt" });
  let tshirts = {};
  for (let item of products) {
    if (item.title in tshirts) {
      if (
        !tshirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].color.push(item.color);
      }
      if (
        !tshirts[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].size.push(item.size);
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) },
  };
}

export default Tshirt;
