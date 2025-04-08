import React, { useState, useEffect } from "react";
import {
  Box,
  Breadcrumbs,
  Grid,
  LinearProgress,
  TextField,
  Typography,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import useApi from "../../hooks/APIHandler";
import { toast } from "react-toastify";
import { getUser } from "../../utils/Helper";

const Farmer = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [stockList, setStockList] = useState(false);
  const [transactionId, setTransactionId] = useState(""); // State for Transaction ID
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const [stockData, setStockData] = useState([]); // State to hold rows data
  const { error, loading, callApi } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = getUser().username;
        const response = await callApi({
          url: `auth/stockinbag_get/`,
          method: "POST",
          body: {
            farmer_name: username,
          },
        });
        console.log(response)
        if (response) {
          setStockData(response.data.bags); // Assuming 'data' contains the rows for the table
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
        toast.error("Error fetching stock data");
      }
    };

    fetchData();
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddNewBagClick = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = async () => {
    try {
      const username = getUser().username;
      const response = await callApi({
        url: `auth/stockinfarmer/`,
        method: "POST",
        body: {
          dist_transaction_id: transactionId,
          farmer_name: username,
        },
      });
      console.log("bags", response);
      // toast.success("Form submitted successfully");
    } catch (error) {
      console.error("API error:", error);
      toast.error("Error: Something went wrong");
    }
  }
  
  const columns = [
    { field: "serial_no", headerName: "Sl. No", width: 150 },
    { field: "manufacture_name", headerName: "M.F Name", width: 200 },
    { field: "unique_id", headerName: "Unique ID", width: 200 },
    { field: "feed_name", headerName: "Feed Name", width: 200 },
    { field: "manufacture_date", headerName: "M.F Date", width: 180 },
    { field: "expiring_date", headerName: "Ex. Date", width: 180 },
    {
      field: "stock_status",
      headerName: "Stock Status",
      width: 180,
      renderCell: (params) => {
        const isStockStatusUsed = params.value === "Used"; // Check if the status is "Used" or any other value you want
        return (
          <div
          style={{
            color: "white", 
            backgroundColor: isStockStatusUsed ? "grey" : "green", 
            borderRadius: "12px", 
            textAlign: "center", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            fontSize: "12px", 
            height: "20px", 
            width: "80px", 
            marginTop: "25px",
          }}
          >
            {params.value}
          </div>
        );
      },
    },
    { field: "feed_weight", headerName: "Feed Weight", width: 150 },
    { field: "amount_paid", headerName: "Amount Paid", width: 180 },
    { field: "order_id", headerName: "Order Id", width: 180 },
    { field: "date", headerName: "Date", width: 180 },
  ];
 
  const rows = stockData.map((item, index) => ({
    id: item.id,
    serial_no: index + 1 + paginationModel.page * paginationModel.pageSize, // Adjust serial number based on page
    feed_name: item.Feed_name,
    unique_id: item.Unique_id,
    manufacture_name: item.Manufacture_name,
    manufacture_date: item.Manufacture_date,
    expiring_date: item.Expiring_date,
    stock_status: item.FarmerStock_status,
    feed_weight: item.Feed_weight,
    amount_paid: item.Amount_paid,
    order_id: item.Order_id,
    date: item.Date,
  }));

  return (
    <Box component={"div"} sx={{ width: "100%" }}>
      <Breadcrumbs>
        <Typography variant="body2">Home</Typography>
        <Typography variant="body2">Manage Stockin</Typography>
      </Breadcrumbs>

      <Box
        display="flex"
        alignItems="center"
        mt={2}
        p={3}
        onClick={handleAddNewBagClick}
        style={{ cursor: "pointer" }}
      >
        <AddIcon color="primary" />
        <Typography ml={1} color="primary">
          Add New bags
        </Typography>
      </Box>

      {showForm && (
        <Box display="flex" alignItems="center" gap={2} mb={3} ml={5}>
          <TextField
            label="Transaction Id"
            variant="outlined"
            size="small"
            style={{ width: "83.5%" }}
            value={transactionId} // Set the TextField value to the state
            onChange={(e) => setTransactionId(e.target.value)} // Update state on change
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      )}
      <Divider />

      <Grid container spacing={2} sx={{ marginTop: 5 }}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search by Unique ID, Manufacture Name, or Order ID"
              style={{ width: "83.5%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" style={{ color: "green" }}>
                    🏷️ 50 in Stocks
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowDropDown />}
              onClick={handleMenuClick}
            >
              Available Stocks
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {stockList.length > 0 ? (
                stockList.map((item, index) => (
                  <MenuItem key={index} onClick={handleMenuClose}>
                    {item.Manufacture_name} - {item.Unique_id} ({item.count} in
                    Stock)
                  </MenuItem>
                ))
              ) : (
                <MenuItem onClick={handleMenuClose}>
                  No stock available
                </MenuItem>
              )}
            </Menu>
          </Box>

          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight={false} // Set autoHeight to false so we can specify a fixed height
            rowHeight={75}
            paginationMode="server"
            pageSizeOptions={[20, 50, 100]}
            pagination
            rowCount={rows.length} // Total number of rows
            loading={loading} // You can replace this with a loading state if needed
            rowSelection={false}
            onPaginationModelChange={(pagedetails) => {
              setPaginationModel({
                page: pagedetails.page,
                pageSize: pagedetails.pageSize,
              });
            }}
            sx={{
              height: 500, // Set your fixed height here, for example 500px
              width: "100%",
            }}
            slots={{
              loadingOverlay: LinearProgress,
              toolbar: GridToolbar,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Farmer;
