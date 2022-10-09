import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (
        req.body.email == user.email &&
        req.body.password ==
          CryptoJS.AES.decrypt(
            user.password,
            `${process.env.AES_SECRET}`
          ).toString(CryptoJS.enc.Utf8)
      ) {
        const token = jwt.sign(
          { email: user.email, name: user.name },
          `${process.env.JWT_SECRET}`,
          { expiresIn: "1h" }
        );
        res.status(200).json({ success: true, token });
      } else {
        res.status(200).json({ success: false, error: "Wrong Credential" });
      }
    } else {
      res.status(200).json({ success: false, error: "No User Found" });
    }
  } else {
    res.status(400).json({ success: false, error: "Server error" });
  }
};

export default connectDb(handler);
