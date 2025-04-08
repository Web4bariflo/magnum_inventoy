import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import useApi from "../../hooks/APIHandler";
import { toast } from "react-toastify";
import { Edit, Delete, Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

// const apiUrl = import.meta.env.VITE_API_URL;

const ManageDistributor = () => {
  const { error, loading, callApi } = useApi();
  const [manufacturers, setManufacturers] = useState([]);
  const [distributors, setDistributors] = useState([]);

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


  const getdistributor = async () => {
    try {
      const response = await callApi({ url: `auth/getdistributor/` });
      setDistributors(response.data.results || response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchManufacturers();
    getdistributor();
  }, []);

  return (
    <Box
      mt={0}
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      gap={3}
    >
      <TableContainer
        component={Paper}
        elevation={3}
        flex={1}
        sx={{ width: { sx: "100%", md: "70%" } }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold"}}
            color= "primary"
          >
            Distributor List
          </Typography>
          <Button
            variant="contained"
            sx={{
              color: "white",
              borderRadius: "10px",
            }}
            startIcon={<Add />}
          >
            Add
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Sl. No",
                "Distributor Name",
                "Email",
                "Location",
                "Mobile No",
                "Exporter Name",
                "Actions",
              ].map((header, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{ fontWeight: "bold", marginBottom: "20px" }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {distributors.length > 0 ? (
              distributors.map((row, index) => (
                <TableRow key={row.id}>
                  {[
                    index + 1,
                    row.Distributor_name,
                    row.Email,
                    row.Location,
                    row.Mobile_no,
                    row.expoter_name,
                  ].map((cell, i) => (
                    <TableCell key={i} align="center">
                      {cell}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      size="small"
                      // onClick={() => handleEdit(row)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      // onClick={() => handleDelete(row.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Manufacture List Card */}
      <Card sx={{ flex: 1, p: 2, boxShadow: 2 }}>
        <CardContent>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold" }}
            color= "primary"
          >
            Manufacture List
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                {["Sl No.", "Name"].map((header, index) => (
                  <TableCell key={index} sx={{ fontWeight: "bold" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {manufacturers.map((value, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{value.Manufacture_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ManageDistributor;
