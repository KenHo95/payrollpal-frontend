import { React, useState, useEffect } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ComposedChart,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  // Scatter,
} from "recharts";

import { BACKEND_URL } from "../constants.js";

const Charts = () => {
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
    let res,
      res2 = [];
    // if (props.filter === "None") {
    //   data = await axios.get(`${BACKEND_URL}/contracts`);
    // } else if (props.filter === "pendingApproval") {
    //   data = await axios.get(`${BACKEND_URL}/contracts/pending-approval`);
    // } else if (props.filter === "creatorContracts") {
    //   data = await axios.get(
    //     `${BACKEND_URL}/contracts/creator-contracts/${props.userEmail}`
    //   );
    // }
    res = await axios.get(
      `${BACKEND_URL}/contracts/monthly-contract-payment/2023` //update fiscalYear params input
    );
    res2 = await axios.get(
      `${BACKEND_URL}/categories/monthly-categories-data/2023` //update fiscalYear params input
    );

    // console.log(res);
    setContractVsPaymentData(res.data);
    setCategoriesData(res2.data);
  };

  // const data = [
  //   {
  //     month: "Jan",
  //     sumContractAmount: 590,
  //     sumPaymentAmount: 800,
  //     ph: 200,
  //     // amt: 1400,
  //     // cnt: 490,
  //   },
  //   {
  //     month: "Feb",
  //     sumContractAmount: 868,
  //     sumPaymentAmount: 967,
  //     ph: 200,
  //   },
  //   {
  //     month: "Mar",
  //     sumContractAmount: 1397,
  //     sumPaymentAmount: 1098,
  //     ph: 200,
  //   },
  // ];

  const barChartColors = [
    // {colours from https://coolors.co/574d68-a38560-c6a15b-f2e86d-d3dfb8}
    // colours for up to 10 categories
    "#190b28",
    "#685762",
    "#9b9987",
    "#efa9ae",
    "#e55381",
    "#f2e86d",
    "#413ea0",
    "#ff7300",
    "#691e06",
    "#AAFFE5",
  ];

  return (
    // kpi:
    // total contract value
    // total payment value
    // total creators
    <div>
      Monthly Payment Vs Contract Amount ($SGD)
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
        {/* <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
        <Bar dataKey="sumContractAmount" barSize={20} fill="#413ea0" />
        <Bar dataKey="sumPaymentAmount" barSize={20} fill="#ff7300" />
        {/* <Line type="monotone" dataKey="sumPaymentAmount" stroke="#ff7300" /> */}
        {/* <Scatter dataKey="cnt" fill="red" /> */}
      </ComposedChart>
      {/*  */}
      Categories Breakdown (Count)
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
      {/* Approval contract Aging (t-5)
      <BarChart // change to pending approval contract Aging (t-5)
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="contract" fill="#8884d8" barSize={40} />
      </BarChart>
      <br /> */}
      {/* Incomplete contracts Aging (t-5)
      <BarChart // change to incomplete contracts Aging (t-5)
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="contract" fill="#8884d8" barSize={40} />
      </BarChart> */}
    </div>
  );
};
export default Charts;
