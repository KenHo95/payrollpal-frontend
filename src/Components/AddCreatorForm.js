import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

// import Button from "@mui/material/Button";
import { BACKEND_URL } from "../constants";

const AddCreatorForm = () => {
  const [name, setName] = useState("");
  const [tiktokHandle, setTiktokHandle] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [bankAccountNum, setBankAccountNum] = useState("");
  const [bankIdentifierCode, setBankIdentifierCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [residenceCountry, setResidenceCountry] = useState("");

  const { getAccessTokenSilently } = useAuth0();

  const handleChange = (event) => {
    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;
      case "tiktokHandle":
        setTiktokHandle(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "address":
        setAddress(event.target.value);
        break;
      case "bankAccountNum":
        setBankAccountNum(event.target.value);
        break;
      case "bankIdentifierCode":
        setBankIdentifierCode(event.target.value);
        break;
      case "bankName":
        setBankName(event.target.value);
        break;
      case "residenceCountry":
        setResidenceCountry(event.target.value);
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
        scope: "write:contract", // request admin scope
      });

      // Send post req
      await axios.post(
        `${BACKEND_URL}/creators`,
        {
          name,
          tiktokHandle,
          email,
          address,
          bankAccountNum,
          bankIdentifierCode,
          bankName,
          residenceCountry,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }

    setName("");
    setTiktokHandle("");
    setEmail("");
    setAddress("");
    setBankAccountNum("");
    setBankIdentifierCode("");
    setBankName("");
    setResidenceCountry("");
  };

  return (
    // <div>
    //   Add Creator
    //   <br />
    //   <br />
    //   <form onSubmit={handleSubmit}>
    //     Name:{" "}
    //     <input type="text" name="name" value={name} onChange={handleChange} />
    //     <br />
    //     Tiktok Handle:{" "}
    //     <input
    //       type="text"
    //       name="tiktokHandle"
    //       value={tiktokHandle}
    //       onChange={handleChange}
    //       required
    //     />
    //     <br />
    //     Email:{" "}
    //     <input type="text" name="email" value={email} onChange={handleChange} />
    //     <br />
    //     Address:{" "}
    //     <input
    //       type="text"
    //       name="address"
    //       value={address}
    //       onChange={handleChange}
    //       required
    //     />
    //     <br />
    //     Bank Account Number:{" "}
    //     <input
    //       type="text"
    //       name="bankAccountNum"
    //       value={bankAccountNum}
    //       onChange={handleChange}
    //       required
    //     />
    //     <br />
    //     Bank Identifier Code:{" "}
    //     <input
    //       type="text"
    //       name="bankIdentifierCode"
    //       value={bankIdentifierCode}
    //       onChange={handleChange}
    //       required
    //     />
    //     <br />
    //     Bank Name:{" "}
    //     <input
    //       type="text"
    //       name="bankName"
    //       value={bankName}
    //       onChange={handleChange}
    //       required
    //     />
    //     <br />
    //     Residence Country:{" "}
    //     <input
    //       type="text"
    //       name="residenceCountry"
    //       value={residenceCountry}
    //       onChange={handleChange}
    //       required
    //     />
    //     <br />
    //     <input type="submit" value="Submit" />
    //   </form>
    // </div>
    <div className="add-creator-form">
      <h2>Add Creator</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Tiktok Handle:</label>
          <input
            type="text"
            name="tiktokHandle"
            value={tiktokHandle}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Bank Account Number:</label>
          <input
            type="text"
            name="bankAccountNum"
            value={bankAccountNum}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Bank Identifier Code:</label>
          <input
            type="text"
            name="bankIdentifierCode"
            value={bankIdentifierCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Bank Name:</label>
          <input
            type="text"
            name="bankName"
            value={bankName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Residence Country:</label>
          <input
            type="text"
            name="residenceCountry"
            value={residenceCountry}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AddCreatorForm;
