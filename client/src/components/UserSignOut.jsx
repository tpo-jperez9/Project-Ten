// This component renders the signout function and logs a user out. 

import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Context from "./context";

function UserSignOut() {
  const { handleSignOut } = useContext(Context);

  useEffect(() => {
    handleSignOut();
  });

  return <Redirect to="/" />;
}

export default UserSignOut;
