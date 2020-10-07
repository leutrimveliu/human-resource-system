import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import DepartmentList from "../departmentlist/DepartmentList";
import { addDepartment } from "../../../api/department";
import "./department.css";
import { useStateValue } from "../../../StateProvider";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const CreateDepartment = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [dispatch] = useStateValue();
  const [errors, setErrors] = useState();
  const [messages, setMessages] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [departmentDetails, setDepartmentDetails] = useState({
    departmentname: "",
    error: false, //<---- here
    errorMessage: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartmentDetails({ ...departmentDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const department = {
      departmentname: departmentDetails.departmentname,
    };
    try {
      const res = await addDepartment(department);
      setDepartmentDetails({
        departmentname: "",
      });
      setMessages(res.message);
      dispatch({
        type: "SET_MESSAGE",
        message: res.message,
      });
      setErrors("");
      setOpenForm(false);
      setTimeout(() => {
        history.go("/");
      }, 2000);
    } catch (e) {
      setErrors(e.response);
    }
  };

  console.log(errors);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  return (
    <div className="department-page ">
      <div className="department_list">
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
          {t("AddDepartment")}
        </Button>
        <DepartmentList />
      </div>

      {openForm && (
        <div className="department-container mb-5">
          <form onSubmit={handleSubmit} className="inputs">
            <h1>{t("AddDepartment")}</h1>

            <TextField
              className="mt-4"
              name="departmentname"
              onChange={handleChange}
              value={departmentDetails.departmentname}
              id="outlined-basic"
              label="Department Name"
              variant="outlined"
            />
            {errors ? <p className="errorMessages">{errors[0].msg}</p> : ""}
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
              {t("AddDepartment")}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};
export default CreateDepartment;
