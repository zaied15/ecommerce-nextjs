const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true },
    orderId: { type: String, required: true, unique: true },
    // products: [
    //   { productId: { type: String }, quantity: { type: Number, default: 1 } },
    // ],
    products: { type: Object, required: true },
    address: { type: String, required: true },
    zip: { type: Number, required: true },
    district: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Pending", required: true },
  },
  { timestamps: true }
);

// mongoose.models = {};
// export default mongoose.model("Order", OrderSchema);
module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);
