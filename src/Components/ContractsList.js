import { React, useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";
// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import PDFButton from "../Components/PDFButton.js";

import { BACKEND_URL } from "../constants.js";

const ContractsList = (props) => {
  const [contracts, setContracts] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getContracts();
    return;
  }, [props.toggleGetContract]);

  const getContracts = async () => {
    let data = [];
    if (props.filter === "None") {
      data = await axios.get(`${BACKEND_URL}/contracts`);
    } else if (props.filter === "pendingApproval") {
      data = await axios.get(`${BACKEND_URL}/contracts/pending-approval`);
    } else if (props.filter === "creatorContracts") {
      data = await axios.get(
        `${BACKEND_URL}/contracts/creator-contracts/${props.userEmail}`
      );
    }

    setContracts(data.data);
  };

  const dateStrTodateFormat = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-GB", {
      hour12: true,
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  const handleApproveButtonClick = async (id) => {
    try {
      // Retrieve access token
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_API_AUDIENCE,
        scope: "write:approve-contract", // request content manager scope
      });

      // decode access token to get user permission
      // var decoded = jwt_decode(accessToken);
      // console.log(decoded);

      // Send post req
      await axios.put(
        `${BACKEND_URL}/contracts/approve`,
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      getContracts();
    } catch (err) {
      console.log(err);
    }
  };

  const contractList = contracts.map((contract, ind) => {
    return (
      <TableRow
        key={ind}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row" align="left">
          {contract.id}
        </TableCell>
        <TableCell align="left">
          {contract.description.substring(0, 25) + "..."}
        </TableCell>
        <TableCell align="left">{Math.round(contract.amount_sgd, 2)}</TableCell>
        {!props.userEmail && (
          <TableCell align="left">{contract.creator?.name}</TableCell>
        )}
        <TableCell align="left">{contract.contract_status}</TableCell>
        <TableCell align="left">
          {dateStrTodateFormat(contract.start_date)}
        </TableCell>
        <TableCell align="left">
          {dateStrTodateFormat(contract.end_date)}
        </TableCell>
        {/* <TableCell>{contract.payment_id}</TableCell> */}
        <TableCell>{contract.no_of_post_required}</TableCell>
        {!props.userEmail && (
          <TableCell align="left">
            {contract.categories?.map((category) => category.name).join(", ")}
          </TableCell>
        )}
        {props.filter === "creatorContracts" && (
          <TableCell>
            <Button
              onClick={() => {
                props.setShowSubmitPostLinkButton(true);
                props.setSelectedContract(contract.id);
              }}
            >
              Submit Post Link
            </Button>
          </TableCell>
        )}
        {props.filter === "pendingApproval" && (
          <TableCell>
            <Button onClick={() => handleApproveButtonClick(contract.id)}>
              APPROVE
            </Button>
          </TableCell>
        )}
        {/* only show download payslip button if contract is paid */}
        {contract.contract_status === "Paid" && (
          <TableCell>
            <PDFButton contract={contract} />
          </TableCell>
        )}
      </TableRow>
    );
  });

  return (
    <div>
      {/* {console.log(contracts)}{" "} */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">No</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Amount ($SGD)</TableCell>
              {!props.userEmail && <TableCell align="left">Creator</TableCell>}
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Start Date</TableCell>
              <TableCell align="left">End Date</TableCell>
              <TableCell align="left">Post Required (Qty)</TableCell>
              {!props.userEmail && <TableCell align="left">Category</TableCell>}
              {/* <TableCell align="left">Payment Status</TableCell> */}
              {/* <TableCell align="left">Approval Status</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>{contractList}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ContractsList;
