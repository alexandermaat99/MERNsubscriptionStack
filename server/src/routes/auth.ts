import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
// body checks the request body, validation results are stored in validationResult

const router = express.Router();

// in between path and handler is what we want to be validated
// Example for the signup route
router.post("/signup", async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => ({
      msg: error.msg,
    }));
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
      user: { id: newUser._id, email: newUser.email },
    },
  });
});

// Example for the login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
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
      user: { id: user._id, email: user.email },
    },
  });
});

export default router;
