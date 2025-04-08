import React, { useState, useEffect } from 'react';
import Barcode from 'react-barcode';
import useApi from "../../hooks/APIHandler";
import { toast } from "react-toastify";
import { TextField, Button, Grid, Paper, Typography, Box } from '@mui/material';

const GenerateBarcode = () => {
  const { error, loading, callApi } = useApi();
  const [transactionId, setTransactionId] = useState('');
  const [uniqueIds, setUniqueIds] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

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
          transaction_id: transactionId
        }
      });

      if (response && response.status === 200) {
        setUniqueIds(response.data.unique_ids); // Set the unique IDs in state
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Generate Barcodes from Unique IDs
      </Typography>

      <Grid container spacing={3}>
        {/* Left side: Input for transaction ID */}
        <Grid item xs={12} sm={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Enter Transaction ID
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
              {loadingData ? 'Loading...' : 'Generate Barcodes'}
            </Button>
          </Paper>
        </Grid>

        {/* Right side: Displaying Barcodes */}
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Generated Barcodes
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {uniqueIds.length > 0 ? (
                uniqueIds.map((id, index) => (
                  <Box key={index} sx={{ textAlign: 'center', minWidth: 150 }}>
                    <Barcode value={id} />
                  </Box>
                ))
              ) : (
                <Typography variant="body1">Enter a Transaction ID to generate barcodes.</Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GenerateBarcode;
