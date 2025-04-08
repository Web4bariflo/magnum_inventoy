import React from "react";
import { Container, Typography } from "@mui/material";
import StatsCards from "./StatesCard";
import GraphsDashboard from "./GraphsDashboard";
import ManageDistributor from "./ManageDistributor";

const Dashboard = () => {
  return (
    <>
      <StatsCards />
      <GraphsDashboard />
      <ManageDistributor />
    </>
  );
};

export default Dashboard;
