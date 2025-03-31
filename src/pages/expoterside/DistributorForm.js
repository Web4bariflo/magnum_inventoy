import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  Typography,
  TextField,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import {
  Save,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ArrowDropDown,
  Edit,
  Delete,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import useApi from "../../hooks/APIHandler";
import { toast } from "react-toastify";
import { getUser } from "../../utils/Helper";
import { useNavigate } from "react-router-dom";
import React from "react";

const DistributorForm = () => {
  const { error, loading, callApi } = useApi();
  const methods = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const username = getUser().username;

      const requestData = {
        ...data,
        expoter_name: username,
      };
      const response = await callApi({
        url: `auth/adddistributor/`,
        method: "POST",
        body: requestData,
      });
      if (response && response.status === 201) {
        toast.success("Stock added successfully!");
        methods.reset();
        navigate("/stockin");
      } else {
        toast.error("Error adding stock");
      }
    } catch (error) {
      console.error("API error:", error);
      alert("Error: Something went wrong");
    }
  };

  return (
    <Box>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Typography variant="h6" mt={2}>
            New Distributor Registration
          </Typography>
          <Grid container spacing={2} mt={2} mb={2}>
            <Grid item xs={12} lg={4}>
              <TextField
                label="Distributor  Name"
                fullWidth
                {...methods.register("Distributor_name", {
                  required: "This field is required",
                })}
                error={methods.formState.errors.Distributor_name ? true : false}
                helperText={methods.formState.errors.Distributor_name?.message}
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
            <Grid item xs={12} lg={4}>
              <TextField
                label="Mobile_no"
                fullWidth
                type="Mobile_no"
                {...methods.register("Mobile_no", {
                  required: "This field is required",
                })}
                error={methods.formState.errors.Mobile_no ? true : false}
                helperText={methods.formState.errors.Mobile_no?.message}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                label="Password"
                fullWidth
                type="Password"
                {...methods.register("password", {
                  required: "This field is required",
                })}
                error={methods.formState.errors.email ? true : false}
                helperText={methods.formState.errors.email?.message}
              />
            </Grid>
            {/* Address */}
            <Grid item xs={12} lg={4}>
              <TextField
                label="Location"
                fullWidth
                multiline
                rows={1}
                {...methods.register("Location", {
                  required: "This field is required",
                })}
                error={methods.formState.errors.Location ? true : false}
                helperText={methods.formState.errors.Location?.message}
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
    </Box>
  );
};

