import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Breadcrumbs,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import useApi from "../../hooks/APIHandler";
import { DataGrid } from "@mui/x-data-grid";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import Calender from "../../components/Calender";

const StockTransaction = () => {
  const [status, setStatus] = useState([]);
  const [selectedstatus, setSelectedstatus] = useState("");
  const [selected, setSelected] = useState(null); // Store the selected status
  const [open, setOpen] = useState(false);

  const { error, loading, callApi } = useApi();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await callApi({
          url: `auth/transactionsummary/`,
        });
        console.log(response.data);
        setStatus(response.data);
      } catch (err) {
        console.log(error);
        // setError("Failed to fetch transactions");
      }
    };

    fetchTransactions();
  }, []);
  const handleToggle = () => {
    setOpen(!open); // Toggle the 'open' state
  };

  const handleApiResponse = (data) => {
    console.log("Received response from CalendarComponent:", data);
    setStatus(data.data);
  };

  const stockOutColumns = [
    { field: "serial_no", headerName: "serial_no", width: 100 },
    { field: "Order_id", headerName: "Order_id", width: 150 },
    { field: "Manufacture_name", headerName: "Manufacture_name", width: 200 },
    { field: "Email", headerName: "Email", width: 200 },
    { field: "Address", headerName: "Address", width: 150 },
    { field: "Manufacture_date", headerName: "Manufacture_date", width: 150 },
    { field: "distributor_name", headerName: "Distributor Name", width: 200 },
    { field: "Feed_name", headerName: "Feed_name", width: 150 },
    { field: "Feed_weight", headerName: "Feed_weight", width: 150 },
    { field: "Expiring_date", headerName: "Expiring_date", width: 150 },
    { field: "Unique_id", headerName: "Unique_id", width: 150 },
    { field: "Amount_paid", headerName: "Amount_paid", width: 150 },
    { field: "Payment_mode", headerName: "Payment_mode", width: 150 },
  ];

  const stockInColumns = [
    { field: "serial_no", headerName: "serial_no", width: 100 },
    { field: "Order_id", headerName: "Order_id", width: 150 },
    { field: "Manufacture_name", headerName: "Manufacture_name", width: 200 },
    { field: "Email", headerName: "Email", width: 200 },
    { field: "Address", headerName: "Address", width: 150 },
    { field: "Manufacture_date", headerName: "Manufacture_date", width: 150 },
    { field: "Feed_name", headerName: "Feed_name", width: 150 },
    { field: "Feed_weight", headerName: "Feed_weight", width: 150 },
    { field: "Expiring_date", headerName: "Expiring_date", width: 150 },
    { field: "Unique_id", headerName: "Unique_id", width: 150 },
    { field: "Amount_paid", headerName: "Amount_paid", width: 150 },
    { field: "Payment_mode", headerName: "Payment_mode", width: 150 },
  ];

  // Map bags to rows for DataGrid
  const rows = selectedstatus
    ? selectedstatus.bags.map((bag, index) => ({
        id: bag.id,
        serial_no: index + 1,
        Manufacture_name: bag.Manufacture_name,
        Address: bag.Address,
        Email: bag.Email,
        Order_id: bag.Order_id,
        Unique_id: bag.Unique_id,
        Feed_name: bag.Feed_name,
        Feed_weight: bag.Feed_weight,
        Expiring_date: bag.Expiring_date,
        Amount_paid: bag.Amount_paid,
        Payment_mode: bag.Payment_mode,
        Manufacture_date: bag.Manufacture_date,
        distributor_name: bag.distributor_name, // Add the distributor_name to the row
        Stock_In_Time:
          selectedstatus.Stock_status === "STOCKIN"
            ? new Date(selectedstatus.created_at).toLocaleString("en-IN", {
                hour12: true,
              })
            : null, // Add stock in time if it's STOCKIN
      }))
    : [];

  return (
    <Box>
      <Breadcrumbs>
        <Typography variant="body2">Home</Typography>
        <Typography variant="body2">Stock Transaction</Typography>
      </Breadcrumbs>

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={2}
        minHeight="100vh"
      >
        <Box width={{ xs: "100%", md: "30%" }} height="100px" p={2}>
          <Box display="flex" alignItems="center">
            <Button
              variant="contained"
              startIcon={<CalendarMonthIcon />}
              sx={{ marginBottom: 2 }}
              onClick={handleToggle}
            >
              Date Range
            </Button>
            <RotateRightIcon
              sx={{ ml: 2, mb: 2, fontSize: 35 }}
              color="primary"
              onClick={() => window.location.reload()}
            />
          </Box>

          <Dialog
            open={open}
            onClose={handleToggle} // This will close the dialog when clicking outside
          >
            <DialogContent>
              <Calender
                apiEndpoint="auth/transbydate_dist/"
                onResponse={handleApiResponse}
              />
            </DialogContent>
          </Dialog>
          <Box
            sx={{
              height: "80vh",
              overflowY: "auto",
            }}
          >
            {Array.isArray(status) && status.length === 0 ? (
              <Typography variant="body1" color="textSecondary">
                No transactions available.
              </Typography>
            ) : (
              Array.isArray(status) &&
              status.map((status, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    cursor: "pointer",
                    borderBottom: "1px solid #ddd",
                    padding: 2,
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.15)",
                      borderBottom: "1px solid #ccc",
                    },
                  }}
                  onClick={() => setSelectedstatus(status)}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-around"
                  >
                    <Box display="flex" alignItems="center">
                      {status.Stock_status === "STOCKIN" ? (
                        <ArrowDownwardIcon
                          color="success"
                          style={{ fontSize: 30 }}
                        />
                      ) : (
                        <ArrowUpwardIcon
                          color="error"
                          style={{ fontSize: 30 }}
                        />
                      )}
                      <Typography variant="h6" ml={1}>
                        {status.Stock_status}
                      </Typography>
                    </Box>

                    {/* Date on the right side */}
                    <Typography variant="body2" color="textSecondary">
                      {new Date(status.date_time).toLocaleString("en-IN", {
                        hour12: true,
                      })}
                    </Typography>
                  </Box>
                  <Typography variant="body1" marginLeft={5}>
                    {status.total_bags} bags
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        </Box>

        {/* Divider between the two boxes */}
        <Divider orientation="vertical" flexItem />

        {/* Details Section */}
        {selectedstatus ? (
          <Box width={{ xs: "100%", md: "70%" }}>
            <Typography variant="h5" fontWeight="bold">
              {selectedstatus.Stock_status}
            </Typography>
            <Typography variant="body2" color="textSecondary" my={3}>
              {new Date(selectedstatus.date_time).toLocaleString("en-IN", {
                hour12: true,
              })}
            </Typography>
            <Divider />

            <Box display="flex" mt={2} justifyContent="space-between">
              <Typography variant="body2" fontWeight="bold">
                Bag Range
                <Typography variant="body2" p={2} fontWeight="normal">
                  Start:{" "}
                  <Typography
                    variant="body2"
                    color="primary"
                    component="span"
                    px={2}
                  >
                    {selectedstatus.bags[0].id}{" "}
                  </Typography>
                  | End:{" "}
                  <Typography
                    variant="body2"
                    color="primary"
                    component="span"
                    px={2}
                  >
                   {selectedstatus.bags[selectedstatus.bags.length - 1].id}
                  </Typography>
                </Typography>
              </Typography>

              {/* diatributor and manufacture name */}
              {selectedstatus.Stock_status === "STOCKIN" ? (
                <Typography variant="body2" mt={1} fontWeight="bold">
                  Exporter Name
                  <Typography p={2} fontWeight="normal">
                    {selectedstatus.Manufacture_name}
                  </Typography>
                </Typography>
              ) : (
                <Typography variant="body2" mt={1} fontWeight="bold">
                  Farmer Name
                  <Typography p={2} fontWeight="normal">
                    {selectedstatus.Distributor_name}
                  </Typography>
                </Typography>
              )}

              <Typography variant="body2" mt={1} fontWeight="bold">
                Balance
                <Typography p={2} fontWeight="normal">
                  {selectedstatus.bags[0].Amount_paid}
                </Typography>
              </Typography>
            </Box>

            <Typography
              variant="h5"
              color="primary"
              sx={{ cursor: "pointer" }}
              mb={3}
            >
              {selectedstatus.num_bags} Bags
            </Typography>
            <DataGrid
              rows={rows}
              columns={
                selectedstatus.Stock_status === "STOCKOUT"
                  ? stockOutColumns
                  : stockInColumns
              }
              pageSize={5}
              autoHeight={false}
              sx={{
                height: 500, // Set height for the grid
                boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.1)", // Apply shadow to the top
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#cbb8ff  !important",
                  color: "black", // Set the text color for the header
                  fontSize: "16px", // Set the font size for the header text
                  fontWeight: "bold", // Optionally, make the header text bold
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontSize: "17px", // Adjust font size specifically for the column header text
                },
              }}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default StockTransaction;
