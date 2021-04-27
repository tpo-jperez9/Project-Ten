import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import Context from "./components/context";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { authUser } = useContext(Context);

  return (
        <Route
          {...rest}
          render={props => authUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
              }} />
            )
          }
        />
    );
}
