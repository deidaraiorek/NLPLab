// PublicationCard.jsx
import React from "react";

const PublicationCard = ({ publication }) => {
  return (
    <div className="flex items-center p-4 m-4 bg-white shadow-lg rounded-md">
      <div className="w-1/4">
        <div className="w-full h-32 overflow-hidden">
          <img
            src={publication.image}
            alt={publication.title}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="w-3/4 pl-4">
        <a
          href={publication.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-l font-semibold mb-2 text-blue-400 hover:text-blue-800"
        >
          {publication.title}
        </a>
        <p className="mb-4 mt-4">{publication.authors}</p>
        <p className="mt-4 mb-4">{publication.description}</p>

        <div className="flex justify-between">
          <p>{publication.date}</p>
          <p>{publication.category}</p>
        </div>
      </div>
    </div>
  );
};

export default PublicationCard;
