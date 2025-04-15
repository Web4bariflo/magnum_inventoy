import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import {
  Layers as LayersIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";

const StatesCard = () => {
  const [dynamicData, setDynamicData] = useState([]);

  // Static data
  const staticData = [
    {
      title: "No. of bag In Stock",
      value: 50,
      change: "+20 Yesterday",
      color: "green",
      icon: <LayersIcon sx={{ color: "white" }} />,
    },
    {
      title: "Magnum Stock",
      value: 55,
      change: "+20 Yesterday",
      color: "green",
      icon: <TrendingUpIcon sx={{ color: "white" }} />,
    },
    {
      title: "Stock Exchange",
      value: 25,
      change: "+20 Yesterday",
      color: "green",
      icon: <LayersIcon sx={{ color: "white" }} />,
    },
    {
      title: "Profit",
      value: "60%",
      change: "-0.5 Yesterday",
      color: "red",
      icon: <LayersIcon sx={{ color: "white" }} />,
    },
  ];

  return (
    <Box>
      <Typography sx={{ fontWeight: "bold", fontSize: "18px", marginBottom: "5px" }} color="primary">
        Welcome to Dashboard.. !
      </Typography>
      <Grid container spacing={2} >
        {[...staticData, ...dynamicData].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: { xs: "column", md: "row" },
                padding: 1, // Reduced padding to make the card smaller
                borderRadius: 2,
                boxShadow: 2, // Reduced shadow for a more compact appearance
                position: "relative",
                height: "auto", // Allow card to shrink based on content size
              }}
            >
              {/* Left Side Blue Line */}
              <Box
                sx={{
                  position: "absolute",
                  left: 10, // Reduced space from the left to make the blue line more compact
                  top: 20, // Adjusted for a more compact appearance
                  bottom: 20, // Reduced height of the blue line
                  width: 4, // Thinner blue line
                  backgroundColor: "#2563EB",
                  borderRadius: 2,
                }}
              ></Box>

              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  paddingLeft: 2, // Reduced left padding
                  paddingRight: 2, // Reduced right padding
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="body2" // Reduced font size
                    ml={1}
                    sx={{
                      fontWeight: "normal", // Changed from 'open sans' to 'normal'
                      color: "#475569",
                      fontSize: "0.75rem", // Reduced font size
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      mt: 1, // Reduced margin-top
                    }}
                  >
                    <Typography variant="h5" mt={1} sx={{ fontWeight: "bold" }}>
                      {item.value}
                    </Typography>
                    <Typography sx={{ color: item.color, fontWeight: "bold" }}>
                      <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                        {item.change.split(" ")[0]}
                      </span>{" "}
                      {item.change.split(" ").slice(1).join(" ")}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    backgroundColor: "#0C5AEBD",
                    padding: 0.5,
                    borderRadius: 2,
                    position: "absolute",
                    top: 5,
                    right: 5,
                  }}
                >
                  {item.icon || (
                    <LayersIcon sx={{ color: "white", fontSize: "1rem" }} />
                  )}{" "}
                  {/* Smaller icon */}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatesCard;
