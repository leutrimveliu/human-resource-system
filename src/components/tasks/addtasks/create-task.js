import React, { useState, useEffect } from "react";
import "./tasks.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import ListItem from "@material-ui/core/ListItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import TaskList from "../tasklist/TaskList";
import { addTask } from "../../../api/task";
import { useTranslation } from "react-i18next";
import { getEmployees } from "../../../api/employee";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CreateTask = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const [errors, setErrors] = useState();

  const [messages, setMessages] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    type: "",
    employee_id: "",
    error: false, //<---- here
    errorMessage: {},
  });
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = {
      title: taskDetails.title,
      description: taskDetails.description,
      type: taskDetails.type,
      employee_id: taskDetails.employee_id,
    };
    try {
      const res = await addTask(task);
      console.log(res);
      setTaskDetails({
        title: "",
        description: "",
        type: "",
        employee_id: "",
      });
      setMessages(res.message);

      setErrors("");
      setOpenForm(false);
      setTimeout(() => {
        history.go("/");
      }, 2000);
    } catch (e) {
      setErrors(e.response.data.errors);
    }
  };

  console.log(errors);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleOpenForm = () => {
    setOpenForm(true);
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="task-page">
      <div className="task_list">
        {messages ? <Alert severity="success">{messages}</Alert> : ""}
        <Button
          onClick={handleOpenForm}
          className="openform_button mt-4 mb-4"
          variant="contained"
          color="primary"
          style={{
            width: "350px",
            height: " 40px",
          }}
        >
          {t("AddTask")}
        </Button>
        <TaskList />
      </div>

      {openForm && (
        <div className="task-container">
          <form onSubmit={handleSubmit} className="inputs">
            <h1>{t("AddTask")}</h1>

            <TextField
              className="mt-4"
              name="title"
              onChange={handleChange}
              value={taskDetails.title}
              id="outlined-basic"
              label="Task Title"
              variant="outlined"
            />
            {errors && errors.title ? (
              <p className="errorMessages">{errors.title.msg}</p>
            ) : (
              ""
            )}
            <TextField
              className="mt-4"
              name="description"
              onChange={handleChange}
              value={taskDetails.description}
              id="outlined-multiline-static"
              label="Task Description"
              multiline
              rows={4}
              defaultValue="Default Value"
              variant="outlined"
            />
            {errors && errors.description ? (
              <p className="errorMessages">{errors.description.msg}</p>
            ) : (
              ""
            )}
            <TextField
              className="mt-4"
              name="type"
              onChange={handleChange}
              value={taskDetails.type}
              id="outlined-basic"
              label="Task Type"
              variant="outlined"
            />
            {errors && errors.type ? (
              <p className="errorMessages">{errors.type.msg}</p>
            ) : (
              ""
            )}
            <FormControl className={`${classes.formControl}`}>
              <InputLabel id="demo-simple-select-label">Employee ID</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="employee_id"
                value={taskDetails.employee_id}
                onChange={handleChange}
              >
                {employees?.map((employee) => (
                  <ListItem key={employee.id} value={employee.id}>
                    {employee.id}
                  </ListItem>
                ))}
              </Select>
            </FormControl>

            <Button
              onClick={handleSubmit}
              className="mt-4 mb-2 "
              variant="contained"
              color="primary"
              style={{
                width: "250px",
                height: " 40px",
                marginLeft: "66px",
              }}
            >
              {t("AddTask")}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};
export default CreateTask;
