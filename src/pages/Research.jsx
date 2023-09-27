import React, { useState } from "react";
import LabLsogo from "../assets/Mobility.png";
import ResearchCard from "../components/ResearchCard";
import SignatureModal from "../components/SignatureModal";
let researchData = [
  {
    title:
      "Leveraging Deep Active Learning to Identify Low-resource Mobility Functioning Information in Public Clinical Notes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: LabLsogo,
    link:'google.com'
  },
  {
    title: "test",
    description: "test",
    image: LabLsogo,
  },
];

const Research = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedResearch, setSelectedResearch] = useState(null);
  const openModal = (research) => {
    setSelectedResearch(research);
    setModalOpen(true);
  };

  return (
    <div className="container rounded-lg mx-auto p-4 bg-[#fff]">
      <h1 className="text-center text-4xl text-[#005a9b] font-bold p-4 ">
        Research
      </h1>
      {researchData.map((research, index) => (
        <ResearchCard
          key={index}
          research={research}
          index={index}
          openModal={() => openModal(research)}
        />
      ))}
      {isModalOpen && (
        <SignatureModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          research={selectedResearch}
          // ... any other props you may need
        />
      )}
    </div>
  );
};
export default Research;
