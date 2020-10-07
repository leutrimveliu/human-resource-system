const db = require("../config/db");
const Sequelize = require("sequelize");

const Employee = db.define(
  "employee",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 20],
          msg: "Please enter a name with at least 3 characters",
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    department_id: {
      type: Sequelize.STRING,
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

module.exports = Employee;
