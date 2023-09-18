// import AddCreatorForm from "../Components/AddCreatorForm";
// import AddContractForm from "../Components/AddContractForm";

// const CreatePage = () => {
//   return (
//     <div>
//       <br />
//       <br />
//       <AddContractForm />
//       <br />
//       <br />
//       <AddCreatorForm />
//       <br />
//       <br />
//     </div>
//   );
// };

// export default CreatePage;

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
              sx={{ marginBottom: 2 }}
              onClick={handleShowContractForm}
            >
              Contract Form
            </Button>
            <div className="button-wrapper">
              <Button
                variant="contained"
                sx={{ marginBottom: 2 }}
                onClick={handleShowCreatorForm}
              >
                Creator Form
              </Button>
            </div>
          </div>
        )}
        {(showCreatorForm || showContractForm) && (
          <button onClick={handleCloseForms}>x</button>
        )}
      </div>
      {showCreatorForm && <AddCreatorForm />}
      {showContractForm && <AddContractForm />}
    </div>
  );
};

export default CreatePage;
