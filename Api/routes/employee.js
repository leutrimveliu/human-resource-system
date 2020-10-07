const router = require("express").Router();
const employee = require("../models/employee");
const { Op } = require("sequelize");
const { validationResult, check } = require("express-validator");

//E shton nje puntore te ri ne databaze ne baz te req.body
router.post(
  "/",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
  ],
  [check("email").isEmail().withMessage("Must be an email format.")],
  [
    check("phone")
      .isNumeric()
      .isLength({ min: 9 })
      .withMessage("Must be a number and Must have at least 9 numbers"),
  ],

  function (req, res) {
    const errors = validationResult(req);

    const convertArrayToObject = (array, key) => {
      const initialValue = {};
      return array.reduce((obj, item) => {
        return {
          ...obj,
          [item[key]]: item,
        };
      }, initialValue);
    };

    const objectErrors = convertArrayToObject(errors.array(), "param");

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: objectErrors });
    }

    const { name, email, phone, department_id } = req.body;
    if (name && email && phone && department_id) {
      try {
        employee
          .create(req.body)
          .then((data) =>
            res.json({ message: "Employee Created Successfully" })
          );
        res.send({ message: "Employee Created Successfully" });
      } catch (e) {
        res.send(e);
      }
    }
  }
);

//I gjen te gjithe employee dhe i kthen ata
router.get("/", (req, res, next) => {
  employee
    .findAll()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//E gjen employee ne baze te id dhe e kthen ate.
router.get(`/edit/:id`, (req, res, next) => {
  employee
    .findOne({ where: { id: req.params.id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//E gjen employee qe duam ta bejme update ne baze te id si parameter i path.
router.put("/edit/:id", (req, res, next) => {
  employee
    .update(
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      },
      { where: { id: req.params.id } }
    )
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//E gjen employee specifik ne baze te path parametrit dhe e fshin ate
router.delete("/", (req, res, next) => {
  employee
    .destroy({ where: { id: req.query.id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.get("/single-post", (req, res, next) => {
  employee
    .findOne({ where: { slug: req.query.slug } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.get("/count/daily", (req, res, next) => {
  const date = new Date();
  const tomorrow = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1
  );
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  employee
    .count({
      where: {
        createdAt: {
          [Op.between]: [today, tomorrow],
        },
      },
    })
    .then((data) =>
      res.json({
        name: "daily",
        count: data,
      })
    )
    .catch((err) => res.json(err));
});

router.get("/count/weekly", (req, res, next) => {
  const date = new Date();
  const nextWeek = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 7
  );
  const thisWeek = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  employee
    .count({
      where: {
        createdAt: {
          [Op.between]: [thisWeek, nextWeek],
        },
      },
    })
    .then((data) =>
      res.json({
        name: "weekly",
        count: data,
      })
    )
    .catch((err) => res.json(err));
});
router.get("/count/monthly", (req, res, next) => {
  const date = new Date();
  const thisMonth = new Date(date.getFullYear(), date.getMonth());
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1);

  employee
    .count({
      where: {
        createdAt: {
          [Op.between]: [thisMonth, nextMonth],
        },
      },
    })
    .then((data) =>
      res.json({
        name: "monthly",
        count: data,
      })
    )
    .catch((err) => res.json(err));
});

module.exports = router;
