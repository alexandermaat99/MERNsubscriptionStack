import express from "express";
import { body, validationResult } from "express-validator";
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

    res.json({ email, password });
  }
);

export default router;
