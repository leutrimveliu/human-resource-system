import React, { useState, useEffect } from "react";
import { getTaskById, updateTask } from "../../../api/task";
import { withRouter, useHistory } from "react-router-dom";
import "./EditTask.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const EditTask = ({ match }) => {
  const [taskDetails, setTaskDetails] = useState({});
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  const getTask = async () => {
    const response = await getTaskById(match.params.id);
    setTaskDetails(response);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  const handleSubmit = async () => {
    const updatedTask = {
      title: taskDetails.title,
      description: taskDetails.description,
      type: taskDetails.type,
    };
    const response = await updateTask(match.params.id, updatedTask);
    console.log(response);
    history.push("/createtasks");
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="edit_task_page">
      <div className="row mt-5">
        <div className="col-lg-6 col-md-6 col-sm-12 m-auto">
          <div className="edit_task">
            <form className="inputs">
              <h1>{t("EditTask")}</h1>
              <TextField
                className="mt-4"
                name="title"
                onChange={handleChange}
                value={taskDetails.title}
                id="outlined-basic"
                label="Task Title"
                variant="outlined"
              />
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
              <TextField
                className="mt-4"
                name="type"
                onChange={handleChange}
                value={taskDetails.type}
                id="outlined-basic"
                label="Task Type"
                variant="outlined"
              />
              <FormControl className={`${classes.formControl}`}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  //   value={age}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={`${classes.formControl} mt-4`}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  //   value={age}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>

              <Button
                onClick={handleSubmit}
                className="mt-4 mb-2"
                variant="contained"
                color="primary"
              >
                {t("EditTask")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(EditTask);
