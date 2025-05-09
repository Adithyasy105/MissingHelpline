const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User  = require("../models/User"); // Ensure User model is correctly imported


const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Adjust according to your ORM/DB
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;  // ID from the request URL
    const user = await User.findByPk(id);  // Assuming you're using Sequelize for DB

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();  // Delete user from DB
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

// ✅ Register New User
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ✅ Trim and sanitize input
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedName = name.trim();

    // ✅ Check if user already exists (case-insensitive)
    const existingUser = await User.findOne({ where: { email: sanitizedEmail } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Hash password securely
    const hashedPassword = await bcrypt.hash(password, 12);

    // ✅ Create user
    const user = await User.create({
      name: sanitizedName,
      email: sanitizedEmail,
      password: hashedPassword,
      role: role || "user", // Default role is "user"
    });

    res.status(201).json({ message: "User registered successfully", user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const sanitizedEmail = email.trim().toLowerCase();

    // ✅ Check if user exists
    const user = await User.findOne({ where: { email: sanitizedEmail } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Ensure JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in environment variables");
      return res.status(500).json({ message: "Internal Server Error" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // ✅ Set HTTP-Only Cookie (Safer than local storage)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use Secure flag in production
      maxAge: 24 * 60 * 60 * 1000, // 1 Day
    });

    res.json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { getAllUsers, deleteUser, register, login };