const ManageDistributor = () => {
  const rowsPerPageOptions = [20, 50, 100];
  const { error, loading, callApi } = useApi();

  const [editData, setEditData] = useState(null);
  const [stockData, setStockData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStockData = async () => {
    try {
      const response = await callApi({ url: `auth/getdistributor/` });
      setStockData(response.data.results || response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  const handleSave = async () => {
    if (!editData || !editData.id) {
      console.error("Error: Distributor ID is missing.");
      return;
    }

    try {
    
      const response = await callApi({
        url: `auth/updatedistributor/`,
        method: "PUT",
        body: [editData],
      });

      if (response.status === 200) {
        console.log("Distributor updated successfully:", response.data);
        fetchStockData(); // Refresh data after update
      } else {
        console.error("Error updating distributor:", response.data);
      }
    } catch (error) {
      console.error("Error updating distributor:", error);
    } finally {
      setEditData(null); // Close modal after saving
    }
  };

  // Delete distributor
  const handleDelete = async (id) => {
    if (!id) {
      console.error("Error: Distributor ID is missing.");
      return;
    }

    try {
      const response = await callApi({
        url: `auth/deletedistributor/${id}/`,
        method: "DELETE",
      });
      
      if (response.status === 200 || response.status === 204) {
        console.log("Distributor deleted successfully.");
        fetchStockData(); // Refresh list after delete
      } else {
        console.error("Error deleting distributor:", response.data);
      }
    } catch (error) {
      console.error("Error deleting distributor:", error);
    }
  };

  const filteredData = stockData.filter((row) =>
    [
      String(row.expoter_name) || "",
      String(row.Distributor_name) || "",
      String(row.Mobile_no) || "",
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleEdit = (row) => {
    setEditData({
      id: row.id,
      Distributor_name: row.Distributor_name,
      Location: row.Location,
      Mobile_no: row.Mobile_no,
      Email: row.Email,
    });
  };

  useEffect(() => {
    if (editData) {
      console.log("Updated editData:", editData);
    }
  }, [editData]);

  // const modal
  const handleClose = () => {
    setEditData(null);
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleRows = filteredData.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <Box p={2} mx={10} mt={3}>
      <h2
        style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "20px" }}
      >
        Stock IN
      </h2>

      {/* Search and Filter Section */}
      <Box display="flex" alignItems="center" gap={0} mb={8}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by Unique ID, Manufacture Name, or Order ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "83.5%" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" style={{ color: "green" }}>
                🏷️ {stockData.length} Distributor
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          style={{ backgroundColor: "black", color: "white" }}
          startIcon={<ArrowDropDown />}
        >
          Advanced Search
        </Button>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ maxHeight: "300px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {[
                "SL.No",
                "Distributor Name",
                "Email",
                "Location",
                "Mobile No",
                "Exporter Name",
                "Actions",
              ].map((header, index) => (
                <TableCell
                  key={index}
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    backgroundColor: index % 2 === 0 ? "#42a5f5" : "#64b5f6",
                    color: "white",
                    border: "1px solid #ccc",
                    padding: "8px",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.length > 0 ? (
              visibleRows.map((row, index) => (
                <TableRow key={row.id || index}>
                  {[
                    index + 1,
                    row.Distributor_name,
                    row.Email,
                    row.Location,
                    row.Mobile_no,
                    row.expoter_name,
                  ].map((cell, i) => (
                    <TableCell
                      key={i}
                      align="center"
                      style={{ border: "1px solid #ccc" }}
                    >
                      {cell}
                    </TableCell>
                  ))}

                  {/* Edit & Delete Buttons */}

                  <TableCell
                    align="center"
                    style={{ border: "1px solid #ccc" }}
                  >
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(row)}
                      sx={{
                        backgroundColor: "#e0f7fa",
                        borderRadius: "8px",
                        padding: "8px",
                        "&:hover": {
                          backgroundColor: "#b2ebf2",
                        },
                      }}
                    >
                      <Edit />
                    </IconButton>

                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDelete(row.id)}
                      sx={{
                        backgroundColor: "#ffebee",
                        borderRadius: "8px",
                        padding: "8px",
                        marginLeft: "8px",
                        "&:hover": {
                          backgroundColor: "#ffcdd2",
                        },
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  style={{ color: "gray", border: "1px solid #ccc" }}
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={Boolean(editData)} onClose={handleClose}>
        <DialogTitle>Edit Distributor</DialogTitle>
        <DialogContent>
          <TextField
            label="Distributor Name"
            fullWidth
            margin="dense"
            value={editData?.Distributor_name || ""}
            onChange={(e) =>
              setEditData({ ...editData, Distributor_name: e.target.value })
            }
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={editData?.Email || ""}
            onChange={(e) =>
              setEditData({ ...editData, Email: e.target.value })
            }
          />
          <TextField
            label="Location"
            fullWidth
            margin="dense"
            value={editData?.Location || ""}
            onChange={(e) =>
              setEditData({ ...editData, Location: e.target.value })
            }
          />
          <TextField
            label="Mobile No"
            fullWidth
            margin="dense"
            value={editData?.Mobile_no || ""}
            onChange={(e) =>
              setEditData({ ...editData, Mobile_no: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Pagination Controls */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        mt={3}
        gap={3}
      >
        <Box>
          Rows Per Page:
          <Select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
            size="small"
            style={{ marginLeft: "10px" }}
          >
            {rowsPerPageOptions.map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box>
          {startIndex + 1}-{Math.min(endIndex, stockData.length)} of{""}
          {stockData.length}
        </Box>
        <IconButton onClick={prevPage} disabled={currentPage === 1}>
          <ChevronLeft />
        </IconButton>
        <IconButton onClick={nextPage} disabled={currentPage === totalPages}>
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
};

export { DistributorForm, ManageDistributor };

const DistributorRegistry = () => {
  const [selectedTab, setSelectedTab] = useState("form");

  return (
    <Box p={3}>
      <Box display="flex" justifyContent={"space-between"}>
        <Breadcrumbs>
          <Typography variant="body2">Home</Typography>
          <Typography variant="body2">distributors register</Typography>
        </Breadcrumbs>
      </Box>
      <Box display="flex" mb={3} borderBottom="1px solid #d9d9d9">
        <Link
          sx={{
            padding: "8px 16px",
            textDecoration: "none",
            fontWeight: "bold",
            color: selectedTab === "form" ? "blue" : "#777",
            borderBottom:
              selectedTab === "form"
                ? "1px solid blue"
                : "1px solid transparent",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              color: "blue",
              borderBottom: "1px solid blue",
            },
            cursor: "pointer",
          }}
          onClick={() => setSelectedTab("form")}
        >
          Add Distributor
        </Link>

        <Link
          sx={{
            padding: "8px 16px",
            textDecoration: "none",
            fontWeight: "bold",
            color: selectedTab === "table" ? "blue" : "#777",
            borderBottom:
              selectedTab === "table"
                ? "1px solid #333"
                : "1px solid transparent",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              color: "#111",
              borderBottom: "1px solid blue",
            },
            cursor: "pointer",
          }}
          onClick={() => setSelectedTab("table")}
        >
          Manage Distributor
        </Link>
      </Box>

      {selectedTab === "form" ? <DistributorForm /> : <ManageDistributor />}
    </Box>
  );
};

export default DistributorRegistry;
