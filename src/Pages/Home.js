import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ContractsList from "../Components/ContractsList";

const Home = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div>
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
