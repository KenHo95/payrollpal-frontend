import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import ContractsList from "../Components/ContractsList";

const ApprovePage = () => {
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
      Pending Contracts
      <br />
      <br />
      <ContractsList filter="pendingApproval" />
    </div>
  );
};

export default ApprovePage;