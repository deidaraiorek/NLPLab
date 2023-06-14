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
export const PUBLICATIONS_DATA = [
  {
    id: 1,
    title:
      "Diabetic retinopathy prediction using Progressive Ablation Feature Selection: A comprehensive classifier evaluation",
    year: 2022,
    date: "27 Sep 2022",
    authors: "Ahmadreza Homayouni, Tieming Liu, Thanh Thieu",
    category: "Smart Health",
    url: "https://www.sciencedirect.com/science/article/pii/S2352648322000770?via%3Dihub",
    image: DiabeticPublication,
  },
  {
    id: 2,
    title:
      "PHILM2Web: A high-throughput database of macromolecular host–pathogen interactions on the Web",
    year: 2022,
    date: "30 Jun 2022",
    authors: "Tuan-Dung Le, Phuong D Nguyen, Dmitry Korkin, Thanh Thieu",
    category: "Database",
    url: "https://academic.oup.com/database/article/doi/10.1093/database/baac042/6625823?login=true",
    image: Philm2WEB,
  },
  {
    id: 3,
    title:
      "Computer-assisted medical billing information extraction: comparing rule-based and end-to-end transfer learning approaches",
    year: 2021,
    date: "01 Dec 2021",
    authors:
      "Suhao Chen, Tuan-Dung Le, Thanh Thieu, Zhuqi Miao, Phuong D. Nguyen, Andrew Gin",
    category: " ",
    url: "https://ieeexplore.ieee.org/document/9697942",
    image: ComputerAssisted,
    description:
      "IEEE/ACM Conference on Connected Health: Applications, Systems and Engineering Technologies (CHASE)",
  },
  {
    id: 4,
    title:
      "A high-throughput, online tool for investigating host-pathogen macromolecular interactions buried in scientific literature",
    year: 2021,
    date: "01 Dec 2021",
    authors: "Tuan-Dung Le, Phuong D. Nguyen, Dmitry Korkin, Thanh Thieu",
    category: " ",
    url: "https://ieeexplore.ieee.org/document/9697946",
    image: InvestigateImage,
    description:
      "IEEE/ACM Conference on Connected Health: Applications, Systems and Engineering Technologies (CHASE)",
  },
  {
    id: 5,
    title:
      "LexDivPara: A Measure of Paraphrase Quality with Integrated Sentential Lexical Complexity",
    year: 2021,
    authors:
      "Thanh Thieu, Ha Do, Thanh Duong, Shi Pu, Sathyanarayanan Aakur, Saad Khan",
    url: "https://link.springer.com/chapter/10.1007/978-3-030-82199-9_1",
    image: LexDivPara,
    date: "07 Aug 2021",
    category: " Lecture Notes in Networks and Systems",
  },
  {
    id: 6,
    title:
      "A comprehensive study of mobility functioning information in clinical notes: Entity hierarchy, corpus annotation, and sequence labeling",
    year: 2021,
    authors:
      "Thanh Thieu, Jonathan Camacho Maldonado, Pei-Shu Ho, Min Ding, Alex Marr, Diane Brandt, Denis Newman-Griffis, Ayah Zirikly, Leighton Chan, Elizabeth Rasch",
    url: "https://www.sciencedirect.com/science/article/pii/S1386505620318876?via%3Dihub",
    date: "01 Mar 2021",
    image: Mobility,
    category: "International Journal of Medical Informatics ",
  },
  {
    id: 7,
    title:
      "Broadening horizons: the case for capturing function and the role of health informatics in its use",
    year: 2019,
    authors:
      "Broadening horizons: the case for capturing function and the role of health informatics in its use",
    date: " 01 Oct 2019",
    url: "https://bmcpublichealth.biomedcentral.com/articles/10.1186/s12889-019-7630-3",
    image: Broadening,
    category: "BMC Public Health",
  },
  {
    id: 8,
    title:
      "Phase II Basket Group Sequential Clinical Trial with Binary Responses",
    year: 2017,
    date: " 01 Feb 2017",
    authors: "Wenxian Zhou, Ao Yuan, Thanh Thieu, Hong-Bin Fang, Ming T. Tan",
    url: "https://austinpublishinggroup.com/biometrics/fulltext/biometrics-v4-id1033.pdf",
    category: "Austin Biometrics and Biostatistics",
    image: PhaseII,
  },
  {
    id: 9,
    title:
      "Characterizing the Language of Functioning: A Corpus Analysis Illustrating How Human Function is Described in Clinical Text",
    year: 2017,
    date: " 01 Jan 2017",
    authors:
      "Denis Newman-Griffis, Thanh Thieu, Chunxiao Zhou, Diane Brandt, Jonathan C. Maldonado, Julia Porcino, Albert M. Lai, Leighton Chan",
    url: "https://www.academia.edu/32967524/Characterizing_the_Language_of_Functioning_A_Corpus_Analysis_Illustrating_How_Human_Function_is_Described_in_Clinical_Text",
    category: "AMIA Joint Summits on Translational Science, San Francisco, CA",
    image: Beaker,
  },
  {
    id: 10,
    title:
      "Literature mining of host–pathogen interactions: comparing feature-based supervised learning and language-based approaches ",
    year: 2012,
    date: "27 Jan 2012",
    authors: "Thanh Thieu, Sneha Joshi, Samantha Warren, Dmitry Korkin",
    category: "Bioinformatics    ",
    url: "https://academic.oup.com/bioinformatics/article/28/6/867/311962?login=false",
    image: Literature,
    description: "University of Missouri - Columbia, USA",
  },
  {
    id: 11,
    title: "Mining Host-Pathogen Interactions",
    year: 2011,
    date: "15 Sep 2011",
    authors: "Dmitry Korkin, Thanh Thieu, Sneha Joshi and Samantha Warren",
    url: "https://www.intechopen.com/chapters/20315",
    category:
      "Systems and Computational Biology - Molecular and Cellular Experimental Systems",
    image: SystemComputation,
  },
  {
    id: 12,
    title: "Graphical evolving transformation system machine",
    year: 2015,
    url: "https://mospace.umsystem.edu/xmlui/handle/10355/49119",
    authors: "Thanh Thieu",
    description: "University of Missouri - Columbia, USA",
    image: Evolution,
  },
  {
    id: 13,
    title:
      "Inductive identification of functional status information and establishing a gold standard corpus: A case study on the Mobility domain",
    year: 2017,
    date: "13-16 Nov 2017",
    authors:
      "Thanh Thieu, Jonathan Camacho, Pei-Shu Ho, Julia Porcino, Min Ding, ..., Leighton Chan, Diane Brandt, Denis Newman-Griffis, Ao Yuan, Albert M. Lai",
    url: "https://ieeexplore.ieee.org/document/8218042",
    description:
      "2017 IEEE International Conference on Bioinformatics and Biomedicine (BIBM)",
    image: Inductive,
  },
];
