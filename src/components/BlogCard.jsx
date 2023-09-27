import React from "react";

const BlogCard = ({ title, imageSrc, pdfUrl }) => {
  return (
    <div
      className={`cursor-pointer h-40 bg-cover bg-center ${
        imageSrc ? "bg-no-repeat" : "bg-gray-50"
      } flex items-center justify-center relative border-y border-gray-200`}
      style={imageSrc ? { backgroundImage: `url(${imageSrc})` } : {}}
      onClick={() => window.open(pdfUrl, "_blank")}
    >
      <div className="p-4 text-[#003366] text-lg absolute border border-gray-200 rounded-lg">
        {title && <h2 className="text-xl">{title}</h2>}
      </div>
    </div>
  );
};

export default BlogCard;
