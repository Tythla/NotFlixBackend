import axios from "axios";

const apiUrl = "https://api.themoviedb.org/3";
const apiKey = "775ab391c192a98f82f683c7653a4b59";

export const getPopularMovies = async (page: number = 1) => {
  const url = `${apiUrl}/movie/popular?api_key=${apiKey}&page=${page}`;
  const response = await axios.get(url);
  return response.data;
};

export const getMovieDetail = async (id: number) => {
  const url = `${apiUrl}/movie/${id}?api_key=${apiKey}`;
  const response = await axios.get(url);
  return response.data;
};

export const getMovieImages = async (id: number) => {
  const url = `${apiUrl}/movie/${id}/images?api_key=${apiKey}`;
  const response = await axios.get(url);
  return response.data;
};

export const getMovieCasts = async (id: number) => {
  const url = `${apiUrl}/movie/${id}/credits?api_key=${apiKey}`;
  const response = await axios.get(url);
  return response.data;
};

export const getMovieVideos = async (id: number) => {
  const url = `${apiUrl}/movie/${id}/videos?api_key=${apiKey}`;
  const response = await axios.get(url);
  return response.data;
};
