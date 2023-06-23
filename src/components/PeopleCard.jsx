import React, { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
const PeopleCard = ({ member }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div key={member.id} className="p-4 rounded-md mb-2 border-b-2">
      <img
        src={member.photo}
        alt={member.name}
        className="h-80 w-64 rounded-md object-cover mx-auto mb-2"
      />
      <h4 className="text-lg font-semibold mb-1">{member.name}</h4>
      <p>{member.email}</p>
      <div className="inline-flex items-left justify-start">
        <button
          className="flex items-center text-base text-blue-500 hover:text-blue-700 border rounded-md bg-blue-200 p-4 my-2"
          onClick={openModal}
        >
          Learn More
          <InfoIcon fontSize="medium" className="ml-2" />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md max-w-[90%]  border-gray border-2">
            <div className="flex">
              <div className="w-1/2 border-r-2">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-96 h-96  rounded-md object-cover mx-auto"
                />
              </div>
              <div className="w-1/2 p-2 ">
                <div className="flex justify-end items-end mb-4 ">
                  <button
                    className="text-gray-500 hover:text-gray-700 border rounded-full"
                    onClick={closeModal}
                  >
                    <CloseIcon fontSize="large" />
                  </button>
                </div>
                <p className="text-start text-lg">{member.info}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeopleCard;
