import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";
import useApi from "../../hooks/APIHandler";

const StockIn = () => {
  const [columns, setColumns] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [stockList, setStockList] = useState([]);

  const [totalItems, setTotalItems] = useState(0);
  const [ordering, setOrdering] = useState([{ field: "id", sort: "desc" }]);
  const [stockData, setStockData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const navigate = useNavigate();
  const { callApi, loading, error } = useApi();

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // API call with pagination and search term
        const response = await callApi({
          url: `auth/stockinbags/`,
          method: "GET",
          params: {
            page: paginationModel.page + 1, // Adjust to 1-based page index for API
            search: searchTerm, // Add search term as query parameter
          },
        });

        console.log("Fetched Data:", response.data.results);
        setStockData(response.data.results || response.data); // Update stock data
        setTotalItems(response.data.count || 0); // Update the total items for pagination
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStockData();
  }, [paginationModel, searchTerm]); 

  useEffect(() => {
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
          return <div style={{ color: "green" }}>{params.value}</div>;
        },
      },
      { field: "feed_weight", headerName: "Feed Weight", width: 150 },
      { field: "amount_paid", headerName: "Amount Paid", width: 180 },
      { field: "order_id", headerName: "Transactoin Id", width: 180 },
      { field: "date", headerName: "Date", width: 180 },
    ];

    setColumns(columns);
  }, [stockData]);

  const handleSorting = (newModel) => {
    setOrdering(newModel);
  };

  const rows = stockData.map((item, index) => ({
    id: item.id,
    serial_no: index + 1 + paginationModel.page * paginationModel.pageSize, // Adjust serial number based on page
    feed_name: item.Feed_name,
    unique_id: item.Unique_id,
    manufacture_name: item.Manufacture_name,
    manufacture_date: item.Manufacture_date,
    expiring_date: item.Expiring_date,
    stock_status: item.Stock_status,
    feed_weight: item.Feed_weight,
    amount_paid: item.Amount_paid,
    order_id: item.Order_id,
    date: item.Date,
  }));

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);

    try {
      const response = await callApi({
        url: `auth/bagcount/`,
      });
      setStockList(response.data.results || response.data);
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setStockList([]);
    }
  };
  // Close dropdown
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box component={"div"} sx={{ width: "100%" }}>
      <Breadcrumbs>
        <Typography variant="body2" onClick={() => navigate("/")}>
          Home
        </Typography>
        <Typography
          variant="body2"
          onClick={() => navigate("/manage/purchaseorder")}
        >
          Manage stockin
        </Typography>
      </Breadcrumbs>
      <Grid container spacing={2} sx={{ marginTop: 5 }}>
        <Grid item xs={12}>
        <Typography variant="h5" mb={2}>STOCK IN</Typography>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search by Unique ID, Manufacture Name, or Order ID"
              value={searchTerm} // Bind the value of the TextField to searchTerm
              onChange={(e) => setSearchTerm(e.target.value)} // Update the searchTerm on change
              style={{ width: "83.5%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" style={{ color: "green" }}>
                    🏷️ {totalItems} in Stocks
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowDropDown />}
              onClick={handleClick}
            >
              Available Stocks
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {stockList.length > 0 ? (
                stockList.map((item, index) => (
                  <MenuItem key={index}>
                    {item.Manufacture_name} - {item.Unique_id} {item.count}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>No stock available</MenuItem>
              )}
            </Menu>
          </Box>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight={false} // Set autoHeight to false so we can specify a fixed height
            rowHeight={75}
            sortingOrder={["asc", "desc"]}
            sortModel={ordering}
            onSortModelChange={handleSorting}
            paginationMode="server"
            initialState={{
              ...rows.initialState,
              pagination: { paginationModel: paginationModel },
            }}
            pageSizeOptions={[20, 50, 100]}
            pagination
            rowCount={totalItems}
            loading={loading}
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

export default StockIn;
