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

import { BACKEND_URL } from "../constant.js";

const ContractsList = () => {
  const [contracts, setContracts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getContracts();
    return;
  }, []);

  const getContracts = async () => {
    const data = await axios.get(`${BACKEND_URL}/creators`);
    setContracts(data.data);
  };

  // const createData = (name, calories, fat, carbs, protein) => {
  //   return { name, calories, fat, carbs, protein };

  const contractList = contracts.map((contracts, ind) => {
    return (
      // <li key={ind}>{contracts.id}</li>;
      <TableRow
        key={ind}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {contracts.name}
        </TableCell>
        <TableCell>{contracts.id}</TableCell>
        <TableCell>{contracts.description}</TableCell>
        <TableCell>{contracts.amount_sgd}</TableCell>
        <TableCell>{contracts.creator_id}</TableCell>
        <TableCell>{contracts.start_date}</TableCell>
        <TableCell>{contracts.end_date}</TableCell>
        <TableCell>{contracts.payment_id}</TableCell>
        <TableCell>{contracts.creator_id}</TableCell>
      </TableRow>
    );
  });

  return (
    <div>
      Contracts:
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Creator</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Approvel Status</TableCell>
            </TableRow>
            {/* <TableBody>contractList</TableBody> */}
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ContractsList;