const router = require("express").Router();
const task = require("../models/task");
const { Op } = require("sequelize");
const { validationResult, check } = require("express-validator");

//E shton nje task te ri ne databaze ne baz te req.body
router.post(
  "/",
  [
    check("title")
      .isLength({ min: 3 })
      .withMessage("Task Title must be at least 3 characters"),
  ],
  [
    check("description")
      .isLength({ min: 5 })
      .withMessage("Task Description must be at least 5 characters"),
  ],
  [
    check("type")
      .isLength({ min: 3 })
      .withMessage("Task Type must be at least 3 characters"),
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

    const { title, description, type, employee_id } = req.body;
    if (title && description && type && employee_id) {
      try {
        task
          .create(req.body)
          .then((data) => res.json({ message: "Task Created Successfully" }));
        res.send({ message: "Task Created Successfully" });
      } catch (e) {
        res.send(e);
      }
    }
  }
);

//I gjen te gjithe task dhe i kthen ata
router.get("/", (req, res, next) => {
  task
    .findAll()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//E gjen task ne baze te id dhe e kthen ate.
router.get(`/edit/:id`, (req, res, next) => {
  task
    .findOne({ where: { id: req.params.id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//E gjen task qe duam ta bejme update ne baze te id si parameter i path.
router.put("/edit/:id", (req, res, next) => {
  task
    .update(
      {
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
      },
      { where: { id: req.params.id } }
    )
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//E gjen task specifik ne baze te path parametrit dhe e fshin ate
router.delete("/", (req, res, next) => {
  task
    .destroy({ where: { id: req.query.id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.get("/single-post", (req, res, next) => {
  task
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
  task
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

  task
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

  task
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
