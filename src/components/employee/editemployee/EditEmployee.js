import React, { useState, useEffect } from "react";
import { getEmployeeById, updateEmployee } from "../../../api/employee";
import { withRouter, useHistory } from "react-router-dom";
import "./EditEmployee.css";
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

const EditEmployee = ({ match }) => {
  const [employeeDetails, setEmployeeDetails] = useState({});
  const classes = useStyles();
  const { t } = useTranslation();

  const history = useHistory();

  const getEmployee = async () => {
    const response = await getEmployeeById(match.params.id);
    setEmployeeDetails(response);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails({ ...employeeDetails, [name]: value });
  };

  const handleSubmit = async () => {
    const updatedEmployee = {
      name: employeeDetails.name,
      email: employeeDetails.email,
      phone: employeeDetails.phone,
    };
    const response = await updateEmployee(match.params.id, updatedEmployee);
    console.log(response);
    history.push("/createemployee");
  };

  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <div className="edit_employee_page">
      <div className="row mt-5">
        <div className="col-lg-6 col-md-6 col-sm-12 m-auto">
          <div className="edit_employee">
            <form className="inputs">
              <h1>{t("EditEmployee")}</h1>
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

              <TextField
                className="mt-4"
                name="name"
                value={employeeDetails.name}
                onChange={handleChange}
                id="outlined-basic"
                variant="outlined"
              />
              <TextField
                className="mt-4"
                name="email"
                value={employeeDetails.email}
                onChange={handleChange}
                id="outlined-basic"
                variant="outlined"
              />
              <TextField
                className="mt-4"
                name="phone"
                value={employeeDetails.phone}
                onChange={handleChange}
                id="outlined-basic"
                variant="outlined"
              />
              <Button
                onClick={handleSubmit}
                className="mt-4 mb-2"
                variant="contained"
                color="primary"
              >
                {t("EditEmployee")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(EditEmployee);
