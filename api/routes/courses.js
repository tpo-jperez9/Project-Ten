"use strict";
const User = require("../models").User;
const Course = require("../models").Course;
const express = require("express");
const router = express.Router();
const { sequelize } = require("../models");
const { authenticateUser } = require("../middleware/user-auth");
const { next } = require("cli");

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      // Forward error to the global error handler
      next(error);
    }
  };
}

//Returns a list of all courses
router.get('/api/courses', asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
      attributes: [
        'id',
        'title',
        'description',
        'estimatedTime',
        'materialsNeeded',
        'userId'
      ],
      include: [
        {
          model: User,
          as: 'courseOwner',
          attributes: [
              'firstName',
              'lastName',
              'emailAddress'
          ],
        },
      ],
    });
    res.status(200).json(courses);
}));

//creates a new course
router.post('/api/courses', authenticateUser, asyncHandler(async (req, res) => {
      try {
        const course = await Course.create(req.body);
        res
          .location("/api/courses/" + course.id)
          .status(201)
          .end();
      } catch (error) {  
        if (
          error.name === "SequelizeValidationError" ||
          error.name === "SequelizeUniqueConstraintError"
        ) {
          const errors = error.errors.map((err) => err.message);
          res.status(400).json({ errors });
        } else {
          throw error;
        }
      }
    })
  );

//returns the corresponding course
router.get('/api/courses/:id', asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id, {
      attributes: [
        'id',
        'title',
        'description',
        'estimatedTime',
        'materialsNeeded',
        'userId'
      ],
      include: [
        {
          model: User,
          as: 'courseOwner',
          attributes: [
            'firstName',
            'lastName',
            'emailAddress'
          ]
        }
      ],
    });
    if (course){
      res.status(200).json(course);
    } else {
      const err = new Error('Course Not Found');
      err.status = 404;
      next(err);
    }
}));

// Updates a course
router.put('/api/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      const user = req.currentUser;
      if (user.id === course.userId) {
        await course.update(req.body);
          res
            .status(204)
            .json({ message: "Course successfully updated!" });
      } else {
        res
          .status(403).json({message: "You must be the course owner to edit a course"});
      }
    } else {
      const err = new Error('Course Not Found');
      err.status = 404;
      next(err);
    } 
  } catch (error) {  
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      const errors = error.errors.map((err) => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

//Deletes the corresponding route
router.delete('/api/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (course){
    const user = req.currentUser;
      if (user.id === course.userId) {
        await course.destroy(course);
        res.status(204).end();
      } else {
        res.status(403).json({ Error: "User must be course owner to delete course"});
      }
  } else {
    const err = new Error('Course Not Found');
    err.status = 404;
    next(err);
  } 
}));

module.exports = router;