const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
exports.generateaccesstoken = async (userId) => {
  console.log("userid sended to sign token ", userId);
  const token = await jwt.sign({ id: userId }, process.env.SECREAT_KEY, {
    expiresIn: "5d",
  });

  return token;
};
