import axios from "axios";

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
