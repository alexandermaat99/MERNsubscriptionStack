import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
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

    const hashedPassword = await bcrypt.hash(password, 11);

    //the 10 is the number of rounds of hashing
    // the higher the number, the more secure the password
    // the lower the number, the faster the hashing
    // 10 is a good balance
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    const token = JWT.sign(
      { email: newUser.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.json({
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

//returned token will be json web token

//payload amd signature

// this is saying find a user with the email that was passed in from the request, the const above
// if there is no existing email, user will be null, if there is an email, user will be the user object
// this will return the user object
// if the user object is null, we want to create a new user
// if the user object is not null, we want to return an error message

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //validates if a user exists with that particular email in our database
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      errors: [
        {
          msg: "Invalid credentials",
        },
      ],
      data: null,
    });
  }

  // comparing hashed password with the password we're getting back
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.json({
      errors: [
        {
          msg: "Invalid Credentials",
        },
      ],
    });
  }

  //if all of this works, we return this token that lasts for 1 hour
  const token = JWT.sign(
    { email: user.email },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );

  res.json({
    error: [],
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
