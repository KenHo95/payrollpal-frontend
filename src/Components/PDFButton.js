import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import Button from "@mui/material/Button";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    textDecoration: "underline",
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  value: {
    fontSize: 18,
    marginBottom: 10,
  },
  // Style for the download button
  button: {
    backgroundColor: "#007bff", // Button background color
    color: "white", // Button text color
    padding: "10px 20px", // Button padding
    border: "none", // Remove button border
    cursor: "pointer", // Add cursor pointer on hover
    transition: "background-color 0.3s", // Add smooth hover transition
    textDecoration: "none", // Remove default link underline
    display: "inline-block", // Display as inline-block to behave like a button
    fontSize: 14,
  },
  buttonHover: {
    backgroundColor: "#0056b3", // Button background color on hover
  },
});

const PayslipPDF = (contract) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Payslip</Text>
        <Text style={styles.label}>Employee Name:</Text>
        <Text style={styles.value}>{contract.creator.name}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{contract.creator.email}</Text>
        <Text style={styles.label}>Contract Id:</Text>
        <Text style={styles.value}>{contract.id}</Text>
        <Text style={styles.label}>Contract Start Date:</Text>
        <Text style={styles.value}>{contract.start_date.slice(0, 10)}</Text>
        <Text style={styles.label}>Payment Date:</Text>
        <Text style={styles.value}>
          {contract.payment?.payment_date.slice(0, 10)}
        </Text>
        <Text style={styles.label}>Amount (SGD):</Text>
        <Text style={styles.value}>{contract.amount_sgd}</Text>
        <Text style={styles.label}>
          Translated Amount ({contract.payment?.payee_currency}):
        </Text>
        <Text style={styles.value}>{contract.payment?.translated_amount}</Text>
      </Page>
    </Document>
  );
};

const PDFButton = (props) => {
  return (
    <div>
      <PDFDownloadLink
        document={PayslipPDF(props.contract)}
        fileName={`payslip_${props.contract.creator.name}_${props.contract.id}.pdf`}
      >
        {({ loading }) =>
          loading ? (
            "Generating PDF..."
          ) : (
            <Button
              variant="contained"
              color="primary"
              style={{
                maxWidth: "30px",
                maxHeight: "30px",
                minWidth: "30px",
                minHeight: "30px",
              }}
            >
              <DownloadRoundedIcon />
            </Button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default PDFButton;
