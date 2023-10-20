import DiabeticPublication from "../assets/images/DiabeticPrediction.jpg";
import Philm2WEB from "../assets/images/PHILM2WEB.jpeg";
import ComputerAssisted from "../assets/images/MedicalBilling.jpg";
import InvestigateImage from "../assets/images/Investigate.jpg";
import LexDivPara from "../assets/images/LexDivPara.jpg";
import Mobility from "../assets/images/Mobility.jpg";
import Broadening from "../assets/images/Broadening.jpeg";
import PhaseII from "../assets/images/PhaseII.jpg";
import Beaker from "../assets/images/photo.jpg";
import Literature from "../assets/images/Literature.jpeg";
import SystemComputation from "../assets/images/SystemComputation.jpg";
import Evolution from "../assets/images/Evolution.jpg";
import Inductive from "../assets/images/Inductive.jpg";
// Mock Data
export const PROJECTS_DATA = [
  {
    title: "Whole-person Function",
    description: "We present the importance of capturing information on activity as a core component of modern health systems and identify specific steps and analytic methods that can be used to make it more available to utilize in improving patient care. We identify challenges in the use of activity and participation information, such as a lack of consistent documentation and diversity of data specificity and representation across providers, health systems, and national surveys. We describe how activity and participation information can be more effectively captured, and how health informatics methodologies, including natural language processing (NLP), can enable automatically locating, extracting, and organizing this information on a large scale, supporting standardization and utilization with minimal additional provider burden. We examine the analytic requirements and potential challenges of capturing this information with informatics, and describe how data-driven techniques can combine with common standards and documentation practices to make activity and participation information standardized and accessible for improving patient care.",
    image: Mobility, 
    papers: [
      {
        title: "Thieu T, Maldonado JCM, Ho P-S, Ding M, Marr A, Brandt D, Newman-Griffis D, Zirikly A, Chan L, Rasch E. A comprehensive study of mobility functioning information in clinical notes: Entity hierarchy, corpus annotation, and sequence labeling. Int J Med Inform. 2021;147:104351. doi: 10.1016/j.ijmedinf.2020.104351.",
        link: "https://www.sciencedirect.com/science/article/pii/S1386505620318876?via%3Dihub",
      },
      {
        title: "Newman-Griffis, D., Porcino, J., Zirikly, A. et al. Broadening horizons: the case for capturing function and the role of health informatics in its use. BMC Public Health 19, 1288 (2019). https://doi.org/10.1186/s12889-019-7630-3",
        link: "https://bmcpublichealth.biomedcentral.com/articles/10.1186/s12889-019-7630-3",
      },
      {
        title: "Newman-Griffis D, Thieu T, Zhou C, Brandt DE, Maldonado JC, Porcino J, Lai A, Chan L. Characterizing the language of functioning: A corpus analysis illustrating how human function is described in clinical text. CRI EBooks. 2017 Jan.",
        link: "https://www.academia.edu/32967524/Characterizing_the_Language_of_Functioning_A_Corpus_Analysis_Illustrating_How_Human_Function_is_Described_in_Clinical_Text",
      },
      {
        title: "Thieu T, et al. Inductive identification of functional status information and establishing a gold standard corpus: A case study on the Mobility domain. In: 2017 IEEE International Conference on Bioinformatics and Biomedicine (BIBM); 2017 Nov 13-16; Kansas City, MO, USA. Piscataway (NJ): IEEE; 2017. p. 2319-2321. doi: 10.1109/BIBM.2017.8218042.",
        link: "https://ieeexplore.ieee.org/document/8218042",
      },
    ],
  },
  {
    title: "Literature Mining",
    description: "During infection, the pathogen’s entry into the host organism, breaching the host immune defense, spread and multiplication are frequently mediated by multiple interactions between the host and pathogen proteins. Systematic studying of host–pathogen interactions (HPIs) is a challenging task for both experimental and computational approaches and is critically dependent on the previously obtained knowledge about these interactions found in the biomedical literature. While several HPI databases exist that manually filter HPI protein–protein interactions from the generic databases and curated experimental interactomic studies, no comprehensive database on HPIs obtained from the biomedical literature is currently available. Here, we introduce a high-throughput literature-mining platform for extracting HPI data that includes the most comprehensive to date collection of HPIs obtained from the PubMed abstracts. Our HPI data portal, PHILM2Web (Pathogen–Host Interactions by Literature Mining on the Web), integrates an automatically generated database of interactions extracted by PHILM, our high-precision HPI literature-mining algorithm. Currently, the database contains 23 581 generic HPIs between 157 host and 403 pathogen organisms from 11 609 abstracts. The interactions were obtained from processing 608 972 PubMed abstracts, each containing mentions of at least one host and one pathogen organisms. In response to the coronavirus disease 2019 (COVID-19) pandemic, we also utilized PHILM to process 25 796 PubMed abstracts obtained by the same query as the COVID-19 Open Research Dataset. This COVID-19 processing batch resulted in 257 HPIs between 19 host and 31 pathogen organisms from 167 abstracts. The access to the entire HPI dataset is available via a searchable PHILM2Web interface; scientists can also download the entire database in bulk for offline processing. Database URL: http://philm2web.live",
    image: Literature, 
    papers: [
      {
        title: "Le T-D, Nguyen PD, Korkin D, Thieu T. PHILM2Web: A high-throughput database of macromolecular host–pathogen interactions on the Web. Database (Oxford). 2022;2022:baac042. doi: 10.1093/database/baac042.",
        link: "https://academic.oup.com/database/article/doi/10.1093/database/baac042/6625823?login=true",
      },
      {
        title: "Thieu T, Joshi S, Warren S, Korkin D. Literature mining of host–pathogen interactions: comparing feature-based supervised learning and language-based approaches. Bioinformatics. 2012 Mar;28(6):867-75. doi: 10.1093/bioinformatics/bts042.",
        link: "https://academic.oup.com/bioinformatics/article/28/6/867/311962?login=false",
      },
      {
        title: "Mining Host-Pathogen Interactions",
        link: "Korkin D, Thieu T, Joshi S, Warre S. Mining Host-Pathogen Interactions [Internet]. Systems and Computational Biology - Molecular and Cellular Experimental Systems. InTech; 2011. Available from: http://dx.doi.org/10.5772/22016",
      },
    ],
  },
  {
    title: "Medical Billing",
    description: "Medical billing is important for both healthcare providers and payers, yet filling reimbursement requires tremen-dous effort to process clinical notes, making it labor-intensive and error-prone. This work compares two natural language processing (NLP) approaches to extract patients' history information from clinical notes for billing purposes. A rule-based pipeline built on top of a generic clinical NLP tool CLAMP, is compared against an end-to-end deep neural network architecture. We annotate a gold-standard corpus to evaluate the two approaches. Results show information extraction for medical billing is a challenging problem though NLP has great potential to automate the task. Our work is the first academic study using NLP in Evaluation and Management billing.",
    image: ComputerAssisted,
    papers: [
      {
        title: "Korkin D, Thieu T, Joshi S, Warre S. Mining Host-Pathogen Interactions [Internet]. Systems and Computational Biology - Molecular and Cellular Experimental Systems. InTech; 2011. Available from: http://dx.doi.org/10.5772/22016",
        link: "https://ieeexplore.ieee.org/document/9697942",
      },
    ],
  },
  {
    title: "Language Diversity",
    description: "We present a novel method that automatically measures quality of sentential paraphrasing. Our method balances two conflicting criteria: semantic similarity and lexical diversity. Using a diverse annotated corpus, we built learning to rank models on edit distance, BLEU, ROUGE, and cosine similarity features. Extrinsic evaluation on STS Benchmark and ParaBank Evaluation datasets resulted in a model ensemble with moderate to high quality. We applied our method on both small benchmarking and large-scale datasets as resources for the community.",
    image: LexDivPara,
    papers: [
      {
        title: "Thanh T, Do H, Tanh D, Shi P, Sathyanarayanan A, Khan S, Kohei A. LexDivPara: A Measure of Paraphrase Quality with Integrated Sentential Lexical Complexity. In: International Workshop on Intelligent Systems and Applications; [Date Unknown]; [Location Unknown]. [Publisher Unknown]; [Year Unknown]. Available from: https://doi.org/10.1007/978-3-030-82199-9_1",
        link: "https://link.springer.com/chapter/10.1007/978-3-030-82199-9_1",
      },
    ],
  },
  {
    title: "Diabetic Retinopathy",
    description: "Diabetic Retinopathy (DR) is the leading cause of blindness among adults in the U.S. Since DR is asymptomatic at the early stages, diabetic patients do not feel the uncomfortable ophthalmic exams necessary. However, existing DR diagnosis approaches mainly rely on fundus images that require access to ophthalmologists and special equipment, which are typically unavailable in rural areas. Machine-learning-based predictive models could help primary care physicians identify patients with a high risk of DR and confidently recommend ophthalmic exams. However, existing DR prediction models require a large number of independent variables, making them challenging to utilize in a clinical setting. In this study, we designed a novel “Progressive Ablation Feature Selection method with XGBoost” which successfully reduced the number of predictors from 25 to 9 to create a more user-friendly DR prediction model without sacrificing accuracy with an Area Under Curve of 96.61%. This study suggests that diabetic retinopathy is closely associated with creatinine, followed by neuropathy, hematocrit, BUN, nephropathy, albumin, race, calcium, and sodium. We provide an insight into each selected feature and its medical associations with DR. The result of this work will help physicians use a small set of available variables to identify high-risk diabetic patients prone to develop DR. Medical doctors thus can intervene at the proper time to prevent vision loss.",
    image: DiabeticPublication,
    papers: [
      {
        title: "Homayouni A, Liu T, Thieu T. Diabetic retinopathy prediction using Progressive Ablation Feature Selection: A comprehensive classifier evaluation. Smart Health. 2022;26:100343. doi: 10.1016/j.smhl.2022.100343.",
        link: "https://www.sciencedirect.com/science/article/pii/S2352648322000770?via%3Dihub",
      },
    ],
  },
  {
    title: "Clinical Trial",
    description: "The basket trial is a recent development in the design of clinical trial. It tests the same treatment on several different related diseases in a single trial and reduces cost and enhances efficiency. The group sequential trial design is commonly used for phase II trials, in which the trial is monitored in several stages and may terminate before the planned end if significant inefficiency is detected. While most existing basket trials are for continuous data, binary data are commonly used in phase II clinical trials. This article will study group sequential basket trial for binary data. We use frailty model to account for the dependence among the different diseases. Simulation studies are carried out to evaluate the performance of the trial.",
    image: PhaseII,
    papers: [
      {
        title: "Zhou W, Yuan A, Thieu T, Fang H, Tan TM. Phase II Basket Group Sequential Clinical Trial with Binary Responses. Austin Biom Biostat. 2017;4(1):1033.",
        link: "https://austinpublishinggroup.com/biometrics/fulltext/biometrics-v4-id1033.pdf",
      },
    ],
  },
  {
    title: "Graphical Machine Learning",
    description:  "For years, scientists have challenged the machine intelligence problem. Learning classes of objects followed by the classification of objects into their classes is a common task in machine intelligence. For this task, two objects representation schemes are often used: a vector-based representation, and a graph-based representation. While the vector representation has sound mathematical background and optimization tools, it lacks the ability to encode relations between the patterns and their parts, thus lacking the complexity of human perception. On the other hand, the graph-based representation naturally captures the intrinsic structural properties, but available algorithms usually have exponential complexity. In this work, we build an inductive learning algorithm that relies on graph-based representation of objects and their classes, and test the framework on a competitive dataset of human actions in static images. The method incorporates three primary measures of class representation: likelihood probability, family resemblance typicality, and minimum description length. Empirical benchmarking shows that the method is robust to the noisy input, scales well to real-world datasets, and achieves comparable performance to current learning techniques. Moreover, our method has the advantage of intuitive representation regarding both patterns and class representation. While applied to a specific problem of human pose recognition, our framework, named graphical Evolving Transformation System (gETS), can have a wide range of applications and can be used in other machine learning tasks.",
    image: Evolution,
    papers: [
      {
        title:"Thieu T. Graphical evolving transformation system machine [dissertation]. [Place unknown]: [Publisher unknown]; 2015. Available from: https://hdl.handle.net/10355/49119 or https://doi.org/10.32469/10355/49119",
        link: "https://mospace.umsystem.edu/xmlui/handle/10355/49119",
      },
    ],
  },
];
