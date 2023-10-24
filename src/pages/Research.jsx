import React, { useState } from "react";
import ResearchCard from "../components/ResearchCard";
import { PROJECTS_DATA } from "../data/data.js";
import SignatureModal from "../components/SignatureModal"; 

const Research = () => {
  const [filterProject, setFilterProject] = useState("All");
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const handleProjectChange = (e) => {
    setFilterProject(e.target.value);
  };

  const filteredProjects = PROJECTS_DATA.filter(project => filterProject === "All" ? true : project.title === filterProject);

  const handleOpenModal = (project) => {
    setCurrentProject(project);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg">
      <h1 className="text-center text-4xl text-blue-800 font-bold p-4 border-b-4">
        Research Projects
      </h1>

      <div className="my-4">
        <label htmlFor="projectFilter" className="mr-2">Filter by Project:</label>
        <select
          name="projectFilter"
          id="projectFilter"
          value={filterProject}
          onChange={handleProjectChange}
          className="p-2 rounded-md border-gray-300"
        >
          <option value="All">All</option>
          {PROJECTS_DATA.map((project, index) => (
            <option key={index} value={project.title}>{project.title}</option>
          ))}
        </select>
      </div>

      <div>
        {filteredProjects.map((project, index) => (
          <ResearchCard
            key={index}
            project={project}
            onOpenModal={handleOpenModal}
          />
        ))}
      </div>

      {isModalOpen && (
        <SignatureModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          research={currentProject}
        />
      )}
    </div>
  );
};

export default Research;
