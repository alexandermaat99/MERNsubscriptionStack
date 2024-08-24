import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
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
      return res.json({ errors, data: null });
      // if the array is empty, we will return the data
      // if the array is not empty, we will map through the array and return the error message
    }
    // if the array is not empty, we will map through the array and return the error message

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    //if we get back a user, return an error saying we already have a user with that email
    if (user) {
      return res.json({
        errors: [
          {
            msg: "This email is associated with another account",
          },
        ],
        data: null,
        // if we have a user, we will return an error message
        // if we don't have a user, we will return the user object
      });
    }
    // this is saying find a user with the email that was passed in from the request, the const above
    // if there is no existing email, user will be null, if there is an email, user will be the user object
    res.send(user);
    // this will return the user object
    // if the user object is null, we want to create a new user
    // if the user object is not null, we want to return an error message
  }
);

export default router;
