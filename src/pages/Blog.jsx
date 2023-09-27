import React from "react";
import BlogCard from "../components/BlogCard";
import PDFFILE from "../assets/documents/Doc.pdf";
import { Document, Page } from "react-pdf";

const Blog = () => {
  const blogData = [
    {
      title: "Using AI tools to generate media asset for lab’s website",
      pdfUrl: "https://nlplab123456789.s3.amazonaws.com/Doc.pdf",
    },
    {
      title: "Research Study 2",
      pdfUrl: "path/to/pdf2.pdf",
    },
    // Add more blog data objects here...
  ];

  return (
    <div className="container rounded-lg mx-auto p-4 bg-[#fff]">
      <div>
        <h1 className=" text-center text-4xl  text-[#005a9b] font-bold p-4 border-b-4 ">
          Lab's articles
        </h1>
      </div>
      <div className="flex flex-col p-4 space-y-4">
        {blogData.map((blog) => (
          <BlogCard
            key={blog.title}
            title={blog.title}
            imageSrc={blog.imageSrc}
            pdfUrl={blog.pdfUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;
