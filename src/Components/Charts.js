import { React, useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import {
  BarChart,
  Bar,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { BACKEND_URL } from "../constants.js";

const Charts = (props) => {
  const { user } = useAuth0();
  const [contractVsPaymentData, setContractVsPaymentData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    getData();
    getCategoriesData();
    return;
  }, []);

  const getCategoriesData = async () => {
    const res = await axios.get(`${BACKEND_URL}/categories`);
    setAllCategories(res.data);
  };

  const getData = async () => {
    // console.log(props.userPermission);
    let res,
      res2 = [];

    // get current fiscal year to filter data on
    const currFiscalYear = new Date().getFullYear();

    if (props.userPermission === "Creator") {
      res = await axios.get(
        `${BACKEND_URL}/contracts/monthly-contract-payment/${currFiscalYear}/${user.email}`
      );
      res2 = await axios.get(
        `${BACKEND_URL}/categories/monthly-categories-data/${currFiscalYear}/${user.email}`
      );
    } else {
      res = await axios.get(
        `${BACKEND_URL}/contracts/monthly-contract-payment/${currFiscalYear}`
      );
      res2 = await axios.get(
        `${BACKEND_URL}/categories/monthly-categories-data/${currFiscalYear}`
      );
    }

    setContractVsPaymentData(res.data);
    setCategoriesData(res2.data);
  };

  const barChartColors = [
    // {colours from https://coolors.co/574d68-a38560-c6a15b-f2e86d-d3dfb8}
    // colours for up to 10 categories
    "#AAFFE5",
    "#685762",
    "#9b9987",
    "#efa9ae",
    "#e55381",
    "#f2e86d",
    "#413ea0",
    "#ff7300",
    "#691e06",
    "#190b28",
  ];

  return (
    <div className="chart-container">
      <div className="chart-title">
        <h4>Monthly Payment Vs Contract Amount ($SGD)</h4>
      </div>
      <div className="Charts">
        <ComposedChart
          width={700}
          height={500}
          data={contractVsPaymentData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sumContractAmount" barSize={20} fill="#413ea0" />
          <Bar dataKey="sumPaymentAmount" barSize={20} fill="#ff7300" />
        </ComposedChart>
      </div>
      <br />
      <div className="chart-title">
        <h4>Contract Categories Breakdown (Count)</h4>
      </div>
      <div className="Charts">
        <BarChart
          width={700}
          height={500}
          data={categoriesData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthName" />
          <YAxis />
          <Tooltip />
          <Legend />
          {allCategories.map((category, ind) => (
            // render bar stack for each category
            <Bar
              key={ind}
              dataKey={category.name}
              stackId="a"
              fill={barChartColors[ind]}
            />
          ))}
        </BarChart>
        <br />
      </div>
    </div>
  );
};
export default Charts;
