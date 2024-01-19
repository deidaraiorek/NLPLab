import React, { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";

const PeopleCard = ({ member }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col items-center p-2 space-y-4 bg-white shadow-md rounded-lg ">
      <img
        src={member.photo}
        alt={member.name}
        className="object-cover w-48 h-48 rounded-full"
      />
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
       <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-75 flex justify-center items-center">
       {/* Modal Container */}
       <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full m-4">
     
         {/* Close Button at the top right corner of the modal */}
         <button
           className="absolute top-0 right-0 m-2" // Adjust margin as needed
           onClick={toggleModal}
         >
           <CloseIcon fontSize="large" />
         </button>
     
         {/* Modal Content */}
         <div className="flex flex-col sm:flex-row">
           {/* Image Container */}
           <div className="flex justify-center sm:justify-start p-4">
             <img 
               src={member.photo} 
               alt={member.name} 
               className="object-contain sm:max-w-sm sm:max-h-72" // Adjust sizes as needed
             />
           </div>
     
           {/* Text Content Container */}
           <div className="p-4">
             <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
             <p className="text-sm text-gray-700 overflow-y-auto">{member.info}</p>
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
