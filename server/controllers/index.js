const { User } = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

// User.sync({ force: true });

exports.registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email)
      return res.status(401).json({ message: "All Details Required" });
    const isUserNameExist = await User.findOne({
      where: { username },
    });
    if (isUserNameExist)
      return res.status(401).json({ message: "User name already exist" });
    const isEmailExist = await User.findOne({
      where: { email },
    });
    if (isEmailExist)
      return res.status(401).json({ message: "Email already exist" });
    const hash = await bcrypt.hash(password, saltRounds);
    const addr = await User.create({
      username,
      password: hash,
      email,
    });
    const token = await jwt.sign(addr.dataValues, "secret", {
      expiresIn: "1h",
    });
    if (addr.dataValues === null)
      return res.status(500).json({ message: "Something went wrong" });
    return res.status(201).json({
      token,
      message: "User Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(401).json({ message: "All Details Required" });
    const addr = await User.findOne({
      where: { username },
    });
    const token = await jwt.sign(addr.dataValues, "secret", {
      expiresIn: "1h",
    });

    // const user = await bcrypt.compare(password, hash);
    if (addr.dataValues === null)
      return res.status(500).json({ message: "Something went wrong" });
    return res.status(201).json({
      token,
      message: "User Logged In Successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(401).json({ message: "userId required" });
    const user = await User.findOne({
      id: +id,
    });
    if (user === null)
      return res.status(404).json({ message: "User Id Not Found" });
    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users === null)
      return res.status(500).json({ message: "Something went wrong" });
    return res.status(200).json({
      data: users,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
