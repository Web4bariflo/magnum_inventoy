import React from "react";
import { Container, Typography } from "@mui/material";
import StatsCards from "./StatesCard";
import GraphsDashboard from "./GraphsDashboard";
import ManageDistributor from "./ManageDistributor";

const Dashboard = () => {
  return (
    <Container
      maxWidth="auto"
      className="mt-5"
    >
      <StatsCards />
      <GraphsDashboard/>
      <ManageDistributor />
    </Container>
  );
};

export default Dashboard;