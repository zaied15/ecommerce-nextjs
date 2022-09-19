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

// mongoose.models = {};
// export default mongoose.model("Product", ProductSchema);

module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
