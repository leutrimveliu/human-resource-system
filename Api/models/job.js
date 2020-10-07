const db = require("../config/db");
const Sequelize = require("sequelize");

const Job = db.define(
  "job",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    jobtitle: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 20],
          msg: "Please enter a Job Title with at least 3 characters",
        },
      },
    },
    priceperhour: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
  },
  { Sequelize }
);

module.exports = Job;
