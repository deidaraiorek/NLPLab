import React from "react";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <div className="container mx-auto py-10 px-4 md:px-8 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-center text-4xl mb-4">
            Welcome to the Language and Intelligence Laboratory (LAILab)
          </h4>

          <p className="mb-4">
            The Language and Intelligence Laboratory (LAILab) at the Machine
            Learning Department at Moffitt is a multidisciplinary research group
            that translates advances in natural language processing (NLP) and
            machine learning (ML) to solve low-resourced language understanding,
            language generation, and predictive medicine tasks in oncology and
            healthcare informatics. Our work involves:
          </p>

          <ol className="list-decimal pl-8 space-y-4">
            <li>
              Identification and standardization of functional status
              information in clinical notes of adult and senior cancer patients.
            </li>
            <li>
              Information extraction and knowledge graph construction from
              clinical notes to assist cancer registry and evidence-based
              predictive modeling.
            </li>
            <li>
              Linking aging, comorbidities, and drugs to prostate cancer relapse
              and survival.
            </li>
            <li>
              Predicting unplanned hospital readmission in adult patients with
              gastrointestinal cancers initiating surgery.
            </li>
            <li>
              Other interdisciplinary projects as we expand our internal and
              external collaboration networks.
            </li>
          </ol>

          <p className="mt-4">
            To accomplish multidimensional and multidisciplinary goals, we
            transfer and customize cutting-edge methodologies in NLP and ML such
            as large language modeling, in-context inference, data augmentation,
            domain adaptation, etc. Our daily activities include utilization of
            forefront deep neural network ecosystem and architectures on our
            Nvidia DGX server.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
