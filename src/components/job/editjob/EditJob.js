import React, { useState, useEffect } from "react";
import { getJobById, updateJob } from "../../../api/job";
import { withRouter, useHistory } from "react-router-dom";
import "./EditJob.css";
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

const EditJob = ({ match }) => {
  const [jobDetails, setJobDetails] = useState({});
  const classes = useStyles();
  const history = useHistory();

  const { t } = useTranslation();
  const getJob = async () => {
    const response = await getJobById(match.params.id);
    setJobDetails(response);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const handleSubmit = async () => {
    const updatedJob = {
      jobtitle: jobDetails.jobtitle,
      priceperhour: jobDetails.priceperhour,
    };
    const response = await updateJob(match.params.id, updatedJob);
    console.log(response);
    history.push("/createjob");
  };

  useEffect(() => {
    getJob();
  }, []);

  return (
    <div className="edit_job_page">
      <div className="row mt-5">
        <div className="col-lg-6 col-md-6 col-sm-12 m-auto">
          <div className="edit_job">
            <form className="inputs">
              <h1>{t("EditJob")}</h1>

              <TextField
                className="mt-4"
                name="jobtitle"
                value={jobDetails.jobtitle}
                onChange={handleChange}
                id="outlined-basic"
                variant="outlined"
              />
              <TextField
                className="mt-4"
                name="priceperhour"
                value={jobDetails.priceperhour}
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
                {t("EditJob")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(EditJob);
