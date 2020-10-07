import React, { useState, useEffect } from "react";
import { getDepartmentById, updateDepartment } from "../../../api/department";
import { withRouter, useHistory } from "react-router-dom";
import "./EditDepartment.css";
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

const EditDepartment = ({ match }) => {
  const [departmentDetails, setDepartmentDetails] = useState({});
  const classes = useStyles();
  const history = useHistory();

  const { t } = useTranslation();
  const getDepartment = async () => {
    const response = await getDepartmentById(match.params.id);
    setDepartmentDetails(response);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartmentDetails({ ...departmentDetails, [name]: value });
  };

  const handleSubmit = async () => {
    const updatedDepartment = {
      departmentname: departmentDetails.departmentname,
    };
    const response = await updateDepartment(match.params.id, updatedDepartment);
    console.log(response);
    history.push("/createdepartment");
  };

  useEffect(() => {
    getDepartment();
  }, []);

  return (
    <div className="edit_department_page">
    <div className="row mt-5">
      <div className="col-lg-6 col-md-6 col-sm-12 m-auto">
        <div className="edit_department">
        <form className="inputs">
          <h1>{t("EditDepartment")}</h1>
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
          <TextField
            className="mt-4"
            name="departmentname"
            value={departmentDetails.departmentname}
            onChange={handleChange}
            id="outlined-basic"
            variant="outlined"
          />
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

          <Button
            onClick={handleSubmit}
            className="mt-4 mb-2"
            variant="contained"
            color="primary"
          >
            {t("EditDepartment")}
          </Button>
        </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default withRouter(EditDepartment);
