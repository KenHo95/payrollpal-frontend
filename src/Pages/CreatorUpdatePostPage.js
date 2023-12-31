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
  const [toggleGetPostPreview, setToggleGetPostPreview] = useState(true);

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

      if (res.data) {
        setTimeout(function () {
          setToggleGetPostPreview(!toggleGetPostPreview);
        }, 1000);
      }
    } catch (e) {
      console.log(e.message);
    }
    props.setToggleGetContract(!props.toggleGetContract);
    setPostDate("");
    setDescription("");
    setPostLink("");
  };

  return (
    <div className="add-contract-form">
      {showSubmitPostLinkButton && (
        <form onSubmit={handleSubmit}>
          {selectedContract && `Contract No: ${selectedContract}`}
          <br />
          <div>
            <label>Post Date:</label>
            <input
              type="date"
              name="postDate"
              value={postDate}
              onChange={handleChange}
              required
            />
          </div>
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
        toggleGetPostPreview={toggleGetPostPreview}
      />
      <ContractsList
        filter="creatorContractAll"
        page="home"
        userEmail={props.userEmail}
        toggleGetContract={props.toggleGetContract}
        toggleGetPostPreview={toggleGetPostPreview}
      />
    </div>
  );
};

export default UpdateContractPost;
