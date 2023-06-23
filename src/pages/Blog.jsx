import React from "react";
import BlogCard from "../components/BlogCard";
import PDFFILE from "../assets/Using_AI_tools_experience.pdf";

const Blog = () => {
  const blogData = [
    {
      title: "Research Study 1",
      imageSrc: "path/to/image1.jpg",
      pdfUrl: PDFFILE,
    },
    {
      title: "Research Study 2",
      pdfUrl: "path/to/pdf2.pdf",
    },
    // Add more blog data objects here...
  ];

  return (
    <div>
      <h1>Lab Blog</h1>
      {blogData.map((blog) => (
        <BlogCard
          key={blog.title}
          title={blog.title}
          imageSrc={blog.imageSrc}
          pdfUrl={blog.pdfUrl}
        />
      ))}
    </div>
  );
};

export default Blog;
