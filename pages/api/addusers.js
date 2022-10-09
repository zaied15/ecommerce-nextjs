import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
const CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { name, email } = req.body;
    let user = new User({
      name,
      email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        `${process.env.AES_SECRET}`
      ).toString(),
    });
    await user.save();
  }
};

export default connectDb(handler);
