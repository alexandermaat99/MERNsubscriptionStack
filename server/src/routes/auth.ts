import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const router = express.Router();

// Signup Route
router.post(
  "/signup",
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const errors = validationErrors
        .array()
        .map((error) => ({ msg: error.msg }));
      return res.json({ errors, data: null });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        errors: [{ msg: "This email is associated with another account" }],
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    const token = JWT.sign(
      { email: newUser.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return res.json({
      errors: [],
      data: {
        token,
        user: {
          id: newUser._id,
          email: newUser.email,
        },
      },
    });
  }
);

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      errors: [{ msg: "Invalid credentials" }],
      data: null,
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({
      errors: [{ msg: "Invalid credentials" }],
      data: null,
    });
  }

  const token = JWT.sign(
    { email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return res.json({
    errors: [],
    data: {
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    },
  });
});

export default router;
