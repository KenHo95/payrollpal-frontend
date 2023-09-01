import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ContractsList from "../Components/ContractsList";

import jwt_decode from "jwt-decode";

const Home = () => {
  const [userPermission, setUserPermission] = useState(null);

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
            audience: "https://payrollpal/api",
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
      <ContractsList />
    </div>
  );
};
export default Home;
