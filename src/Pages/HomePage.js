import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Button from "@mui/material/Button";

import Charts from "../Components/Charts";
import ContractsList from "../Components/ContractsList";
import CreatorUpdatePostPage from "./CreatorUpdatePostPage";

const HomePage = (props) => {
  const { user } = useAuth0();

  return (
    <div>
      <br />
      <br />
      <h1>Insights</h1>
      <br />
      <Charts />
      <br />
      <br />
      {/* admin and content manager view */}
      {props.userPermission !== "Creator" && (
        <ContractsList filter="None" page="home" />
      )}
      {/* creator view */}
      {props.userPermission === "Creator" && (
        <div>
          <CreatorUpdatePostPage userEmail={user.email} />
          <ContractsList
            filter="creatorContractAll"
            page="home"
            userEmail={user.email}
          />
        </div>
      )}
      <br />
      <br />
    </div>
  );
};
export default HomePage;
