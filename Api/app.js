const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// app configuration
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
  console.log(req.url, req.method);
  next();
});

// routes
app.use("/department", require("./routes/department"));
app.use("/job", require("./routes/job"));
app.use("/task", require("./routes/task"));
app.use("/employee", require("./routes/employee"));

app.listen(8000);
