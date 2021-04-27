"use strict";
const { Sequelize } = require("sequelize");
const bcryptjs = require("bcryptjs");

module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  User.init(
    {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A first name is required",
          },
          notEmpty: {
            msg: "Please provide your first name",
          },
        },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A last name is required",
          },
          notEmpty: {
            msg: "Please provide your last name",
          },
        },
      },
      emailAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "An email is requried",
          },
          isEmail: {
            msg: "Please provide a valid email address",
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A password is required",
          },
          notEmpty: {
            msg: "Please provide a password",
          },
          set(val) {
            const hashedPassword = bcryptjs.hashSync(val, 10);
            this.setDataValue('password', hashedPassword);
          }
        },
      },
    },
    { sequelize }
  );
  
//One to many association between the user and course models 
  User.associate = (models) => {
    User.hasMany(models.Course, {
      as: 'courseOwner',
      foreignKey: {
        fieldName: "userId"
      },
    });
  };

  return User;
};
