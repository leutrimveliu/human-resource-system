const db = require("../config/db");
const Sequelize = require("sequelize");

const Task = db.define(
  "task",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 20],
          msg: "Please enter a name with at least 3 characters",
        },
      },
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 80],
          msg: "Please enter a name with at least 6 characters",
        },
      },
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 20],
          msg: "Please enter a name with at least 3 characters",
        },
      },
    },
    employee_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { Sequelize }
);

// SequelizeSlugify.slugifyModel(Employee, {
//     source: ['name'],
//     slugOptions: { lower: true },
//     overwrite: false,
//     column: 'slug',
//     incrementalReplacement: '-',
// });

module.exports = Task;
