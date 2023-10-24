import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a new context for requests
const RequestContext = createContext();

export const useRequests = () => {
  return useContext(RequestContext);
};

export const RequestsProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Load the requests from the server initially
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/contract/contract-requests`);
        setRequests(response.data.requests);
      } catch (error) {
        console.error('Error fetching contract requests:', error);
      }
    };

    fetchRequests();
  }, []);

  // Function to remove a request from the local state
  const removeRequest = (id) => {
    setRequests(requests => requests.filter(request => request.id !== id));
  };

  // Export the context's value
  const value = {
    requests,
    removeRequest,
  };

  return (
    <RequestContext.Provider value={value}>
      {children}
    </RequestContext.Provider>
  );
};
