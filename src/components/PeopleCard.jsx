import React, { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";

const PeopleCard = ({ member }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4 bg-white shadow-md rounded-lg">
      <img src={member.photo} alt={member.name} className="object-cover w-64 h-64 rounded-full" />
      <h4 className="text-lg font-semibold">{member.name}</h4>
      <p className="text-sm text-gray-500">{member.email}</p>
      <button
        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={toggleModal}
      >
        Learn More
        <InfoIcon className="ml-1" />
      </button>

      {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen px-4 pt-16 pb-4 bg-gray-900 bg-opacity-75">
    <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full overflow-hidden">
      {/* Close Button */}
      <button
        className="absolute top-0 right-0 m-4 focus:outline-none"
        onClick={toggleModal}
      >
        <CloseIcon fontSize="large" />
      </button>

      {/* Modal Body */}
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative pb-2/3 sm:pb-0 sm:w-1/2">
          <img 
            src={member.photo} 
            alt={member.name} 
            className="absolute h-full w-full object-cover sm:relative sm:h-96" 
          />
        </div>

        {/* Content */}
        <div className="p-4 sm:w-1/2 flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-700 overflow-y-auto max-h-72">{member.info}</p>
          </div>
          <p className="text-xs text-gray-500">{member.email}</p>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default PeopleCard;
