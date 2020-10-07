const router = require("express").Router();
const job = require("../models/job");
const { validationResult, check } = require("express-validator");

//E shton nje job te ri ne databaze ne baz te req.body
router.post(
  "/",
  [
    check("jobtitle")
      .isLength({ min: 3 })
      .withMessage("Job Title must be at least 3 characters"),
  ],
  [
    check("priceperhour")
      .isDecimal()
      .isLength({ min: 1 })
      .withMessage("Must have at least 1 number"),
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

    const { jobtitle, priceperhour } = req.body;
    if (jobtitle && priceperhour) {
      try {
        job
          .create(req.body)
          .then((data) => res.json({ message: "Job Created Successfully" }));
        res.send({ message: "Job Created Successfully" });
      } catch (e) {
        res.send(e);
      }
    }
  }
);
//I gjen te gjithe job dhe i kthen ata
router.get("/", (req, res, next) => {
  job
    .findAll()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//E gjen job ne baze te id dhe e kthen ate.
router.get(`/edit/:id`, (req, res, next) => {
  job
    .findOne({ where: { id: req.params.id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//E gjen job qe duam ta bejme update ne baze te id si parameter i path.
router.put("/edit/:id", (req, res, next) => {
  job
    .update(
      {
        jobtitle: req.body.jobtitle,
        priceperhour: req.body.priceperhour,
      },
      { where: { id: req.params.id } }
    )
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//E gjen job specifik ne baze te path parametrit dhe e fshin ate
router.delete("/", (req, res, next) => {
  job
    .destroy({ where: { id: req.query.id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.get("/single-post", (req, res, next) => {
  job
    .findOne({ where: { slug: req.query.slug } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

module.exports = router;
