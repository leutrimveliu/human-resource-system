import React, { useState, useEffect } from "react";
import "./employee.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import EmployeeList from "../employeelist/EmployeeList";

import { addEmployee } from "../../../api/employee";
import { useTranslation } from "react-i18next";

import { getDepartments } from "../../../api/department";
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

const CreateEmployee = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const classes = useStyles();
  const [errors, setErrors] = useState("");
  const [messages, setMessages] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({
    name: "",
    email: "",
    phone: "",
    department_id: "",
    error: false, //<---- here
    errorMessage: {}, //<-----here
  });
  const [departments, setDepartments] = useState([]);

  const fetchDepartments = async () => {
    const res = await getDepartments();
    setDepartments(res);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails({ ...employeeDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employee = {
      name: employeeDetails.name,
      email: employeeDetails.email,
      phone: employeeDetails.phone,
      department_id: employeeDetails.department_id,
    };
    try {
      const res = await addEmployee(employee);
      console.log(res);
      setEmployeeDetails({
        name: "",
        email: "",
        phone: "",
        department_id: "",
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
    fetchDepartments();
  }, []);
  return (
    <div className="employee-page">
      <div className="employee_list">
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
          {t("AddEmployee")}
        </Button>
        <EmployeeList />
      </div>

      {openForm && (
        <div className="employee-container">
          <form onSubmit={handleSubmit} className="inputs">
            <h1>{t("AddEmployee")}</h1>

            <FormControl className={`${classes.formControl} mt-4`}>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="department_id"
                value={employeeDetails.department_id}
                onChange={handleChange}
              >
                {departments?.map((department) => (
                  <ListItem
                    key={department.id}
                    value={department.departmentname}
                  >
                    {department.departmentname}
                  </ListItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              className="mt-4"
              name="name"
              onChange={handleChange}
              value={employeeDetails.name}
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
            />
            {errors && errors.name ? (
              <p className="errorMessages">{errors.name.msg}</p>
            ) : (
              ""
            )}
            <TextField
              required
              className="mt-4"
              name="email"
              onChange={handleChange}
              value={employeeDetails.email}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              isEmail="true"
            />
            {errors.email && errors.email ? (
              <p className="errorMessages">{errors.email.msg}</p>
            ) : (
              ""
            )}
            <TextField
              required
              className="mt-4"
              name="phone"
              onChange={handleChange}
              value={employeeDetails.phone}
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
            />
            {errors.phone && errors.phone ? (
              <p className="errorMessages">{errors.phone.msg}</p>
            ) : (
              ""
            )}
            <Button
              onClick={handleSubmit}
              className="mt-4 mb-2"
              variant="contained"
              color="primary"
              style={{
                width: "250px",
                height: " 40px",
                marginLeft: "66px",
              }}
            >
              {t("AddEmployee")}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};
export default CreateEmployee;
