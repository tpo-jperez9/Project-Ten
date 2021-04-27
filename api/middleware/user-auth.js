"use strict";

const auth = require("basic-auth");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

//exports middleware to be used in routes folder
exports.authenticateUser = async (req, res, next) => {
  // Parse the user's credentials from the Authorization header.
  let message;
  const credentials = auth(req); // Attempt to retrieve the user data to store as credentials

  // If a user was successfully retrieved compare user password to stored password
  if (credentials) {
    const user = await User.findOne({
      where: { emailAddress: credentials.name },
    });
    if (user) {
      const authenticated = bcrypt.compareSync(credentials.pass, user.password);
      if (authenticated) {
        console.log(
          `Authentication successful for user: ${user.firstName} ${user.lastName}`
        );

        // If passwords match store the user on the request object.
        req.currentUser = user;
      } else {
        message = `Authentication failure for username: ${user.firstName} ${user.lastName}`;
      }
    } else {
      message = `User not found for username: ${credentials.name}`;
    }
  } else {
    message = "Auth header not found";
  }

  if (message) {
    console.warn(message);
    res.status(401).json({ message: "Access Denied" });
  } else {
    next();
  }
};
