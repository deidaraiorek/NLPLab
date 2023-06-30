import React from "react";

const BlogCard = ({ title, imageSrc, pdfUrl }) => {
  const handleDownload = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className="blog-card">
      {imageSrc && <img src={imageSrc} alt={title} className="card-image" />}
      <h3 className="card-title">{title}</h3>
      <a href={pdfUrl} target="_blank">
        Download PDF
      </a>
    </div>
  );
};

export default BlogCard;
