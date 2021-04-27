'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Sequelize.Model {}
  Course.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a title for the course.',
        }, 
        notEmpty: {
          msg: 'Please provide a title for the course.',
        },
      },
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a description for the course.',
        },
        notEmpty: {
          msg: 'Please provide a description for the course.',
        },
      },
    },
    estimatedTime: {
      type: Sequelize.STRING,
    },
    materialsNeeded: {
      type: Sequelize.STRING,
    }
  }, { sequelize });

  //One to one association between the course and user models
  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      as: 'courseOwner',
      foreignKey: {
        fieldName: 'userId'
      },
    });
  };

  return Course;
};
