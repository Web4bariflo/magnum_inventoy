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
        name: username,
      };
      const response = await callApi({
        url: `auth/addstock/`,
        method: "POST",
        body: requestData,
      });
      if (response && response.status === 201) {
        toast.success("Stock added successfully!");
        methods.reset();
        navigate("/stockin");
      }  else {
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
        <Typography variant="h6" mt={2}>
          FeedManufacture Details
        </Typography>
        <Grid container spacing={2} mt={2} mb={2}>
          {/* Manufacture Name */}
          <Grid item xs={12} lg={4}>
            <TextField
              label="Manufacture Name"
              fullWidth
              {...methods.register("Manufacture_name", {
                required: "This field is required",
              })}
              error={methods.formState.errors.manufacture_name ? true : false}
              helperText={methods.formState.errors.manufacture_name?.message}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} lg={4}>
            <TextField
              label="Email"
              fullWidth
              type="email"
              {...methods.register("Email", {
                required: "This field is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "Invalid email format",
                },
              })}
              error={methods.formState.errors.email ? true : false}
              helperText={methods.formState.errors.email?.message}
            />
          </Grid>

          {/* Address */}
          <Grid item xs={12} lg={4}>
            <TextField
              label="Address"
              fullWidth
              multiline
              rows={1}
              {...methods.register("Address", {
                required: "This field is required",
              })}
              error={methods.formState.errors.address ? true : false}
              helperText={methods.formState.errors.address?.message}
            />
          </Grid>
        </Grid>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Typography variant="p">Bag Number</Typography>
        <Grid container spacing={2} mt={2} mb={2}>
          <Grid item xs={12} lg={6}>
            <TextField
              label="no of bags"
              fullWidth
              {...methods.register("bag_count", {
                required: "This field is required",
              })}
              error={methods.formState.errors.manufacture_name ? true : false}
              helperText={methods.formState.errors.manufacture_name?.message}
            />
          </Grid>
        </Grid>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h6">Bag Details</Typography>
        </Box>
        <Grid container spacing={2} mt={2} mb={2}>
          {/* Manufacturing Date */}
          <Grid item xs={12} lg={3}>
            <TextField
              label="Manufacturing Date"
              fullWidth
              type="date"
              {...methods.register("Manufacture_date", {
                required: "This field is required",
              })}
              error={methods.formState.errors.manufacturing_date ? true : false}
              helperText={methods.formState.errors.manufacturing_date?.message}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Expiry Date */}
          <Grid item xs={12} lg={3}>
            <TextField
              label="Expire Date"
              fullWidth
              type="date"
              {...methods.register("Expiring_date", {
                required: "This field is required",
              })}
              error={methods.formState.errors.expire_date ? true : false}
              helperText={methods.formState.errors.expire_date?.message}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} lg={3}>
            <TextField
              label="Feed Weight"
              fullWidth
              type="number"
              {...methods.register("Feed_weight", {
                required: "This field is required",
              })}
              error={methods.formState.errors.feed_weight ? true : false}
              helperText={methods.formState.errors.feed_weight?.message}
            />
          </Grid>

          {/* Payment Mode */}
          <Grid item xs={12} lg={3}>
            <Controller
              name="Payment_mode"
              control={methods.control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={methods.formState.errors.payment_mode ? true : false}
                >
                  <InputLabel>Payment Mode</InputLabel>
                  <Select {...field} label="Payment Mode" defaultValue="">
                    <MenuItem value="CASH">CASH</MenuItem>
                    <MenuItem value="CREDIT">CREDIT</MenuItem>
                    <MenuItem value="ONLINE">ONLINE</MenuItem>
                    <MenuItem value="CHEQUE">CHEQUE</MenuItem>
                  </Select>
                  <FormHelperText>
                    {methods.formState.errors.payment_mode?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={2} mb={2}>
          {/* Amount Paid */}
          <Grid item xs={12} lg={3}>
            <TextField
              label="Amount Paid"
              fullWidth
              type="number"
              {...methods.register("Amount_paid", {
                required: "This field is required",
              })}
              error={methods.formState.errors.amount_paid ? true : false}
              helperText={methods.formState.errors.amount_paid?.message}
            />
          </Grid>

          {/* Order Id */}
          <Grid item xs={12} lg={3}>
            <TextField
              label="Order Id"
              fullWidth
              {...methods.register("Order_id", {
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
              {...methods.register("Date", {
                required: "This field is required",
              })}
              error={methods.formState.errors.date_time ? true : false}
              helperText={methods.formState.errors.date_time?.message}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Feed Name */}
          <Grid item xs={12} lg={3}>
            <TextField
              label="Feed Name"
              fullWidth
              {...methods.register("Feed_name", {
                required: "This field is required",
              })}
              error={methods.formState.errors.feed_name ? true : false}
              helperText={methods.formState.errors.feed_name?.message}
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
  const [distributors, setDistributors] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const onSubmit = async (data) => {
    try {
      const username = getUser().username;

      const response = await callApi({
        url: `auth/stockout/`,
        method: "POST",
        body: data,
      });
      console.log(response);
      if (response && response.status === 201) {
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

  const fetchDistributors = async () => {
    try {
      const response = await callApi({
        url: `auth/getdistributor/`,
      });
      console.log("dist", response);
      if (response && response.status === 200) {
        setDistributors(response.data);
      } else {
        toast.error("Error fetching distributors");
      }
    } catch (error) {
      console.error("API error:", error);
      alert("Error: Something went wrong");
    }
  };

  useEffect(() => {
    fetchDistributors();
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
              label="Manufacture Name"
              fullWidth
              {...methods.register("Manufacture_name", {
                required: "This field is required",
              })}
              error={methods.formState.errors.Manufacture_name ? true : false}
              helperText={methods.formState.errors.Manufacture_name?.message}
              onClick={fetchManufacturers} // Fetch manufacturers when dropdown is clicked
            >
              {loading ? (
                <MenuItem disabled>
                  <CircularProgress size={20} />
                </MenuItem>
              ) : error ? (
                <MenuItem disabled>Error: {error}</MenuItem>
              ) : manufacturers.length > 0 ? (
                manufacturers.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item.Manufacture_name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ marginRight: "300px" }}>
                      {item.Manufacture_name}
                    </span>{" "}
                    {/* Add margin here */}
                    <span>{item.count} bags</span>
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No data available</MenuItem>
              )}
            </TextField>
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              select
              label="Distributor Name"
              fullWidth
              {...methods.register("Distributor_name", {
                required: "This field is required",
              })}
              error={methods.formState.errors.Distributor_name ? true : false}
              helperText={methods.formState.errors.Distributor_name?.message}
              onClick={fetchDistributors} // Fetch manufacturers when dropdown is clicked
            >
              {loading ? (
                <MenuItem disabled>
                  <CircularProgress size={20} />
                </MenuItem>
              ) : error ? (
                <MenuItem disabled>Error: {error}</MenuItem>
              ) : distributors.length > 0 ? (
                distributors.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item.Distributor_name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>{item.Distributor_name}</span>
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
              {...methods.register("num_bags", {
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
              {...methods.register("date", {
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
                <Box display="flex"
                justifyContent="space-between"
                  key={index}
                  sx={{
                    padding: 3,
                  }}
                >
                  <Box display="flex"  >
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
                    <Typography > +{data.bag_count}</Typography>
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
