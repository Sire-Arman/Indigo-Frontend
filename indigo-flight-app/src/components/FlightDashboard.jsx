import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Typography, Tabs, Tab, Box 
} from '@material-ui/core';

function FlightDashboard() {
  const [flights, setFlights] = useState([]);
  const [tabValue, setTabValue] = useState(0);
    const API_URL = import.meta.env.VITE_API_URL;
    // console.log(API_URL);
  useEffect(() => {
    fetchFlights();
  }, [tabValue]);

  const fetchFlights = async () => {
    let url = '/flights';
    if(tabValue == 3) url = '/flights/on-time';
    if (tabValue === 1) url = '/flights/delayed';
    if (tabValue === 2) url = '/flights/cancelled';

    try {
      const response = await axios.get(`${API_URL}`+ url);
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
    <div>
      <Typography variant="h4" gutterBottom>
        Flight Dashboard
      </Typography>
      <Tabs key={tabValue} value={tabValue} onChange={handleTabChange}>
        <Tab label="All Flights" />
        <Tab label="Delayed Flights" />
        <Tab label="Cancelled Flights" />
        <Tab label="On Time" />
      </Tabs>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Flight Number</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Scheduled Departure</TableCell>
              <TableCell>Scheduled Arrival</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Gate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(flights).map((flight) => (
              <TableRow key={flight.id}>
                <TableCell>{flight.flightNumber}</TableCell>
                <TableCell>{flight.origin}</TableCell>
                <TableCell>{flight.destination}</TableCell>
                <TableCell>{new Date(flight.scheduledDeparture).toLocaleString()}</TableCell>
                <TableCell>{new Date(flight.scheduledArrival).toLocaleString()}</TableCell>
                <TableCell>{flight.status}</TableCell>
                <TableCell>{flight.gate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </>
  );
}

export default FlightDashboard;