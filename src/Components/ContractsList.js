import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { BACKEND_URL } from "../constants.js";

const ContractsList = () => {
  const [contracts, setContracts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getContracts();
    return;
  }, []);

  const getContracts = async () => {
    const data = await axios.get(`${BACKEND_URL}/contracts`);
    setContracts(data.data);
  };

  const dateStrTodateFormat = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-GB", {
      hour12: true,
      // weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // second: "numeric",
    });
  };

  const contractList = contracts.map((contracts, ind) => {
    return (
      // <li key={ind}>{contracts.id}</li>;
      <TableRow
        key={ind}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row" align="left">
          {contracts.id}
        </TableCell>
        <TableCell align="left">
          {contracts.description.substring(0, 25) + "..."}
        </TableCell>
        <TableCell align="left">
          {Math.round(contracts.amount_sgd, 2)}
        </TableCell>
        <TableCell align="left">{contracts.creator_id}</TableCell>
        <TableCell align="left">{contracts.contract_status}</TableCell>
        <TableCell align="left">
          {dateStrTodateFormat(contracts.start_date)}
        </TableCell>
        <TableCell align="left">
          {dateStrTodateFormat(contracts.end_date)}
        </TableCell>
        {/* <TableCell>{contracts.payment_id}</TableCell> */}
        <TableCell>{contracts.no_of_post_required}</TableCell>
      </TableRow>
    );
  });

  return (
    <div>
      Contract List
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">No</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Amount ($SGD)</TableCell>
              <TableCell align="left">Creator</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Start Date</TableCell>
              <TableCell align="left">End Date</TableCell>
              <TableCell align="left">Post Required (Qty)</TableCell>
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
