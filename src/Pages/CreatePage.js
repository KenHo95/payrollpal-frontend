import { useNavigate } from "react-router-dom";

import AddCreatorForm from "../Components/AddCreatorForm";
import AddContractForm from "../Components/AddContractForm";
import Button from "@mui/material/Button";

const CreatePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <br />
      <br />
      <Button
        variant="contained"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
      <br />
      <br />
      <AddContractForm />
      <br />
      <br />
      <AddCreatorForm />
      <br />
      <br />
    </div>
  );
};

export default CreatePage;
