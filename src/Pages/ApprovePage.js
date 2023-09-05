import { React, useState, useEffect } from "react";
import axios from "axios";
import ContractsList from "../Components/ContractsList";

import { BACKEND_URL } from "../constants.js";

const ApprovePage = () => {
  return (
    <div>
      Pending Contracts
      <br />
      <br />
      <ContractsList filter="pendingApproval" />
    </div>
  );
};

export default ApprovePage;
