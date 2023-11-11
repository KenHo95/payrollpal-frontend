import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import CreatableSelect from "react-select/creatable";

// import Button from "@mui/material/Button";
// import jwt_decode from "jwt-decode";

import { BACKEND_URL } from "../constants";

const AddContractForm = () => {
  const [description, setDescription] = useState("");
  const [amountSgd, setAmountSgd] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [noOfPostRequired, setNoOfPostRequired] = useState("");
  const [creatorId, setCreatorId] = useState(1); // set 1 to reflect default value for first dropdown value
  const [creators, setCreators] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    // get updated list of creators
    getCreators();
    getCategoriesData();

    return;
  }, []);

  const getCreators = async () => {
    const res = await axios.get(`${BACKEND_URL}/creators/nameAndTiktokHandle`);
    setCreators(res.data);
  };

  // creator name dropdown list values
  let creatorsDropdownList = creators.map((creator, ind) => {
    return (
      <option
        key={ind}
        value={creator.id}
      >{`${creator.name} (${creator.tiktok_handle})`}</option>
    );
  });

  const handleChange = (event) => {
    switch (event.target.name) {
      case "description":
        setDescription(event.target.value);
        break;
      case "amountSgd":
        setAmountSgd(event.target.value);
        break;
      case "startDate":
        setStartDate(event.target.value);
        break;
      case "endDate":
        setEndDate(event.target.value);
        break;
      case "noOfPostRequired":
        setNoOfPostRequired(event.target.value);
        break;
      case "creators":
        setCreatorId(event.target.value);
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
        scope: "write:contract",
      });

      // Extract only category IDs to send to backend
      const selectedCategoryIds = selectedCategories.map(({ value }) => value);

      await axios.post(
        `${BACKEND_URL}/contracts`,
        {
          description,
          amountSgd,
          startDate,
          endDate,
          noOfPostRequired,
          creatorId,
          selectedCategoryIds,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (e) {
      console.log(e.message);
    }

    setDescription("");
    setAmountSgd("");
    setStartDate("");
    setEndDate("");
    setNoOfPostRequired("");
    setCreatorId("");
    setSelectedCategories([]);
  };

  // mindate input
  const currDate = new Date().toLocaleDateString("fr-ca");

  // categories drop down select
  const getCategoriesData = async () => {
    const res = await axios.get(`${BACKEND_URL}/categories`);
    setAllCategories(res.data);
  };

  const categoryOptions = allCategories.map((category) => ({
    // value is what we store
    value: category.id,
    // label is what we display
    label: category.name,
  }));

  // Make text black in Select field
  const selectFieldStyles = {
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  const handleCreate = (categoryInput) => {
    setIsLoading(true);
    setTimeout(async () => {
      // update model with created category
      const res = await axios.post(`${BACKEND_URL}/categories`, {
        name: categoryInput,
      });
      setIsLoading(false);
      // update categories dropdown with created category
      setAllCategories((prev) => [...prev, res.data]);
      // update selected categories with created category
      setSelectedCategories((prev) => [
        ...prev,
        { value: res.data.id, label: res.data.name },
      ]);
    }, 1000);
  };

  return (
    <div className="add-contract-form">
      <h2>Add Contract</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
            minLength="8"
            required
          />
        </div>
        <div className="form-field">
          <label>{"Amount ($SGD):"}</label>
          <input
            type="number"
            name="amountSgd"
            value={amountSgd}
            onChange={handleChange}
            min="1"
            step="0.01"
            required
          />
        </div>
        <div className="form-field">
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={startDate}
            min={currDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={endDate}
            min={startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Number Of Post Required:</label>
          <input
            type="number"
            name="noOfPostRequired"
            value={noOfPostRequired}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div className="form-field">
          <label>Creator:</label>
          <select name="creators" onChange={handleChange}>
            {creatorsDropdownList}
          </select>
        </div>
        <div className="form-field">
          <label>Categories:</label>
          <CreatableSelect
            isMulti
            isClearable
            styles={selectFieldStyles}
            options={categoryOptions}
            value={selectedCategories}
            onChange={(categories) => {
              setSelectedCategories(categories);
            }}
            onCreateOption={handleCreate}
            isDisabled={isLoading}
            isLoading={isLoading}
          />
        </div>
        <div className="form-field">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AddContractForm;
