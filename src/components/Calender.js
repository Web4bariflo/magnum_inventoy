import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { Button } from "@mui/material";
import { enUS } from "date-fns/locale"; // Import English locale (or use any other locale)
import "react-date-range/dist/styles.css"; // Import default styles
import "react-date-range/dist/theme/default.css"; // Import theme styles
import useApi from "../hooks/APIHandler";
import { getUser } from "../utils/Helper";

function CalendarComponent({ apiEndpoint, onResponse }) {
  const { error, loading, callApi } = useApi();
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(), // Default date range: today to today
    key: "selection",
  });

  // Handles selection of date range
  const handleDateRangeSelect = (ranges) => {
    setDateRange(ranges.selection);
    console.log("Date range selected: ", ranges.selection);
  };

  const handleClick = async () => {
    try {
      const username = getUser().username; // Get username from your utility

      // Prepare the request data for the API call
      const requestData = {
        start_date: formatDate(dateRange.startDate), // Format to YYYY-MM-DD
        end_date: formatDate(dateRange.endDate), // Format to YYYY-MM-DD
        user_name: username,
      };
      console.log(requestData);

      // Call the API with the provided endpoint
      const response = await callApi({
        url: apiEndpoint,  // Use the passed endpoint prop
        method: "POST", 
        body: requestData,
      
      });

      // Send the response back to the parent component
      onResponse(response);
      console.log("Transaction Data:", response);
    } catch (err) {
      console.error("Error fetching transaction data:", err);
    }
  };

  // Function to format the date properly to YYYY-MM-DD
  const formatDate = (date) => {
    // Get year, month, and day
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Add leading zero for single-digit months
    const day = ("0" + date.getDate()).slice(-2); // Add leading zero for single-digit days
    return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
  };

  return (
    <div>
      <div>
        <h3>Select a Date Range</h3>
        <DateRangePicker
          ranges={[dateRange]}
          onChange={handleDateRangeSelect}
          locale={enUS} // Set locale for localization
        />
        <Button onClick={handleClick} disabled={loading}>
          {loading ? "Loading..." : "Apply"}
        </Button>
      </div>

      {/* Display error message if there is an error */}
      {error && (
        <p style={{ color: "red" }}>
          {error.message ? error.message : "An unknown error occurred."}
        </p>
      )}
    </div>
  );
}

export default CalendarComponent;
