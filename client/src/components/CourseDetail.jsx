//This component locates the matching course and renders applicable course information

import React, { useState, useEffect, useContext } from "react";
import ReactMarkdown from 'react-markdown';
import { Link } from "react-router-dom";
import Header from "./Header";
import Context from "./context";

function CourseDetail(props) {
  const [course, setCourse] = useState({ courseOwner: {} });
  const { authUser, data } = useContext(Context);
  const emailAddress = authUser.emailAddress;
  const password = authUser.password;
  const id = course.courseId;

  useEffect(() => {
    const getCourseDetail = async () => {
      let response = await data.getCourseDetail(props.match.params.id);
      let courseInfo = {
        courseId: response.data.id,
        title: response.data.title,
        description: response.data.description,
        estimatedTime: response.data.estimatedTime,
        materialsNeeded: response.data.materialsNeeded,
        firstName: response.data.courseOwner.firstName,
        lastName: response.data.courseOwner.lastName,
        courseOwnerId: response.data.userId,
      };
      setCourse(courseInfo);
    };
    getCourseDetail();
  }, [data, props.match.params.id]);

  async function handleDelete(e) {
    e.preventDefault();
    const courseDeletionStatus = await data.deleteCourse(id, emailAddress, password)
    if (courseDeletionStatus===204) {
      props.history.push('/')
    }
  };
 
  return (
    <React.Fragment>
      <Header />
      <main>
        <div className="actions--bar">
          <div className="wrap">
            {authUser.id === course.courseOwnerId? (
              <>
              <Link className="button" to={`/courses/${course.courseId}/update`}>
              Update Course
            </Link>
            <button className="button" onClick={handleDelete}>
              Delete Course
            </button>
            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
            </>
            ) : (
              <Link className="button button-secondary" to="/">
              Return to List
            </Link>
            )
            }
          </div>
        </div>
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{course.title}</h4>
                <p>By {course.firstName + " " + course.lastName} </p>
                <ReactMarkdown>
                {course.description}
                </ReactMarkdown>
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{course.estimatedTime}</p>
                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                <ReactMarkdown>
                {course.materialsNeeded}
                </ReactMarkdown>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </main>
    </React.Fragment>
  );
}

export default CourseDetail;
