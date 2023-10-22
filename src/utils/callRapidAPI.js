import axios from "axios";

export const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    "X-RapidAPI-Key": "e742cbb2bbmsh8492cd2e1ff0bdap13c194jsnfb9e2477249f",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const callRapidAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};
