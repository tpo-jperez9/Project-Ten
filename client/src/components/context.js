
// File to house stateful context for use in components
import React, { useState } from "react";
import Data from "../Data";

const Context = React.createContext();

export const ServiceProvider = (props) => {
  const [authUser, setAuthUser] = useState("");

  const data = new Data();

  /* awaits user information and if a user with matching information
   exists, sets them as authorized user and redirects to index. */
  async function handleSignIn(emailAddress, password, history) {
    const user = await data.getUser(emailAddress, password);
    if (user) {
      user.password = password;
      setAuthUser(user);
      history.push("/");
    } else {
      console.log("There was an error!");
    }
  }

  async function handleSignOut() {
    await setAuthUser(null);
    console.log("You were logged out");
  }

  return (
    <Context.Provider
      value={{
        data,
        authUser,
        setAuthUser,
        handleSignIn,
        handleSignOut,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
