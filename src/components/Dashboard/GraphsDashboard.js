import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import {
  LineChart,
  Line,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  borderRadius: 12,
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  padding: 16,
});

const StyledButtonGroup = styled(ToggleButtonGroup)({
  backgroundColor: "#EFF6FF",
  borderRadius: 8,
  padding: 2,
  // "&:hover": {
  //   backgroundColor: "blue",
  //   color: "white",
  // },
});

// Dummy Data
const dataLine = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 40 },
  { name: "Mar", value: 35 },
  { name: "Apr", value: 60 },
  { name: "May", value: 45 },
  { name: "Jun", value: 50 },
  { name: "Jul", value: 55 },
  { name: "Aug", value: 50 },
  { name: "Sep", value: 45 },
  { name: "Oct", value: 40 },
  { name: "Nov", value: 35 },
  { name: "Dec", value: 25 },
];

const dataBar = [
  { name: "Sun", value: 70 },
  { name: "Mon", value: 50 },
  { name: "Tue", value: 65 },
  { name: "Wed", value: 45 },
  { name: "Thu", value: 55 },
  { name: "Fri", value: 30 },
  { name: "Sat", value: 20 },
];

const colors = ["#4479DC", "#D9D9D9"];

const GraphsDashboard = () => {
  return (
    <Box
      display="flex"
      gap={2}
      mt={2}
      mb={2}
      sx={{
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
      }}
    >
      {/* Total Cost Card */}
      <StyledCard
        sx={{
          width: { xs: "100%", md: 350 },
          height: 340,
          textAlign: "center",
          position: "relative",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold"}} color="primary">
          Total Cost
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
            position: "relative",
          }}
        >
          <svg width={180} height={180}>
            {/* Background Circle */}
            <circle
              cx={90}
              cy={90}
              r={75}
              stroke="#EFF6FF"
              strokeWidth={15}
              fill="none"
            />
            {/* Foreground Circle */}
            <circle
              cx={90}
              cy={90}
              r={75}
              stroke="#2563EB"
              strokeWidth={15}
              fill="none"
              strokeDasharray="200, 360"
              strokeLinecap="round"
            />
          </svg>
          {/* Inner White Circle */}
          <Box
            sx={{
              width: 110,
              height: 110,
              borderRadius: "50%",
              backgroundColor: "white",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              75%
            </Typography>
          </Box>
        </Box>
        {/* Legend */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 15, mt: 2 }}>
          <Box
            sx={{
              width: 14,
              height: 14,
              backgroundColor: "#2563EB",
              borderRadius: 1,
            }}
          />
          <Box
            sx={{
              width: 14,
              height: 14,
              backgroundColor: "#A5C9FF",
              borderRadius: 1,
            }}
          />
        </Box>
      </StyledCard>

      {/* Magnum Stock Graph */}
      <StyledCard
        sx={{ flex: 1, padding: 2, width: { xs: "100%", md: "auto" } }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            textAlign: { xs: "center", sm: "left" },
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              fontSize={16}
              sx={{ fontWeight: "bold"}}
              color="primary"
            >
              Magnum Stock
            </Typography>
            <Typography variant="body2" fontSize={12}>
              Feb 20, 2025 - Mar 20, 2026
            </Typography>
          </Box>
          <StyledButtonGroup size="small" exclusive>
            <ToggleButton value="month">Month</ToggleButton>
            <ToggleButton value="week">Week</ToggleButton>
            <ToggleButton value="day">Day</ToggleButton>
            <ToggleButton value="year">Year</ToggleButton>
          </StyledButtonGroup>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dataLine} margin={{ top: 20, right: 50, left: 0 }}>
              {/* Gradient definition */}
              <defs>
                <linearGradient
                  id="gradientColor"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              {/* The Area component that fills the background with a gradient */}
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2563EB"
                fill="url(#gradientColor)" // Apply the gradient as the fill
                fillOpacity={0.4} // Control the opacity of the fill
                strokeWidth={0} // Remove the stroke for the background area
              />

              {/* The Line component that sits on top of the Area */}
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563EB"
                strokeWidth={2}
                dot={{ r: 4, fill: "#4479DC" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </StyledCard>

      {/* Stock Exchange Graph */}
      <StyledCard
        sx={{ flex: 1, padding: 2, width: { xs: "100%", md: "auto" } }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            textAlign: { xs: "center", sm: "left" },
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              fontSize={16}
              sx={{ fontWeight: "bold"}}
              color="primary"
            >
              Stock Exchange
            </Typography>
            <Typography variant="body2" fontSize={11}>
              Feb 20, 2025 - Mar 20, 2026
            </Typography>
          </Box>
          <StyledButtonGroup size="small" exclusive>
            <ToggleButton value="month">Month</ToggleButton>
            <ToggleButton value="week">Week</ToggleButton>
            <ToggleButton value="day">Day</ToggleButton>
            <ToggleButton value="year">Year</ToggleButton>
          </StyledButtonGroup>
        </Box>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dataBar} margin={{ top: 10, right: 50, left: 0 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" barSize={30}>
              {dataBar.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 2]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </StyledCard>
    </Box>
  );
};

export default GraphsDashboard;
