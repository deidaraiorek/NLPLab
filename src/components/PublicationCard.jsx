// ResearchCard.jsx
import React from "react";

const ResearchCard = ({ project }) => {
  return (
    <div className="flex flex-col md:flex-row items-center p-4 m-4 bg-white shadow-lg rounded-md">
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-2 text-blue-400">
          {project.title}
        </h2>
        <p className="mb-4">{project.description}</p>
      </div>
      <div className="w-full md:w-1/2 md:pl-4">
        <div className="w-full h-32 md:h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Publications section */}
      <div className="w-full mt-4">
        <h3 className="text-lg font-semibold mb-2">Publications:</h3>
        <ul>
          {project.papers.map((paper, index) => (
            <li key={index} className="mb-1">
              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-800"
              >
                {paper.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResearchCard;
