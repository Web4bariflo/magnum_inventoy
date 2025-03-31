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

const AddFarmer = () => {
  const { error, loading, callApi } = useApi();
  const methods = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const username = getUser().username;

      const requestData = {
        ...data,
        Distributor_name: username,
      };
      const response = await callApi({
        url: `auth/addfarmer/`,
        method: "POST",
        body: requestData,
      });
      if (response && response.status === 201) {
        toast.success("NewFarmer added successfully!");
        methods.reset();
        navigate("/stockin");
      } else {
        toast.error("Error adding Farmer");
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
                label="Farmer Name"
                fullWidth
                {...methods.register("Farmer_name", {
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

export default AddFarmer;
