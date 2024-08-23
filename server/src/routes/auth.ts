import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user";
// body checks the request body, validation results are stored in validationResult

const router = express.Router();

// in between path and handler is what we want to be validated
router.post(
  "/signup",
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  async (req, res) => {
    const validationErrors = validationResult(req);
    // this will return an array of errors if there are any

    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map((error) => {
        return {
          msg: error.msg,
        };
      });
      return res.json({ errors });
    }
    // if the array is not empty, we will map through the array and return the error message

    const { email, password } = req.body;

    await User.create({
      email,
      password,
    });
    // const user = await User.findOne({ email });
    // this is saying find a user with the email that was passed in from the request, the const above
    // if there is no existing email, user will be null, if there is an email, user will be the user object
    res.send("user");
    // this will return the user object
    // if the user object is null, we want to create a new user
    // if the user object is not null, we want to return an error message
  }
);

export default router;
