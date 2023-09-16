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
      {props.userPermission !== "Creator" && <ContractsList filter="None" />}
      {/* creator view */}
      {props.userPermission === "Creator" && (
        <CreatorUpdatePostPage userEmail={user.email} />
      )}
      <br />
      <br />
    </div>
  );
};
export default HomePage;
