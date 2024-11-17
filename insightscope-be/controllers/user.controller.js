const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

const generateAccessOrRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

const userSignUp = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if ([fullname, email, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create({
      fullname,
      email,
      password,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      return res
        .status(500)
        .json({ message: "Something went wrong while signing up the user" });
    }

    return res
      .status(201)
      .json({ message: "User signed up successfully", createdUser });
  } catch (error) {
    console.error("Error in userSignUp:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return res
        .status(400)
        .json({ message: "password and email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User does not exist, Please sign up and try again" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const { accessToken, refreshToken } = await generateAccessOrRefreshToken(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "User logged in successfully",
        user: loggedInUser,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ message: "User Logged out" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(401).json({ error: "Unauthorized request" });
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      return res.status(401).json({ error: "Invalid Refresh token" });
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      return res
        .status(401)
        .json({ error: "Refresh token is expired or used" });
    }

    const { accessToken, refreshToken } = await generateAccessOrRefreshToken(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ accessToken, refreshToken });
  } catch (error) {
    console.error("Error in refreshAccessToken:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { refreshAccessToken, logoutUser, loginUser, userSignUp };
