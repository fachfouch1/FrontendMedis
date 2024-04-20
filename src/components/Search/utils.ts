import axios from "axios";

export const getMolecule = (userId: number, maxResults: number, keyword: string) => {
  const url = `http://localhost:5000/molecule/${userId}/${maxResults}`;
  const body = {
    keyword: keyword,
  };

  return axios
    .post(url, body)
    .then((response) => {
      console.log("Success:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
};
