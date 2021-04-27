//This component allows course owner to update their course. 

import React, { useState, useEffect, useContext, useRef } from "react";
import Header from "./Header";
import Context from "./context";

function UpdateCourse(props) {
  const [updateCourse, setUpdateCourse] = useState({});
  const [title, setTitle] = useState("");
  const titleField = useRef("");
  const [description, setDescription] = useState("");
  const descriptionField = useRef("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const estimatedTimeField = useRef("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const materialsNeededField = useRef("");
  const { authUser, data } = useContext(Context);
  const emailAddress = authUser.emailAddress;
  const password = authUser.password;
  const id = updateCourse.courseId;
  const [errors, setErrors] = useState([]);

  function formCancel(e) {
    e.preventDefault();
    props.history.push("/courses/" + id);
  }

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
      };
      setTitle(courseInfo.title);
      setDescription(courseInfo.description);
      setEstimatedTime(courseInfo.estimatedTime);
      setMaterialsNeeded(courseInfo.materialsNeeded);
      setUpdateCourse(courseInfo);
    };
    getCourseDetail();
  }, [data, props.match.params.id]);

  async function updateCourseInformation(e) {
    e.preventDefault();
    const course = { id, title, description, estimatedTime, materialsNeeded };

    const updateCourseStatus = await data.updateCourse(
      id,
      course,
      emailAddress,
      password
    );
    setErrors(updateCourseStatus.errors);
    if (!updateCourseStatus.errors) {
      console.log(updateCourseStatus);
      props.history.push("/");
    } else {
      console.error("Something went wrong!");
    }
  }

//This switch statement updates changed values
  const handleChange = (event) => {
    let target = event.target;
    switch (target.id) {
      case "courseTitle":
        setTitle(target.value);
        break;
      case "courseDescription":
        setDescription(target.value);
        break;
      case "estimatedTime":
        setEstimatedTime(target.value);
        break;
      case "materialsNeeded":
        setMaterialsNeeded(target.value);
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <Header />
      <main>
        <div className="wrap">
          <h2>Course Detail</h2>
          <form onSubmit={updateCourseInformation}>
            {errors && errors.length >= 1 ? (
              <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                  <ul>
                    {errors &&
                      errors.map((errors) => {
                        return <p key={errors}> {errors}</p>;
                      })}
                  </ul>
                </ul>
              </div>
            ) : (
              <p></p>
            )}
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <label htmlFor="courseTitle">Course Title</label>
                <input
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                  ref={titleField}
                  value={title}
                  onChange={handleChange}
                />
                <label htmlFor="courseAuthor">Course Author</label>
                <input
                  id="courseAuthor"
                  name="courseAuthor"
                  type="text"
                  value={updateCourse.firstName + " " + updateCourse.lastName}
                  onChange={handleChange}
                  disabled
                />
                <label htmlFor="courseDescription">Course Description</label>
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  ref={descriptionField}
                  value={description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  ref={estimatedTimeField}
                  value={estimatedTime}
                  onChange={handleChange}
                />
                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  ref={materialsNeededField}
                  value={materialsNeeded}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button className="button">Update Course</button>
            <button
              className="button button-secondary"
              onClick={(e) => formCancel(e)}
            >
              Cancel
            </button>
          </form>
        </div>
      </main>
    </React.Fragment>
  );
}

export default UpdateCourse;
