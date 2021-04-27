//This component displays all courses in database

import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Context from "./context";

function Courses() {
  const [courses, setCourses] = useState([]);
  const { data } = useContext(Context);

  useEffect(() => {
    async function fetchData() {
      const response = await data.getCourses();
      setCourses(response.data);
    }
    fetchData();
  }, [data]);

  let allCourses = [];
  allCourses = courses.map(course => 
    <Link
    className="course--module course--link"
    key={course.id}
    to={`/courses/${course.id}`}
  >
    <h2 className="course--label">Course</h2>
    <h3 className="course--title">{course.title}</h3>
  </Link>
    );
  return (
    <React.Fragment>
      <Header />
      <main>
        <div className="wrap main--grid">
        {allCourses}
          <Link className="course--module course--add--module" to="/courses/create">
            <span className="course--add--title">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 13 13"
                className="add"
              >
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
              New Course
            </span>
          </Link>
        </div>
      </main>
    </React.Fragment>
  );
};

export default Courses;
