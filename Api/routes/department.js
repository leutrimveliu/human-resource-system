const router = require("express").Router();
const department = require("../models/department");
const { Op } = require("sequelize");
const { validationResult, check } = require("express-validator");

//E shton nje puntore te ri ne databaze ne baz te req.body
router.post(
  "/",
  [
    check("departmentname")
      .isLength({ min: 2 })
      .withMessage("DepartmentName must be at least 2 characters"),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { departmentname } = req.body;
    if (departmentname) {
      try {
        department
          .create(req.body)
          .then((data) =>
            res.json({ message: "Department Created Successfully" })
          );
        res.send("Successfully");
      } catch (e) {
        res.send(e);
      }
    }
  }
);

//I gjen te gjithe department dhe i kthen ata
router.get("/", (req, res, next) => {
  department
    .findAll()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//E gjen department ne baze te id dhe e kthen ate.
router.get(`/edit/:id`, (req, res, next) => {
  department
    .findOne({ where: { id: req.params.id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//E gjen department qe duam ta bejme update ne baze te id si parameter i path.
router.put("/edit/:id", (req, res, next) => {
  department
    .update(
      {
        departmentname: req.body.departmentname,
      },
      { where: { id: req.params.id } }
    )
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//E gjen departmentin e puntorit ne baze te id se puntorit
router.get("/byemployee", (req, res, next) => {
  department
    .findOne({ where: { id: req.query.id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
//E gjen department specifik ne baze te path parametrit dhe e fshin ate
router.delete("/", (req, res, next) => {
  department
    .destroy({ where: { id: req.query.id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.get("/single-post", (req, res, next) => {
  department
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
  department
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

  department
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

  department
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
