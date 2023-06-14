// Publication.jsx
import React, { useState } from "react";
import PublicationCard from "../components/PublicationCard";
import { PUBLICATIONS_DATA } from "../data/data.js";

const Publication = () => {
  const [filterYear, setFilterYear] = useState("All");

  // Function to handle year filter change
  const handleYearChange = (e) => {
    setFilterYear(e.target.value);
  };

  // Filter publications based on selected year
  const filteredPublications = PUBLICATIONS_DATA.filter((pub) =>
    filterYear === "All" ? true : pub.year.toString() === filterYear
  );

  const yearToSelect = PUBLICATIONS_DATA.reduce((yeartoAdd, pub) => {
    const year = pub.year.toString();
    if (!yeartoAdd.includes(year)) {
      yeartoAdd.push(year);
    }
    return yeartoAdd;
  }, []);

  yearToSelect.sort((a, b) => b - a);

  // Group publications by year
  const publicationsByYear = filteredPublications.reduce((groups, pub) => {
    const year = pub.year.toString();
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(pub);
    return groups;
  }, {});

  return (
    <div className="container mx-auto p-4 bg-[#f5f5f5]">
      <div className="mb-4">
        <label htmlFor="year" className="mr-2">
          Filter by Year:
        </label>
        <select
          id="year"
          value={filterYear}
          onChange={handleYearChange}
          className="p-2 rounded-md border-gray-300"
        >
          <option value="All">All</option>
          {yearToSelect.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div>
        {Object.keys(publicationsByYear)
          .sort((a, b) => b - a)
          .map((year) => (
            <div key={year}>
              <h2 className="text-2xl font-bold mb-2 border-b-2 border-gray-200 pb-2">
                {year}
              </h2>
              {publicationsByYear[year].map((pub) => (
                <PublicationCard key={pub.id} publication={pub} />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Publication;
