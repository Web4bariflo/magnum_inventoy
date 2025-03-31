import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  Typography,
  TextField,
  Link,
  MenuItem,
  CircularProgress,
  Card,
  CardContent,
  FormControl,
  Select,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import {
  FormProvider,
  useForm,
  Controller as HookFormController,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { Save, CheckCircle } from "@mui/icons-material";
import { useEffect, useState } from "react";
import useApi from "../../hooks/APIHandler";
import { toast } from "react-toastify";
import { getUser } from "../../utils/Helper";
import { useNavigate } from "react-router-dom";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import React from "react";

const AddStock = () => {
  const { error, loading, callApi } = useApi();
  const methods = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const username = getUser().username;

      const requestData = {
        ...data,
        distributor_name: username,
      };
      console.log(requestData)
      const response = await callApi({
        url: `auth/diststockin/`,
        method: "POST",
        body: requestData,
      });
      console.log(response)
      if (response && response.status === 200) {
        toast.success("Stock added successfully!");
        methods.reset();
        // navigate("/stockin");
      } else {
        toast.error("Error adding stock");
      }
    } catch (error) {
      console.error("API error:", error);
      alert("Error: Something went wrong");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>

        <Grid  spacing={2} mt={2} mb={4}>
          {/* Order Id */}
          <Grid item xs={12} lg={3} mb={2}>
            <TextField
              label="Transaction Id"
              fullWidth
              {...methods.register("transaction_id", {
                required: "This field is required",
              })}
              error={methods.formState.errors.order_id ? true : false}
              helperText={methods.formState.errors.order_id?.message}
            />
          </Grid>

          {/* Date & Time */}
          <Grid item xs={12} lg={3}>
            <TextField
              label="Date & Time"
              fullWidth
              type="datetime-local"
              {...methods.register("datetime", {
                required: "This field is required",
              })}
              error={methods.formState.errors.date_time ? true : false}
              helperText={methods.formState.errors.date_time?.message}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ mt: 1, mb: 1 }} />

        <Box justifyContent={"space-between"} display={"flex"} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            startIcon={<Save />}
            color="primary"
            type="button"
            fullWidth
          >
            Save Draft
          </Button>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            type="submit"
            startIcon={<CheckCircle />}
            color="primary"
            fullWidth
          >
            Submit
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

