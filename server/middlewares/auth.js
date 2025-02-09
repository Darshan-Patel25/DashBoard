const jwt = require("jsonwebtoken");
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        message: "user is not loggedIn",
        success: false,
      });
    }

    const decode = await jwt.verify(token, process.env.SECREAT_KEY);
    console.log("decode", decode);
    req.userId = decode.id;
    console.log(decode.id);
    if (!decode) {
      return res.status(400).json({
        message: "unauthorized access",
        success: false,
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      error: true,
      success: false,
    });
  }
};
