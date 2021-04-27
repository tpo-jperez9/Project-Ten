//This component allows you to create a new course if you are logged in

import React, { useState, useContext } from "react";
import Header from "./Header";
import Context from "./context";

function CreateCourse(props){

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ estimatedTime, setEstimatedTime ] = useState('');
  const [ materialsNeeded, setMaterialsNeeded ] = useState('');
  const [errors, setErrors] = useState([]);

  const { authUser, data } = useContext(Context);
  const userId = authUser.id;
  const emailAddress = authUser.emailAddress;
  const password = authUser.password;
  const course = {userId, title, description, estimatedTime, materialsNeeded}

  async function submit(e) {
    e.preventDefault();
    const returnObject = await data.createCourse(course, emailAddress, password)
    setErrors(returnObject.errors);
    if (returnObject.status){
       props.history.push('/')
    } else {
       console.error('Something went wrong :(')
    }
  }

  function formCancel(e) {
       e.preventDefault();
       props.history.push("/");
     }

  return(
    <React.Fragment>
     <Header />
        <div className="wrap">
            <h2>Create Course</h2>
            <form onSubmit={submit}>
            {errors && errors.length>=1 ? (
            <div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                <ul>{errors && 
                  errors.map(errors => {
                  return (<p key={errors}> {errors}</p>)
                  })}</ul>
              </ul>
            </div> 
            ) : ( <p></p>
            )}
            <div className="main--flex">
                <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input id="courseTitle" 
                       name="courseTitle" 
                       type="text" 
                       value={title} 
                       onChange={(e) => setTitle(e.target.value)} />
                <label htmlFor="courseAuthor">Course Author</label> 
                <input id="courseAuthor" 
                       name="courseAuthor" 
                       type="text" 
                       value={authUser.firstName + ' ' + authUser.lastName} 
                       onChange={submit}
                       disabled/>
                <label htmlFor="courseDescription">Course Description</label>
                <textarea id="courseDescription" 
                        name="courseDescription" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input id="estimatedTime" 
                       name="estimatedTime" 
                       type="text" 
                       value={estimatedTime} 
                       onChange={(e) => setEstimatedTime(e.target.value)}/>
                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea id="materialsNeeded" 
                         name="materialsNeeded" 
                         value={materialsNeeded} 
                         onChange={(e) => setMaterialsNeeded(e.target.value)}/>
                </div>
            </div>
            <button className="button" type="submit">Create Course</button>
            <button className="button button-secondary" onClick={(e) => formCancel(e)}>Cancel</button>
            </form>
        </div>
        </React.Fragment>
  ) 
}

export default CreateCourse;