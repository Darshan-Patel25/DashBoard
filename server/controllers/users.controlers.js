const Usermodel = require("../models/user");
const bcryptjs = require("bcryptjs");
const sendWelcomeEmail = require("../mailTemplates/emailServices");
const user = require("../models/user");
const { generateaccesstoken } = require("../utils/generateAccesstoken");
exports.registerUsercontroller = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "provide email,name,password",
        error: true,
        success: false,
      });
    }

    const user = await Usermodel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "already register email",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);
    const payload = {
      name,
      email,
      password: hashpassword,
      profilePicture: `https://api.dicebear.com/9.x/initials/svg?seed=${name}`,
    };
    await sendWelcomeEmail(email, name);
    const newuser = new Usermodel(payload);
    const save = await newuser.save();
    return res.status(200).json({
      message: "user resgister succesfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "all fields are required",
        success: false,
        error: true,
      });
    }

    const user = await Usermodel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
        error: true,
      });
    }
    const checkpassword = await bcryptjs.compare(password, user.password);
    if (!checkpassword) {
      return res.status(400).json({
        message: "Check your password",
        success: false,
        error: true,
      });
    }

    const accesstoken = await generateaccesstoken(user._id);
    console.log("userid sended to sign tokensssss ", user._id);
    const cookieoption = {
      http: true,
      secure: true,
      sameSite: "None",
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    };
    res.cookie("accessToken", accesstoken, cookieoption);
    return res.status(200).json({
      message: "logged in succesfully",
      success: true,
      data: {
        accesstoken,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
      error: true,
      success: false,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const cookieoption = {
      http: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("accessToken", cookieoption);

    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: true,
    });
  }
};

// const User = require("../models/User"); // Update with your correct model path

exports.getuserdetails = async (req, res) => {
  try {
    // Extract user ID from the request (set by authentication middleware)
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Fetch user details from the database
    const users = await user.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "User details fetched successfully.",
      user: {
        id: users._id,
        name: users.name,
        email: users.email,
        profilePicture: users.profilePicture || "default-profile-picture-url", // Handle missing profile picture
        createdAt: users.createdAt,
      },
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
