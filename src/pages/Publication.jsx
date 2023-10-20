// Research.jsx
import React, { useState } from "react";
import ProjectCard from "../components/ProjectCard"; // Make sure this component is adjusted to fit the new data structure
import { PROJECTS_DATA } from "../data/data.js"; // New data file

const Research = () => {
  const [filterProject, setFilterProject] = useState("All");

  // Function to handle project filter change
  const handleProjectChange = (e) => {
    setFilterProject(e.target.value);
  };

  // Filter projects based on selection
  const filteredProjects = PROJECTS_DATA.filter((project) =>
    filterProject === "All" ? true : project.title === filterProject
  );

  const projectOptions = PROJECTS_DATA.map((project) => project.title);

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg">
      <h1 className="text-center text-4xl text-blue-800 font-bold p-4 border-b-4">
        Research Projects
      </h1>

      <div className="my-4">
        <label htmlFor="project" className="mr-2">
          Filter by Project:
        </label>
        <select
          id="project"
          value={filterProject}
          onChange={handleProjectChange}
          className="p-2 rounded-md border-gray-300"
        >
          <option value="All">All</option>
          {projectOptions.map((title, index) => (
            <option key={index} value={title}>
              {title}
            </option>
          ))}
        </select>
      </div>

      <div>
        {filteredProjects.map((project, index) => (
          <ProjectCard key={index} project={project} /> // Make sure the ResearchCard component accommodates the new project structure, including images and papers.
        ))}
      </div>
    </div>
  );
};

export default Research;
