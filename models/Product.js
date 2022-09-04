const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, requied: true },
    size: { type: String },
    color: { type: String },
    price: { type: Number, requied: true },
    availableQty: { type: Number, requied: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
