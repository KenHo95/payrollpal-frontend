import { React, useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import HelpIcon from "@mui/icons-material/Help";

import PDFButton from "../Components/PDFButton.js";
import PostsPreview from "../Components/PostsPreview";

import { BACKEND_URL } from "../constants.js";

const ContractsList = (props) => {
  const [contracts, setContracts] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getContracts();
    return;
  }, [props.toggleGetContract, props.toggleGetPostPreview]);

  const getContracts = async () => {
    let data = [];
    if (props.filter === "None") {
      data = await axios.get(`${BACKEND_URL}/contracts`);
    } else if (props.filter === "pendingApproval") {
      data = await axios.get(`${BACKEND_URL}/contracts/pending-approval`);
    } else if (props.filter === "creatorContractsInProgress") {
      data = await axios.get(
        `${BACKEND_URL}/contracts/creator-contracts/in-progress/${props.userEmail}`
      );
    } else if (props.filter === "creatorContractAll") {
      data = await axios.get(
        `${BACKEND_URL}/contracts/creator-contracts/all/${props.userEmail}`
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
          {/* {contract.description.substring(0, 25) + "..."}
           */}
          {contract.description}
        </TableCell>
        <TableCell align="left">{Math.round(contract.amount_sgd, 2)}</TableCell>
        {!props.userEmail && (
          <TableCell align="left">{contract.creator.name}</TableCell>
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
        {/* only show submit post link button for creator login */}
        {props.filter === "creatorContractsInProgress" && (
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
        {/* only show download payslip button if contract is paid */}
        {props.page !== "approve" && (
          <TableCell>
            {contract.contract_status === "Paid" ? (
              <PDFButton contract={contract} />
            ) : (
              <p className="placeholderText">1</p>
            )}
          </TableCell>
        )}
        <TableCell>
          {/* only show post preview button if contract have related post */}
          {contract.posts.length !== 0 && (
            <PostsPreview
              contract_id={contract.id}
              tiktokHandle={contract.creator.tiktok_handle}
              toggleGetPostPreview={props.toggleGetPostPreview}
              toggleGetContract={props.toggleGetContract}
            />
          )}
        </TableCell>
        {/* only show approve button in approve page */}
        {props.filter === "pendingApproval" && (
          <TableCell>
            <Button onClick={() => handleApproveButtonClick(contract.id)}>
              APPROVE
            </Button>
          </TableCell>
        )}
      </TableRow>
    );
  });

  let tableHeading = "";
  if (props.page === "home") {
    tableHeading = "Contracts List";
  } else if (props.page === "approve") {
    tableHeading = "Contracts Pending Approval";
  } else {
    tableHeading = "Contracts In Progress";
  }

  // popover
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const contractStatuses = [
    <p>
      <strong>
        <em>In Progress</em>
      </strong>
      : Contract pending Creator post(s)
    </p>,
    <p>
      <strong>
        <em>Pending Approval</em>
      </strong>
      : Creator posted, Pending Content Manager approval
    </p>,
    <p>
      <strong>
        <em>Approved</em>
      </strong>
      : Content Manager approved, Pending daily automated batch payment process
    </p>,
    <p>
      <strong>
        <em>Paid</em>
      </strong>
      : Contract paid
    </p>,
  ];

  const popover = (
    <div>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        Status <HelpIcon color="primary"></HelpIcon>
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <ol>
          {contractStatuses.map((status, ind) => (
            <Typography key={ind} sx={{ p: 1 }}>
              <li>{status}</li>
            </Typography>
          ))}
        </ol>
      </Popover>
    </div>
  );

  return (
    <div>
      <h3>{tableHeading}</h3>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">No</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Amount ($SGD)</TableCell>
              {!props.userEmail && <TableCell align="left">Creator</TableCell>}
              <TableCell align="left">{popover}</TableCell>
              <TableCell align="left">Start Date</TableCell>
              <TableCell align="left">End Date</TableCell>
              <TableCell align="left">Post Required (Qty)</TableCell>
              {!props.userEmail && <TableCell align="left">Category</TableCell>}
              {props.page !== "approve" && (
                <TableCell align="left">Payslip</TableCell>
              )}
              <TableCell align="left">Preview</TableCell>
              {props.page === "approve" && (
                <TableCell align="left">Approve</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>{contractList}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ContractsList;
