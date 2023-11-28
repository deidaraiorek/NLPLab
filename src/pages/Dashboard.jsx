import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useRequests } from '../contexts/RequestContext';

const Dashboard = () => {
  const { requests, removeRequest } = useRequests();
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleCardClick = (request) => {
    console.log('Clicked on request:', request);
    setSelectedRequest(request);
  };

  const handleModalClose = () => {
    setSelectedRequest(null);
  };

  const handleApprove = async (event) => {
    event.stopPropagation();
    if (selectedRequest) {
      const { userEmail, link, id, userName } = selectedRequest;
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/contract/approve-contract`, { userEmail, projectName: link, id, userName });
        toast.success('Request approved successfully!');
        removeRequest(id);  //
        handleModalClose();
      } catch (error) {
        console.error('Error approving request:', error);
        toast.error('Error approving request.');
      }
    }
  };
  
  const handleDeny = async (event) => {
    event.stopPropagation();
    if (selectedRequest) {
      const { userEmail, id, userName } = selectedRequest;
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/contract/deny-contract`, { userEmail, id, userName });
        toast.success('Request denied successfully!');
        removeRequest(id);  
        handleModalClose();
      } catch (error) {
        console.error('Error denying request:', error);
        toast.error('Error denying request.');
      }
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
          {/* Remove parentheses from handleApprove. It should be passed as a reference, not invoked immediately. */}
          <button onClick={(event) => handleApprove(event)} className="bg-green-500 text-white py-2 px-4 rounded mx-2">Approve</button>
<button onClick={(event) => handleDeny(event)} className="bg-red-500 text-white py-2 px-4 rounded mx-2">Deny</button>
          <button onClick={handleModalClose} className="bg-gray-500 text-white py-2 px-4 rounded mx-2">Close</button>
        </div>
      </div>
    </div>
  )}
  
</div>
  );
};

export default Dashboard;
