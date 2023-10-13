import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    // Fetch contract requests from your backend
    console.log(process.env.REACT_APP_API_URL)
    axios.get(`${process.env.REACT_APP_API_URL}/contract/contract-requests`)
      .then((response) => {
        setRequests(response.data.requests);
      })
      .catch((error) => {
        console.error('Error fetching contract requests:', error);
      });
  }, []);

  const handleCardClick = (request) => {
    setSelectedRequest(request);
  };

  const handleModalClose = () => {
    setSelectedRequest(null);
  };

  const handleApprove = () => {
    if (selectedRequest) {
      // Send an API request to approve the selected request
      const { userEmail, link } = selectedRequest;
      axios.post(`${process.env.REACT_APP_API_URL}/contract/approve-contract`, { userEmail, link })
        .then((response) => {
          // Handle success (e.g., update UI)
          console.log('Request approved:', response.data);
        })
        .catch((error) => {
          // Handle error
          console.error('Error approving request:', error);
        });
    }
  };
  
  const handleDeny = () => {
    if (selectedRequest) {
      // Send an API request to deny the selected request
      const { userEmail } = selectedRequest;
      axios.post(`${process.env.REACT_APP_API_URL}/contract/deny-contract`, { userEmail })
        .then((response) => {
          // Handle success (e.g., update UI)
          console.log('Request denied:', response.data);
        })
        .catch((error) => {
          // Handle error
          console.error('Error denying request:', error);
        });
    }
  };
  
  return (
    <div className="container mx-auto p-4 bg-white">
      <h1 className="text-4xl text-[#005a9b] font-bold py-4 border-b-4 text-center">Contract Requests Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-white border rounded-md shadow-md hover:shadow-lg cursor-pointer transition duration-300"
            onClick={() => handleCardClick(request)}
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold">{request.title}</h2>
              <p className="text-gray-600"><strong>Name:</strong> {request.userName}</p>
              <p className="text-gray-600"><strong>Email:</strong> {request.userEmail}</p>
            </div>
          </div>
        ))}
      </div>
  
      {selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mt-4 mb-4">Request Details</h2>
           
            <div className="mb-4">
              <strong>Contract File:</strong>
              <iframe
                src={selectedRequest.fileUrl}
                title="Contract File"
                width="100%"
                height="500px"
              ></iframe>
            </div>
            <div className="flex justify-end"> {/* Place buttons to the right */}
              <button onClick={handleApprove()} className="bg-green-500 text-white py-2 px-4 rounded mx-2">Approve</button>
              <button onClick={handleDeny} className="bg-red-500 text-white py-2 px-4 rounded mx-2">Deny</button>
              <button onClick={handleModalClose} className="bg-gray-500 text-white py-2 px-4 rounded mx-2">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
