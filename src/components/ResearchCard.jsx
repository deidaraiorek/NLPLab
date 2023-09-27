import React from "react";

const ResearchCard = ({ research, index, openModal }) => {
  const isEven = index % 2 === 0;
  return (
    <div
      className={`flex flex-wrap mb-4 ${
        isEven ? "flex-row-reverse" : ""
      } rounded-lg border-2 p-4 h-64`}
    >
      <div
        className={`flex items-center w-full md:w-1/2 px-4 ${
          isEven ? "md:pl-0" : "md:pr-0"
        }`}
      >
        <img
          className="w-full h-full object-contain rounded-lg"
          src={research.image}
          alt={research.title}
        />
      </div>
      <div className={`w-full md:w-1/2 px-4 ${isEven ? "md:pr-4" : "md:pl-4"}`}>
        <h2 className="text-xl font-bold mb-2">{research.title}</h2>
        <p className="text-base overflow-auto">{research.description}</p>
        <p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              openModal();
            }}
          >
            Link
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResearchCard;
