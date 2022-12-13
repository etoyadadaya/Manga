import axios from "axios";

const apiURL = "";
const host = axios.create({
  baseURL: apiURL,
  withCredentials: false,
  headers: {
    "Content-type": "application/json",
  },
});

const useApiCall = () => host;

export default useApiCall;
