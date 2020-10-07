const db = require("../config/db");
const Sequelize = require("sequelize");

const Department = db.define(
  "department",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    departmentname: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 20],
          msg: "Please enter a name with at least 3 characters",
        },
      },
    },
  },
  { Sequelize }
);

module.exports = Department;
