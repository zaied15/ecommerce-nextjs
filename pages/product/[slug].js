import mongoose from "mongoose";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Product from "../../models/Product";

const Slug = ({ addToCart, cart, product, variants, buyNow }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState();
  const [service, setService] = useState(null);
  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.size);

  const checkAvailibility = async () => {
    const pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pinapi`);
    const pinJson = await pins.json();
    if (pinJson.includes(parseInt(pin))) {
      setService(true);
    } else {
      setService(false);
    }
  };
  const pinChange = (e) => {
    setPin(e.target.value);
  };

  const refreshVariant = (newColor, newSize) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize]["slug"]}`;
    window.location = url;
    // router.push(url, undefined, { shallow: true });
  };
  // const refreshSize = (newSize) => {
  //   const arr = Object.values(variants);
  //   let sizeSlug;
  //   for (let mySize of arr) {
  //     if (newSize in mySize) {
  //       let url = `http://localhost:3000/product/${
  //         Object.values(mySize)[0].slug
  //       }`;
  //       window.location = url;
  //       // console.log(Object.values(mySize)[0].slug);
  //     }
  //   }
  // };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-top rounded"
            src={product.img}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-md title-font text-gray-500 tracking-widest">
              {product.category}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-2">
              {product.title}
            </h1>
            <p className="leading-relaxed text-lg">{product.desc}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {Object.keys(variants).includes("red") &&
                  Object.keys(variants["red"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("red", size)}
                      className={`border-2 mr-1 rounded-full bg-red-700 w-6 h-6 focus:outline-none ${
                        color === "red" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}
                {Object.keys(variants).includes("black") &&
                  Object.keys(variants["black"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("black", size)}
                      className={`border-2 mr-1 rounded-full bg-black w-6 h-6 focus:outline-none ${
                        color === "black" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}
                {Object.keys(variants).includes("white") &&
                  Object.keys(variants["white"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("white", size)}
                      className={`border-2 mr-1 rounded-full bg-white-700 w-6 h-6 focus:outline-none ${
                        color === "white" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}
                {Object.keys(variants).includes("green") &&
                  Object.keys(variants["green"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("green", size)}
                      className={`border-2 mr-1 rounded-full bg-green-700 w-6 h-6 focus:outline-none ${
                        color === "green" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}
                {Object.keys(variants).includes("pink") &&
                  Object.keys(variants["pink"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("pink", size)}
                      className={`border-2 mr-1 rounded-full bg-pink-700 w-6 h-6 focus:outline-none ${
                        color === "pink" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}
                {Object.keys(variants).includes("purple") &&
                  Object.keys(variants["purple"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("purple", size)}
                      className={`border-2 mr-1 rounded-full bg-purple-700 w-6 h-6 focus:outline-none ${
                        color === "purple" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}
                {Object.keys(variants).includes("yellow") &&
                  Object.keys(variants["yellow"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("yellow", size)}
                      className={`border-2 mr-1 rounded-full bg-yellow-700 w-6 h-6 focus:outline-none ${
                        color === "yellow" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}
                {Object.keys(variants).includes("blue") &&
                  Object.keys(variants["blue"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("blue", size)}
                      className={`border-2 mr-1 rounded-full bg-blue-700 w-6 h-6 focus:outline-none ${
                        color === "blue" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}
                {Object.keys(variants).includes("silver") &&
                  Object.keys(variants["silver"]).includes(size) && (
                    <button
                      onClick={() => refreshVariant("silver", size)}
                      className={`border-2 mr-1 rounded-full bg-zinc-500 w-6 h-6 focus:outline-none ${
                        color === "silver" ? "border-black" : "border-gray-300"
                      }`}
                    ></button>
                  )}
                {/* {Object.keys(variants).map((c, i) => (
                  <button
                    key={i}
                    style={{ background: `${c}`, borderColor: `${c}` }}
                    className={`border-2 mr-1 rounded-full w-6 h-6 focus:outline-none ${
                      color === c ? "border-black" : "border-gray-300"
                    }`}
                  ></button>
                ))} */}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select
                    value={size}
                    onChange={(e) => refreshVariant(color, e.target.value)}
                    className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                  >
                    {Object.keys(variants[color]).includes("SM") && (
                      <option value="SM">SM</option>
                    )}
                    {Object.keys(variants[color]).includes("M") && (
                      <option value="M">M</option>
                    )}
                    {Object.keys(variants[color]).includes("L") && (
                      <option value="L">L</option>
                    )}
                    {Object.keys(variants[color]).includes("XL") && (
                      <option value="XL">XL</option>
                    )}
                    {Object.keys(variants[color]).includes("XXL") && (
                      <option value="XXL">XXL</option>
                    )}
                    {/* {Object.values(variants).map((s, i) => (
                      <option key={i}>{Object.keys(s)}</option>
                    ))} */}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${product.price}
              </span>
              {!cart[slug] ? (
                <button
                  onClick={() => {
                    addToCart(
                      slug,
                      1,
                      product.price,
                      product.title,
                      size,
                      color
                    );
                  }}
                  className="flex ml-4 md:ml-14 text-white bg-indigo-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Add to cart
                </button>
              ) : (
                <Link href="/checkout">
                  <button className="flex ml-4 md:ml-14 text-white bg-indigo-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded">
                    Checkout
                  </button>
                </Link>
              )}
              <button
                onClick={() =>
                  buyNow(slug, 1, product.price, product.title, size, color)
                }
                className="flex ml-4 text-white bg-indigo-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded"
              >
                Buy now
              </button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
            <div className="pin flex space-x-2 mt-5">
              <input
                onChange={pinChange}
                type="text"
                name="pin"
                placeholder="Enter your zip code"
                className="border outline-none rounded p-1"
              />
              <button
                onClick={checkAvailibility}
                className="flex ml-14 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
              >
                Check
              </button>
            </div>
            {!service && service !== null && (
              <div className="text-red-700">
                Sorry! You are not eligible for this service.
              </div>
            )}
            {service && service !== null && (
              <div className="text-green-700">
                YaY! You are eligible for this service.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let product = await Product.findOne({ slug: context.query.slug });

  let variants = await Product.find({
    title: product.title,
    category: product.category,
  });
  let colorSizeSlug = {};
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  };
}
export default Slug;
