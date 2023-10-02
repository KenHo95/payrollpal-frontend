import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import ContractsList from "../Components/ContractsList";
import { BACKEND_URL } from "../constants";

const UpdateContractPost = (props) => {
  const [postDate, setPostDate] = useState("");
  const [description, setDescription] = useState("");
  const [postLink, setPostLink] = useState("");
  const [showSubmitPostLinkButton, setShowSubmitPostLinkButton] =
    useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const { getAccessTokenSilently } = useAuth0();

  const handleChange = (event) => {
    switch (event.target.name) {
      case "description":
        setDescription(event.target.value);
        break;
      case "postLink":
        setPostLink(event.target.value);
        break;
      case "postDate":
        setPostDate(event.target.value);
        break;
      default:
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve access token
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_API_AUDIENCE,
      });

      const res = await axios.post(
        `${BACKEND_URL}/posts`,
        {
          postDate,
          description,
          postLink,
          selectedContract,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSubmissionMessage(res.data);
      if (res.data !== "Post Link Submitted")
        setShowSubmitPostLinkButton(false);
    } catch (e) {
      console.log(e.message);
    }

    setPostDate("");
    setDescription("");
    setPostLink("");
    props.setToggleGetContract(!props.toggleGetContract);
  };

  return (
    <div>
      {showSubmitPostLinkButton && (
        <form onSubmit={handleSubmit}>
          {selectedContract && `Contract No: ${selectedContract}`}
          <br />
          Post Date:{" "}
          <input
            type="date"
            name="postDate"
            value={postDate}
            // min={currDate}
            onChange={handleChange}
            required
          />
          <br />
          Description:{" "}
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
            minLength="8"
            required
          />
          <br />
          Link to post:{" "}
          <input
            type="text"
            name="postLink"
            value={postLink}
            onChange={handleChange}
            min="1"
            step="0.01"
            required
          />
          <br />
          <input type="submit" value="Submit" />
          <br />
          <br />
        </form>
      )}
      {submissionMessage}
      <br />
      <br />
      <ContractsList
        filter="creatorContractsInProgress"
        userEmail={props.userEmail}
        setShowSubmitPostLinkButton={setShowSubmitPostLinkButton}
        setSelectedContract={setSelectedContract}
        toggleGetContract={props.toggleGetContract}
      />
      <ContractsList
        filter="creatorContractAll"
        page="home"
        userEmail={props.userEmail}
        toggleGetContract={props.toggleGetContract}
      />
    </div>
  );
};

export default UpdateContractPost;
// import React, { useState } from "react";
// import axios from "axios";
// import { useAuth0 } from "@auth0/auth0-react";
// import ContractsList from "../Components/ContractsList";
// import { BACKEND_URL } from "../constants";
// import { Button, TextField } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// const UpdateContractPost = (props) => {
//   const [postDate, setPostDate] = useState(null);
//   const [description, setDescription] = useState("");
//   const [postLink, setPostLink] = useState("");
//   const [selectedContract, setSelectedContract] = useState(null);
//   const [submissionMessage, setSubmissionMessage] = useState("");
//   const [showSubmitPostLinkButton, setShowSubmitPostLinkButton] =
//     useState(false);

//   const { getAccessTokenSilently } = useAuth0();

//   const handleChange = (event) => {
//     switch (event.target.name) {
//       case "description":
//         setDescription(event.target.value);
//         break;
//       case "postLink":
//         setPostLink(event.target.value);
//         break;
//       default:
//     }
//   };

//   const handleDateChange = (date) => {
//     setPostDate(date);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Retrieve access token
//       const accessToken = await getAccessTokenSilently({
//         audience: process.env.REACT_APP_API_AUDIENCE,
//       });

//       const res = await axios.post(
//         `${BACKEND_URL}/posts`,
//         {
//           postDate: postDate.toISOString(),
//           description,
//           postLink,
//           selectedContract,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       setSubmissionMessage(res.data);
//       if (res.data !== "Post Link Submitted") {
//         setShowSubmitPostLinkButton(false);
//       }
//     } catch (e) {
//       console.log(e.message);
//     }

//     setPostDate(null);
//     setDescription("");
//     setPostLink("");
//     props.setToggleGetContract(!props.toggleGetContract);
//   };

//   const isFormOpen = showSubmitPostLinkButton && !submissionMessage;

//   return (
//     <div>
//       {isFormOpen && (
//         <div className="add-contract-form">
//           <form onSubmit={handleSubmit}>
//             <div className="form-field">
//               {selectedContract && `Contract No: ${selectedContract}`}
//             </div>
//             <div className="form-field">
//               <label>Post Date:</label>
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DatePicker
//                   value={postDate}
//                   onChange={handleDateChange}
//                   renderInput={(params) => (
//                     <TextField
//                       type="text2"
//                       {...params}
//                       fullWidth
//                       required
//                       variant="outlined"
//                       InputProps={{
//                         style: {
//                           backgroundColor: "#ffff", // White background
//                         },
//                       }}
//                     />
//                   )}
//                 />
//               </LocalizationProvider>
//             </div>
//             <div className="form-field">
//               <label>Description:</label>
//               <TextField
//                 fullWidth
//                 type="text"
//                 name="description"
//                 value={description}
//                 onChange={handleChange}
//                 required
//                 variant="outlined"
//                 style={{ backgroundColor: "#fff", width: "15%" }} // Dark grey background
//               />
//             </div>
//             <div className="form-field">
//               <label>Link to post:</label>
//               <TextField
//                 fullWidth
//                 type="text"
//                 name="postLink"
//                 value={postLink}
//                 onChange={handleChange}
//                 required
//                 variant="outlined"
//                 style={{ backgroundColor: "#fff", width: "15%" }} // Dark grey background
//               />
//             </div>
//             <div className="form-field">
//               <Button type="submit" variant="contained" color="primary">
//                 Submit
//               </Button>
//             </div>
//           </form>
//         </div>
//       )}
//       {submissionMessage}
//       <br />
//       <br />
//       <ContractsList
//         filter="creatorContractsInProgress"
//         userEmail={props.userEmail}
//         setSelectedContract={setSelectedContract}
//         toggleGetContract={props.toggleGetContract}
//         showSubmitPostLinkButton={showSubmitPostLinkButton}
//         setShowSubmitPostLinkButton={setShowSubmitPostLinkButton}
//       />
//       <ContractsList
//         filter="creatorContractAll"
//         page="home"
//         userEmail={props.userEmail}
//         toggleGetContract={props.toggleGetContract}
//       />
//     </div>
//   );
// };

// export default UpdateContractPost;
