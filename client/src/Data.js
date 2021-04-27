import axios from 'axios';

export default class Data {
  apiCall(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = "http://localhost:5000/api" + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  //getUser method retrieves the registered user
  async getUser(emailAddress, password) {
    const response = await this.apiCall(`/users`, "GET", null, true, {
      emailAddress,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  //createUser sends a post request with new user's information
  async createUser(user) {
    const response = await this.apiCall("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else {
      return response.json().then((data) => {
        return data.errors;
      })
    }
  }

  //createCourse sends a post request with new course's information
  async createCourse(course, emailAddress, password) {
    const response = await this.apiCall('/courses', "POST", course, true, {emailAddress, password});
    let responseObject = {};
    if (response.status === 201) {
      responseObject.status=true;
    } else {
      const dataResponse = await response.json()
        responseObject.status=false;
        responseObject.errors = dataResponse.errors;
    } 
    return responseObject;
  }

  //retrieves selected course's information 
  async getCourseDetail(id){
    const response = await axios(`http://localhost:5000/api/courses/${id}`);
    return response;
  }

  //retrieves all courses in database
  async getCourses(){
    const response = await axios('http://localhost:5000/api/courses');
    return response;
  }

  //allows course owner to update course details
  async updateCourse(id, course, emailAddress, password) {
    let responseObject = {};
    const response = await this.apiCall('/courses/'+id, "PUT", course, true, {
      emailAddress,
      password,
    });
    if (response.status === 204) {
      console.log('Course successfully updated');
    } else if (response.status === 403) {
      const dataResponse = await response.json()
      responseObject.status=false;
      responseObject.errors = dataResponse.errors;
      console.log('You must be the course owner to delete course.')
    } else {
      const dataResponse = await response.json()
      responseObject.status=false;
      responseObject.errors = dataResponse.errors;
      console.log('Something went wrong! Try logging in.');
    }
    return responseObject;
  }

  //allows course owner to delete course from database
  async deleteCourse(id, emailAddress, password) {
    const response = await this.apiCall('/courses/'+id, "DELETE", null, true, {
      emailAddress,
      password,
    });
    if (response.status === 204) {
      console.log('Course successfully deleted');
    } else if (response.status === 403) {
      console.log('You must be the course owner to delete course.')
    } else{
      console.log('Something went wrong! Try logging in.');
    }
    return response.status;
  }
}
