import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";

import Button from "@mui/material/Button";

import ContractsList from "../Components/ContractsList";

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
            setUserPermission(
              "Request admin to enable user role for this account"
            );
        }
      } catch (e) {
        console.log(e.message);
      }
    };

    user && getToken();

    return;
  }, [getAccessTokenSilently, user?.sub]);

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
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
      <br />
      <br />
      {isAuthenticated && (
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
      <Button
        variant="contained"
        onClick={() => {
          navigate("/overview");
        }}
      >
        Overview
      </Button>{" "}
      <Button
        variant="contained"
        onClick={() => {
          navigate("/create");
        }}
      >
        Create
      </Button>{" "}
      <Button
        variant="contained"
        onClick={() => {
          navigate("/approve");
        }}
      >
        Approve
      </Button>
      <br />
      <br />
      Contract List
      <br />
      <br />
      <ContractsList filter="None" />
      <br />
      <br />
    </div>
  );
};
export default HomePage;
