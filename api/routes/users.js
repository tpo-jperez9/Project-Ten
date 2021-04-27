"use strict";
const User = require("../models").User;
const express = require("express");
const router = express.Router();
const { sequelize } = require("../models");
const { authenticateUser } = require("../middleware/user-auth");

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      // Forward error to the global error handler
      next(error);
    }
  };
}

//returns the currently authenticated user and a 200 status code
router.get(
  "/api/users",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const user = req.currentUser;
    res.status(200);
    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      password: user.password
    });
  })
);

//creates a new user, sets location header to /, and sets 201 status code
router.post(
  "/api/users",
  asyncHandler(async (req, res) => {
    try {
      const user = await User.create(req.body);
      res
        .location("/")
        .status(201)
        .end();
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

module.exports = router;