const OutOfStock = () => {
  const { error, loading, callApi } = useApi();
  const methods = useForm();
  const [manufacturers, setManufacturers] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const onSubmit = async (data) => {
    try {
      const username = getUser().username;

      const requestData = {
        ...data,
        distributor_name: username,
      };

      const response = await callApi({
        url: `auth/diststockout/`,
        method: "POST",
        body: requestData,
      });
      console.log(response);
      if (response && response.status === 200) {
        toast.success("Stock out successfully!");
        navigate("/stockout");
      } else {
        toast.error("Error adding stock");
      }
    } catch (error) {
      console.error("API error:", error);
      alert("Error: Something went wrong");
    }
  };

  const fetchManufacturers = async () => {
    try {
      const response = await callApi({
        url: `auth/bagcount/`,
      });
      console.log("bags", response);
      if (response && response.status === 200) {
        setManufacturers(response.data);
      } else {
        toast.error("Error fetching manufacturers");
      }
    } catch (error) {
      console.error("API error:", error);
      alert("Error: Something went wrong");
    }
  };

  useEffect(() => {
    fetchManufacturers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const response = await callApi({
        url: `auth/getfarmer/`,
      });
      console.log("dist", response);
      if (response && response.status === 200) {
        setFarmers(response.data);
      } else {
        toast.error("Error fetching distributors");
      }
    } catch (error) {
      console.error("API error:", error);
      alert("Error: Something went wrong");
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Typography variant="h6" mt={2}>
          Feed Manufacture Details
        </Typography>
        <Grid container spacing={2} mt={2} mb={2}>
          {/* Manufacture Name */}

          <Grid item xs={12} lg={6}>
            <TextField
              select
              label="Farmer Name"
              fullWidth
              {...methods.register("farmer_name", {
                required: "This field is required",
              })}
              error={methods.formState.errors.farmer_name ? true : false}
              helperText={methods.formState.errors.farmer_name?.message}
              onClick={fetchFarmers} // Fetch manufacturers when dropdown is clicked
            >
              {loading ? (
                <MenuItem disabled>
                  <CircularProgress size={20} />
                </MenuItem>
              ) : error ? (
                <MenuItem disabled>Error: {error}</MenuItem>
              ) : farmers.length > 0 ? (
                farmers.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item.Farmer_name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>{item.Farmer_name}</span>
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No data available</MenuItem>
              )}
            </TextField>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={2} mb={2}>
          <Grid item xs={12} lg={6}>
            <TextField
              label="No of Bags"
              fullWidth
              {...methods.register("number_of_bags", {
                required: "This field is required",
              })}
              error={methods.formState.errors.Bagnumber_start ? true : false}
              helperText={methods.formState.errors.Bagnumber_start?.message}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              label="Date & Time"
              fullWidth
              type="datetime-local"
              {...methods.register("stockout_date", {
                required: "This field is required",
              })}
              error={methods.formState.errors.Date ? true : false}
              helperText={methods.formState.errors.Date?.message}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ mt: 1, mb: 1 }} />

        <Box justifyContent={"space-between"} display={"flex"} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            startIcon={<Save />}
            color="primary"
            type="button"
            fullWidth
          >
            Save Draft
          </Button>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            type="submit"
            startIcon={<CheckCircle />}
            color="primary"
            fullWidth
          >
            Submit
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

export { AddStock, OutOfStock };

const StockManager = () => {
  const [selectedTab, setSelectedTab] = useState("instock");
  const navigate = useNavigate();
  const { error, loading, callApi } = useApi();
  const [status, setStatus] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await callApi({
          url: `auth/recentbag/`,
        });
        console.log(response);
        setStatus(response.data);
        setData(response.data.recent_transactions);
      } catch (err) {
        console.log(error);
        // setError("Failed to fetch transactions");
      }
    };

    fetchTransactions();
  }, []);

  return (
    <Box>
      <Box display="flex" justifyContent={"space-between"}>
        <Breadcrumbs>
          <Typography variant="body2" onClick={() => navigate("/")}>
            Home
          </Typography>
          <Typography variant="body2">Add Stock</Typography>
        </Breadcrumbs>
      </Box>
      <Box display="flex" height="100vh">
        {/* Form Section */}
        <Box flex={3} padding={3} overflow="auto">
          <Box display="flex" mb={3} borderBottom="1px solid #d9d9d9">
            <Link
              sx={{
                padding: "8px 16px",
                textDecoration: "none",
                fontWeight: "bold",
                color: selectedTab === "instock" ? "blue" : "#777",
                borderBottom:
                  selectedTab === "instock"
                    ? "1px solid blue"
                    : "1px solid transparent",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  color: "blue",
                  borderBottom: "1px solid blue",
                },
                cursor: "pointer",
              }}
              onClick={() => setSelectedTab("instock")}
            >
              Add Stock
            </Link>

            <Link
              sx={{
                padding: "8px 16px",
                textDecoration: "none",
                fontWeight: "bold",
                color: selectedTab === "outofstock" ? "blue" : "#777",
                borderBottom:
                  selectedTab === "outofstock"
                    ? "1px solid #333"
                    : "1px solid transparent",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  color: "#111",
                  borderBottom: "1px solid blue",
                },
                cursor: "pointer",
              }}
              onClick={() => setSelectedTab("outofstock")}
            >
              Sell Stock
            </Link>
          </Box>
          {selectedTab === "instock" ? <AddStock /> : <OutOfStock />}
        </Box>

        {/* Sidebar Section */}
        <Box
          flex={1}
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
          style={{ display: window.innerWidth <= 600 ? "none" : "flex" }}
        >
          <Card sx={{ flexGrow: 1, margin: 2 }}>
            <CardContent>
              <Typography variant="h6" align="center">
                Current Status
              </Typography>
              <Typography variant="h4" align="center" mt={2}>
                {status.total_stockin_count}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => navigate("/transaction")}
              >
                View Details
              </Button>
              <Divider sx={{ my: 2 }} />
              {data.map((data, index) => (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  key={index}
                  sx={{
                    padding: 3,
                  }}
                >
                  <Box display="flex">
                    {data.Stock_status === "STOCKIN" ? (
                      <ArrowDownwardIcon
                        color="success"
                        style={{ fontSize: 40 }}
                      />
                    ) : (
                      <ArrowUpwardIcon color="error" style={{ fontSize: 40 }} />
                    )}
                    <Box ml={1} gap={6}>
                      <Typography variant="h6">{data.Stock_status}</Typography>
                      <Typography fontSize={12}>
                        {new Date(data.date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                      </Typography>
                      <Typography variant="h7">
                        {data.distributor_name}
                        {data.manufacturer_name}
                      </Typography>
                    </Box>
                  </Box>
                  {data.Stock_status === "STOCKIN" ? (
                    <Typography> +{data.bag_count}</Typography>
                  ) : (
                    <Typography> -{data.bag_count}</Typography>
                  )}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default StockManager;
