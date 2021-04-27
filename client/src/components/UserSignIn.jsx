//This component renders the user's sign-in page

import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import "../index.css";
import Context from "./context";

function UserSignIn(props) {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const { handleSignIn } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn(emailAddress, password, props.history);
  };

  function formCancel(e) {
    e.preventDefault();
    props.history.push("/");
  }

  return (
    <div>
      <Header />
      <div className="form--centered">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
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
          <button className="button" type="submit">
            Sign In
          </button>
          <button
            className="button button-secondary"
            onClick={(e) => formCancel(e)}
          >
            Cancel
          </button>
        </form>
        <p>
          Don't have a user account? Click here to{" "}
          <Link to="/signup">sign up</Link>!
        </p>
      </div>
    </div>
  );
}

export default UserSignIn;
