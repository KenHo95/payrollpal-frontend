import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";

import Button from "@mui/material/Button";

import Charts from "../Components/Charts";
import ContractsList from "../Components/ContractsList";
import CreatorUpdatePostPage from "./CreatorUpdatePostPage";

const HomePage = () => {
  const [userPermission, setUserPermission] = useState(null);
  const navigate = useNavigate();

  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_API_AUDIENCE,
            scope: "profile email",
          },
        });
        // console.log(accessToken);
        // decode access token to get user permission
        var decoded = jwt_decode(accessToken);
        // console.log(decoded);

        // set user permission
        switch (decoded.permissions[0]) {
          case "write:contract": // admin
            setUserPermission("Admin");
            break;
          case "write:approve-contract": // approval
            setUserPermission("Content Manager");
            break;
          default:
            setUserPermission("Creator");
          // setUserPermission("Request admin to activate this account");
        }
      } catch (e) {
        console.log(e.message);
      }
    };

    user && getToken();

    return;
  }, [getAccessTokenSilently, user?.sub]);

  let tableHeading = "";
  if (userPermission !== "Creator") {
    tableHeading = "Contract List";
  } else {
    tableHeading = "Contracts In Progress";
  }

  return (
    <div>
      {isLoading && <div>Loading ...</div>}
      {isAuthenticated && (
        <div>
          {/* {console.log(user)} */}
          <img src={user.picture} alt={user.name} />
          <p>{user.email}</p>
          Role: {userPermission}
        </div>
      )}
      <br />
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      ) : (
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Log Out
        </button>
      )}
      <br />
      <br />
      {userPermission === "Admin" && (
        <Button
          variant="contained"
          onClick={() => {
            navigate("/create");
          }}
        >
          Create
        </Button>
      )}{" "}
      {userPermission === "Content Manager" && (
        <Button
          variant="contained"
          onClick={() => {
            navigate("/approve");
          }}
        >
          Approve
        </Button>
      )}
      <br />
      <br />
      <Charts />
      <br />
      <br />
      {user?.email && tableHeading}
      <br />
      <br />
      {user?.email && userPermission !== "Creator" && (
        <ContractsList filter="None" />
      )}
      {user?.email && userPermission === "Creator" && (
        <CreatorUpdatePostPage userEmail={user.email} />
      )}
      {!user?.email && "Login to use app"}
      <br />
      <br />
    </div>
  );
};
export default HomePage;
