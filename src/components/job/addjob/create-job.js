import React, { useState } from "react";
import "./job.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import JobList from "../joblist/JobList";
import { addJob } from "../../../api/job";
import { useTranslation } from "react-i18next";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

const CreateJob = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [messages, setMessages] = useState("");
  const [errors, setErrors] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [jobDetails, setJobDetails] = useState({
    jobtitle: "",
    priceperhour: "",
    error: false, //<---- here
    errorMessage: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const job = {
      jobtitle: jobDetails.jobtitle,
      priceperhour: jobDetails.priceperhour,
    };
    try {
      const res = await addJob(job);
      setJobDetails({
        jobtitle: "",
        priceperhour: "",
      });
      setMessages(res.message);
      setTimeout(() => {
        history.go("/");
      }, 2000);

      setOpenForm(false);
    } catch (e) {
      setErrors(e.response.data.errors);
    }
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  return (
    <div className="job-page">
      <div className="job_list">
        {messages ? <Alert severity="success">{messages}</Alert> : ""}
        <Button
          onClick={handleOpenForm}
          className="openform_button mt-4 mb-4"
          variant="contained"
          color="primary"
        >
          {t("AddJob")}
        </Button>
        <JobList />
      </div>

      {openForm && (
        <div className="job-container">
          <form onSubmit={handleSubmit} className="inputs">
            <h1>{t("AddJob")}</h1>

            <TextField
              className="mt-4"
              name="jobtitle"
              onChange={handleChange}
              value={jobDetails.jobtitle}
              id="outlined-basic"
              label="Job Title"
              variant="outlined"
            />
            {errors && errors.jobtitle ? (
              <p className="errorMessages">{errors.jobtitle.msg}</p>
            ) : (
              ""
            )}
            <TextField
              className="mt-4"
              name="priceperhour"
              onChange={handleChange}
              value={jobDetails.priceperhour}
              id="outlined-basic"
              label="Price per hour"
              variant="outlined"
            />
            {errors && errors.priceperhour ? (
              <p className="errorMessages">{errors.priceperhour.msg}</p>
            ) : (
              ""
            )}

            <Button
              onClick={handleSubmit}
              className="mt-4 mb-2 "
              variant="contained"
              color="primary"
              style={{
                marginLeft: "100px",
              }}
            >
              {t("AddJob")}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};
export default CreateJob;
