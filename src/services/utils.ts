import axios from "axios";
import { IMolecule } from "./types";

const API_URL = "http://localhost:5000";

export const getMolecule = (userId: number, maxResults: number, keyword: string) => {
  const url = `${API_URL}/molecule/${userId}/${maxResults}`;
  const body = {
    keyword: keyword,
  };

  return axios
    .post(url, body)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
};

export const getSearchedMolecule = (moleculeId: number) => {
  const url = `${API_URL}/molecule_info/${moleculeId}`;

  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
};

export const updateMolecule = (moleculeId: number, molecule: IMolecule) => {
  const url = `${API_URL}/modify_molecule/${moleculeId}`;

  return axios
    .put(url, molecule)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
};

export const getAllMolecules = () => {
  const url = `${API_URL}/molecules`;

  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
};

export const deleteMolecule = (moleculeId: number) => {
  const url = `${API_URL}/delete_molecule/${moleculeId}`;

  return axios
    .delete(url)
    .then((response) => {
      return response.data.message !== "Molecule not found";
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
};

export const downloadPDF = (moleculeId: number) => {
  const url = `${API_URL}/generate_pdf/${moleculeId}`;

  return axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
};

export const data = {
  User_name: "user four",
  date_of_creation: "2024-04-20 19:12:43",
  id: 54,
  keyword: "paracetamol",
  user_id: 8,
};

export const info: IMolecule = {
  molecule: {
    Date: "Wed, 13 Mar 2024 01:45:02 GMT",
    keyword: "paracetamol",
  },
  pubchem: {
    atc_code: "N02BE01",
    cas_reg: "103-90-2",
    compoundname: "Acetaminophen",
    decomposition: "Decomposes before boiling",
    half_life:
      "The half-life for adults is 2.5 h after an intravenous dose of 15 mg/kg. After an overdose, the half-life can range from 4 to 8 hours depending on the severity of injury to the liver, as it heavily metabolizes acetaminophen.",
    image_url: "https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=1983&t=s",
    iupac_name: "N-(4-hydroxyphenyl)acetamide",
    melting_point: "170 °C",
    molecular_form: "C8H9NO2, HOC6H4NHCOCH3",
    molecular_weight: "151.16 g/mol",
    physical_desc: "Solid",
    pubchem_cid: "1983",
    reactivity: "Reactivity not found",
    solubility: "14 mg/mL at 25 °C",
  },
  pubmed: {
    Benefits_Risks:
      "Benefits: Paracetamol is a widely used analgesic and antipyretic agent. It is well tolerated and has a good safety profile. Risks: Paracetamol overdose can cause severe liver injury and death. Chronic use of paracetamol can lead to liver and kidney damage.",
    Clinical_Studies:
      "Paracetamol is a widely used analgesic and antipyretic agent. It is well tolerated and has a good safety profile. Paracetamol is used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers. It is also used to relieve pain from mild arthritis. Paracetamol is also used to reduce fever. Paracetamol is used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers. It is also used to relieve pain from mild arthritis. Paracetamol is also used to reduce fever.",
    Marketing_Experience:
      "Paracetamol is a widely used analgesic and antipyretic agent. It is well tolerated and has a good safety profile. Paracetamol is used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers. It is also used to relieve pain from mild arthritis. Paracetamol is also used to reduce fever. Paracetamol is used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers. It is also used to relieve pain from mild arthritis. Paracetamol is also used to reduce fever.",
    Overview_of_Efficacy:
      "Paracetamol is a widely used analgesic and antipyretic agent. It is well tolerated and has a good safety profile. Paracetamol is used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers. It is also used to relieve pain from mild arthritis. Paracetamol is also used to reduce fever. Paracetamol is used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers. It is also used to relieve pain from mild arthritis. Paracetamol is also used to reduce fever.",
    Overview_of_Safety:
      "Paracetamol is a widely used analgesic and antipyretic agent. It is well tolerated and has a good safety profile. Paracetamol is used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers. It is also used to relieve pain from mild arthritis. Paracetamol is also used to reduce fever. Paracetamol is used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers. It is also used to relieve pain from mild arthritis. Paracetamol is also used to reduce fever.",
    Pharmacodynamics:
      "Paracetamol is a widely used analgesic and antipyretic agent. It is well tolerated and has a good safety profile. Paracetamol is used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers. It is also used to relieve pain from mild arthritis. Paracetamol is also used to reduce fever. Paracetamol is used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers. It is also used to relieve pain from mild arthritis. Paracetamol is also used to reduce fever.",
    Pharmacodynamics_Drug_Interaction_page:
      "Paracetamol is a widely used analgesic and antipyretic agent. It is well tolerated and has a good safety profile. Paracetamol is used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers. It is also used to relieve pain from mild arthritis. Paracetamol is also used to reduce fever. Paracetamol is used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers. It is also used to relieve pain from mild arthritis. Paracetamol is also used to reduce fever.",
  },
};
