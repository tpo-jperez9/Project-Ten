import React from "react";
import { Route, Switch } from "react-router-dom";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import UpdateCourse from "./components/UpdateCourse";
import CreateCourse from "./components/CreateCourse";
import PrivateRoute from "./PrivateRoute";

class Testclass extends React.Component {
  state = {
    courses: [],
  };

  render() {
    return (
      <div>
        <Switch>
          <Route path="/signup" component={UserSignUp} />
          <Route path="/" exact component={Courses} />
          <PrivateRoute path="/courses/create" component={CreateCourse} />
          <PrivateRoute path="/courses/:id/update" component={UpdateCourse} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/signin" component={UserSignIn} />
          <Route path="/signout" component={UserSignOut} />
        </Switch>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Testclass></Testclass>
    </div>
  );
}

export default App;
