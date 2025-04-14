import React, { useState, useRef } from "react";
import Barcode from "react-barcode";
import useApi from "../../hooks/APIHandler";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import { useReactToPrint } from "react-to-print";

const GenerateBarcode = () => {
  const { error, loading, callApi } = useApi();
  const [transactionId, setTransactionId] = useState("");
  const [uniqueIds, setUniqueIds] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState();
  const printRef = useRef(); // 👈 reference for the component to print

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Generated Barcodes",
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
      }
    `,
  });

  // Function to fetch unique IDs based on the entered transaction ID
  const fetchUniqueIds = async () => {
    if (!transactionId) {
      toast.error("Please enter a transaction ID");
      return;
    }

    setLoadingData(true);
    try {
      const response = await callApi({
        url: `auth/getalluniqueid/`,
        method: "POST",
        body: {
          transaction_id: transactionId,
        },
      });
      console.log(response);
      if (response && response.status === 200) {
        setUniqueIds(response.data.unique_ids);
        setData(response.data);
      } else {
        toast.error("Error fetching unique IDs");
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error("Error: Something went wrong");
    } finally {
      setLoadingData(false);
    }
  };

  return (
    <Box>
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
        <Box width={{ md: "60%" }} height="100px" p={2}>
          <Typography variant="body1" sx={{ marginTop: 2, fontSize: "18px" }}>
            Generate Barcode from transaction Id
          </Typography>
          <Box alignItems="center">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: "10px",
                marginBottom: "10%",
              }}
            >
              <Typography variant="h6" sx={{ marginTop: 2 }}>
                Barcode
              </Typography>
              <Barcode
                value={"CKG462"}
                width={2}
                height={80}
                displayValue={false}
              />
              {data ? (
                <>
                  {" "}
                  <Typography variant="p" sx={{ marginTop: 2 }}>
                    {data.transaction_id}
                  </Typography>
                  <Typography variant="h6" sx={{ marginTop: 2 }}>
                    barcode generated for {data.total_bags} of bags
                  </Typography>
                </>
              ) : (
                <></>
              )}
            </Box>
            <Typography variant="h6" gutterBottom>
              Enter Transaction ID:
            </Typography>
            <TextField
              label="Transaction ID"
              variant="outlined"
              fullWidth
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={fetchUniqueIds}
              disabled={loadingData}
            >
              {loadingData ? "Loading..." : "Generate Barcodes"}
            </Button>
          </Box>
        </Box>

        {/* Divider between the two boxes */}
        <Divider orientation="vertical" flexItem />
        <Box width={{ md: "40%" }}>
          <Box
            variant="h6"
            gutterBottom
            sx={{
              position: "sticky",
              zIndex: 1,
              padding: "10px 10px",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
              width: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6"> Generated Barcodes</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePrint}
              disabled={!data?.bag_details?.length}
            >
              <PrintOutlinedIcon /> Print
            </Button>
          </Box>

          <Box
            ref={printRef}
            padding={2}
            sx={{
              height: "75vh",
              overflowY: "auto",
            }}
          >
            <Grid container spacing={8}>
              {data?.bag_details?.length > 0 ? (
                data.bag_details.map((bag, index) => (
                  <Grid item key={index} sx={{ textAlign: "center" }}>
                    <Barcode
                      value={`${bag.id},${bag.mfd},${bag.exd}`}
                      width={1.5}
                      height={100}
                      margin={10}
                      displayValue={true}
                    />
                  </Grid>
                ))
              ) : (
                <Typography marginTop={"50%"} marginLeft={"40%"} variant="h6">
                  Enter a transaction ID
                </Typography>
              )}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GenerateBarcode;
