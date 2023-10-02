import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import Button from "@mui/material/Button";

import Charts from "../Components/Charts";
import ContractsList from "../Components/ContractsList";
import CreatorUpdatePostPage from "./CreatorUpdatePostPage";

import { BACKEND_URL } from "../constants.js";

const HomePage = (props) => {
  const { user } = useAuth0();
  const [toggleGetContract, setToggleGetContract] = useState(true);

  const handleClick = async () => {
    await axios.post(`${BACKEND_URL}/contracts/pay-approved-contracts`);

    setToggleGetContract(!toggleGetContract);
  };

  return (
    <div>
      <br />
      <br />
      <h3>Insights</h3>
      <br />
      {props.userPermission && <Charts userPermission={props.userPermission} />}
      <br />
      <br />
      {/* for demo to simulate batch payment */}
      {props.userPermission === "Content Manager" && (
        <Button variant="outlined" size="large" onClick={handleClick}>
          Simulate Batch payment
        </Button>
      )}
      {/* admin and content manager view */}
      {props.userPermission !== "Creator" && (
        <ContractsList
          filter="None"
          page="home"
          toggleGetContract={toggleGetContract}
        />
      )}
      {/* creator view */}
      {props.userPermission === "Creator" && (
        <div>
          <CreatorUpdatePostPage
            userEmail={user.email}
            toggleGetContract={toggleGetContract}
            setToggleGetContract={setToggleGetContract}
          />
        </div>
      )}
      <br />
      <br />
    </div>
  );
};
export default HomePage;
