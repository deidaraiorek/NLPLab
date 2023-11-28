import React from "react";

const ResearchCard = ({ project, onOpenModal }) => {
  const renderDataSource = () => {
    if (project.data) {
      return (
        <button
          onClick={() => onOpenModal(project)}
          className="text-blue-400 hover:text-blue-800 focus:outline-none"
        >
          View Data Source
        </button>
      );
    } else {
      return <p>No public data source.</p>;
    }
  };

  return (
    <div className="flex flex-col p-4 m-4 bg-white shadow-lg rounded-md">
      <h2 className="text-xl font-semibold mb-2 text-blue-400">
        {project.title}
      </h2>

      <div className="flex flex-col md:flex-row items-center mb-4">
        <div className="w-full md:w-1/2">
          <p>{project.description}</p>
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
      </div>

      <div className="w-full">
        <h3 className="text-lg font-semibold mb-2">Publications:</h3>
        <ul className="list-disc list-inside">
          {project.papers.map((paper, index) => (
            <li key={index}>
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

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Data Source:</h3>
          {renderDataSource()}
        </div>
      </div>
    </div>
  );
};

export default ResearchCard;
