import React from "react";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";

const PDFButton = (props) => {
  const PayslipPDF = (contract) => {
    return (
      <Document>
        <Page>
          <Text>Employee Name: {contract.creator.name}</Text>
          <Text>Amount (SGD): {contract.amount_sgd}</Text>
          <Text>
            Translated Amount ({contract.payment.payee_currency}):{" "}
            {contract.payment.translated_amount}
          </Text>
          <Text>Start Date: {contract.start_date}</Text>
          <Text>Email: {contract.creator.email}</Text>
          <Text>Payment Date: {contract.payment.payment_date}</Text>
        </Page>
      </Document>
    );
  };

  return (
    <div>
      {/* {PayslipPDF(props.contract)} */}
      <PDFDownloadLink
        document={PayslipPDF(props.contract)}
        fileName={`payslip_${props.creator_id}.pdf`}
      >
        {({ loading }) => (loading ? "Generating PDF..." : "Download Payslip")}
      </PDFDownloadLink>
    </div>
  );
};

export default PDFButton;
