import connectDb from "../../middleware/mongoose";
import Order, { findOne } from "../../models/Order";
import Product from "../../models/Product";

const handler = async (req, res) => {
  if (req.method == "POST") {
    for (let item in req.body.cart) {
      const findProduct = await Product.findOne({ slug: item });
      if (findProduct.price != req.body.cart[item].price) {
        res.status(300).json({ error: "The order can not be generated" });
      } else {
        const o = new Order({
          name: req.body.name,
          userId: req.body.email,
          orderId: req.body.orderId,
          products: req.body.cart,
          address: req.body.address,
          zip: req.body.zip,
          district: req.body.district,
          amount: req.body.subTotal,
        });
        await o.save();
        res.status(200).json({ success: "success" });
      }
    }
  } else {
    res.status(400).json({ error: "This is a bad request" });
  }
};

export default connectDb(handler);
