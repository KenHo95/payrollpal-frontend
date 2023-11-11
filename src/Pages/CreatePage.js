import React, { useState } from "react";
import AddCreatorForm from "../Components/AddCreatorForm";
import AddContractForm from "../Components/AddContractForm";
import Button from "@mui/material/Button";

const CreatePage = () => {
  const [showCreatorForm, setShowCreatorForm] = useState(false);
  const [showContractForm, setShowContractForm] = useState(false);

  const handleShowCreatorForm = () => {
    setShowCreatorForm(true);
    setShowContractForm(false);
  };

  const handleShowContractForm = () => {
    setShowCreatorForm(false);
    setShowContractForm(true);
  };

  const handleCloseForms = () => {
    setShowCreatorForm(false);
    setShowContractForm(false);
  };

  return (
    <div className="create-page">
      <div className="button-container">
        {!showCreatorForm && !showContractForm && (
          <div className="button-wrapper">
            <Button
              variant="contained"
              sx={{ marginBottom: 4 }}
              size="large"
              onClick={handleShowContractForm}
            >
              Contract
            </Button>
            <div className="button-wrapper">
              <Button
                variant="contained"
                size="large"
                onClick={handleShowCreatorForm}
              >
                Creator
              </Button>
            </div>
          </div>
        )}
        {(showCreatorForm || showContractForm) && (
          <Button variant="contained" color="info" onClick={handleCloseForms}>
            Back
          </Button>
        )}
      </div>
      {showCreatorForm && <AddCreatorForm />}
      {showContractForm && <AddContractForm />}
    </div>
  );
};

export default CreatePage;
