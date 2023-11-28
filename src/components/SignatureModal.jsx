import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const SignatureModal = ({ isOpen, onClose, research }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('Choose File');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const truncatedTitle =
    research?.title.length > 50
      ? research?.title.substring(0, 47) + '...'
      : research?.title;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please upload a signed agreement before submitting.');
      return;
    }
    if (!userName || !userEmail) {
      toast.error('Please provide your name and email.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userName', userName);
    formData.append('userEmail', userEmail);
    formData.append('research', research.title);
    formData.append('researchLink', research.data);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/contract/upload-signed-agreement`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      toast.success('File uploaded successfully!');
      console.log('File upload response:', response.data);
      onClose();
    } catch (error) {
      toast.error('File upload failed.');
      console.error('File upload failed:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-lg text-left md:w-1/2">
        <h2 className="text-xl font-bold truncate">{truncatedTitle}</h2>

        <div className="mt-4">
          <p>To download our annotated Mobility NER dataset, kindly follow these steps:</p>
          <ul className="list-disc list-inside">
            <li>Create an account on the DBMI Data Portal.</li>
            <li>Request access to the n2c2 dataset.</li>
            <li>Once access is granted, submit a copy of the confirmation email (PDF Format).</li>
            <li>Upon confirming your access, we will provide the dataset.</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2 rounded border"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Your Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full p-2 rounded border"
            />
          </div>

          <div className="flex justify-center">
            <label className="bg-gray-300 text-black py-2 px-4 rounded cursor-pointer mr-2">
              {fileName}
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded mr-2"
            >
              Submit
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignatureModal;
