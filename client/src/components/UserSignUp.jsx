//This component allows a new user to sign up for an account and processes the sign-in. 

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Context from "./context";

function UserSignUp(props) {
  const { data, handleSignIn } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const user = { firstName, lastName, emailAddress, password };

  async function handleSubmit(e) {
    if (password === confirmPassword) {
      e.preventDefault();
      const errs = await data.createUser(user);
      setErrors(errs);
      handleSignIn(emailAddress, password, props.history);
    } else {
      alert("Passwords must match");
      e.preventDefault();
    }
  }

  function formCancel(e) {
    e.preventDefault();
    props.history.push("/");
  }

  return (
    <div>
      <Header />
      <div className="form--centered">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {errors && errors.length >= 1 ? (
            <div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                <ul>
                  {!!errors.length &&
                    errors.map((err) => {
                      return <p key={err}> {err}</p>;
                    })}
                </ul>
              </ul>
            </div>
          ) : (
            <p></p>
          )}
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="button" type="submit">
            Sign Up
          </button>
          <button
            className="button button-secondary"
            onClick={(e) => formCancel(e)}
          >
            Cancel
          </button>
        </form>
        <p>
          Already have a user account? Click here to{" "}
          <Link to="/signin">sign in</Link>!
        </p>
      </div>
    </div>
  );
}

export default UserSignUp;
