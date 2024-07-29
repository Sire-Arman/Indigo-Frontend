import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FlightStatus = () => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            const response = await axios.get('/api/flights');
            setFlights(response.data);
        };

        fetchFlights();
    }, []);

    return (
        <div>
            <h2>Flight Status</h2>
            <ul>
                {flights.map(flight => (
                    <li key={flight.id}>
                        {flight.flightNumber} - {flight.status} - {flight.gate} - {flight.departureTime}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FlightStatus;