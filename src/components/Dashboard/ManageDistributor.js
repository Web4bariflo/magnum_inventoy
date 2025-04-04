import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
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

  return (
    <Box
      p={2}
      // mx={2}
      mt={0}
      px={{ xs: 0, md: 7 }}
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      gap={3}
    >
      {/* Distributor List Table */}
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
            sx={{ fontWeight: "bold", color: "#2563EB" }}
          >
            Distributor List
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2563EB",
              color: "white",
              borderRadius: "10px",
            }}
            startIcon={<Add />}
          >
            Add
          </Button>
        </Box>
     
      </TableContainer>

      {/* Manufacture List Card */}
      <Card sx={{ flex: 1, p: 2, boxShadow: 2 }}>
        <CardContent>
          <Typography
            variant="subtitle1"
            sx={{ color: "#2563EB", fontWeight: "bold" }}
          >
            Manufacture List
          </Typography>
     
        </CardContent>
      </Card>

 
    </Box>
  );
};

export default ManageDistributor;
