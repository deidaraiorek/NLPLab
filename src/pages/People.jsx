// People.jsx
import React from "react";
import ThanhThieuImage from "../assets/images/ThanhThieu.jpg";
import PeopleCard from "../components/PeopleCard";
import ThanhDuongImage from "../assets/images/ThanhDuong.jpg";
import TuanDungImage from "../assets/images/TuanDung.jpg";
import LongHungImage from "../assets/images/LongHung.jpg";
import DangPhamImage from "../assets/images/DangPham.jpg";

const People = () => {
  const fakeLabMembers = [
    {
      id: 1,
      name: "Thanh Thieu",
      email: "thanh.thieu@moffitt.org",
      photo: ThanhThieuImage,
      type: "Principal",
      info: "Dr. Thieu received his Ph.D. in Computer Science from the University of Missouri-Columbia. Prior to Moffitt, he was an Assistant Professor in Computer Science Department at the Oklahoma State University, and further was a postdoc at the U.S. National Institutes of Health. He has been pursuing research in natural language processing, machine learning, and artificial intelligence with application in healthcare and education. Dr. Thieu has taught and mentored students and juniors at University of Missouri, NIH Clinical Center, ACT Inc., Oklahoma State University, and Moffitt Cancer Center. Having worked in academia, government, and industry, Dr. Thieu has developed capability to mentor and collaborate across educational backgrounds, ethnicities, genders, and origins.",
    },

    {
      id: 3,
      name: "Thanh Duong",
      email: "thanh.duong@moffitt.org ",
      photo: ThanhDuongImage,
      type: "PhD Student",
      info: "Thanh is a Ph.D. student in Computer Science at Oklahoma State University and will transfer to the University of South Florida under advisor of Dr. Licato and Dr. Thieu. His research focuses on NLP algorithm, lexical complexity, and language generation. He is interested in applying NLP algorithm to process free text clinical notes in electronic health records and free text scientific reports in medical literature. Thanh aims to develop a data augmentation generation method for expanding dataset size of clinical notes that improve training process of language model.",
    },
    {
      id: 4,
      name: "Tuan Dung",
      role: "PhD Student",
      email: "TuanDung.Le@moffitt.org",
      photo: TuanDungImage,
      type: "PhD Student",
      info: "Tuan Dung is a PhD student in Computer Science at the University of South Florida. He received his master’s degree in Information Systems from the Hanoi University of Science and Technology in Vietnam and worked as AI engineer at FPT.AI for 2 years. Before joining Moffitt Cancer Center as research trainee, he worked under supervision of Dr. Thieu for a year. He has built a host-pathogen interactions database from scientific literature to help the biomedical research community in the field of infectious diseases. He also developed a Natural Language Processing system that can effectively extract patient’s history information from clinical unstructured text to benefit the medical billing process.",
    },
    {
      id: 5,
      name: "Hung Tran",
      role: "Undergraduate Student",
      email: "hung.tran@moffitt.org",
      photo: LongHungImage,
      type: "Undergraduate Student",
      info: "Hung is currently an undergraduate student at the University of South Florida and is working at Moffitt as a research trainee under the supervision of Dr. Thieu. Hung has started learning and working in the field of Machine Learning and Deep Learning, specifically Natural Language Processing, since high school. Being the youngest member in the team, Hung continues to gain experience and expand his knowledge in Natural Language Processing under the supervision of Dr. Thieu. He is committed to making an impact in the Natural Language Processing and is eager to contribute to the development of cutting-edge AI technologies.",
    },
    {
      id: 6,
      name: "Dang Pham",
      role: "Undergraduate Student",
      email: "danghuupham@usf.edu",
      photo: DangPhamImage,
      type: "Undergraduate Student",
      info: "Dang Pham is currently a sophomore pursuing a Computer Science major at University of South Florida. Alongside his studies, Dang actively contributes to his lab's research as a web developer. He takes charge of creating and maintaining the lab's website, integrating various AI applications and transforming lab findings into user-friendly websites. Dang leverages his expertise in managing lab services through AWS (Amazon Web Services), ensuring efficient operations. Despite his relatively young position within the lab, Dang continues to expand his knowledge in cutting-edge AI technologies and is dedicated to making a significant impact in the field. His enthusiasm drives him to contribute to the development of advanced AI applications and push the boundaries of innovation.",
    },
  ];

  const positionOrder = ["Principal", "PhD Student", "Undergraduate Student"];

  return (
    <div className="container rounded-lg mx-auto p-4 bg-[#fff]">
      <div>
        <h1 className=" text-center text-4xl  text-[#005a9b] font-bold p-4 border-b-4 ">
          People
        </h1>
      </div>
      {positionOrder.map((position) => {
        const members = fakeLabMembers.filter(
          (member) => member.type === position
        );
        return (
          <div
            key={position}
            className="flex flex-row justify-center items-center text-center mb-4"
          >
            <div className=" p-4">
              <h2 className="text-2xl font-semibold mb-2 underline underline-offset-8">
                {position}
              </h2>
              <div className="flex gap-4">
                {members.map((member) => (
                  <PeopleCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default People;
