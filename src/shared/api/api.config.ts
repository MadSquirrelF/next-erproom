import axios, { CreateAxiosDefaults } from "axios";

import { __API__ } from "../constants/constants";

export const SERVER_URL = `${__API__}`;

export const API_URL = {
  root: (url = "") => `${url ? url : ""}`,
  orgschema: (url = "") => API_URL.root(`orgboard/schemes${url}`),
  blocks: (url = "") => API_URL.root(`orgboard/blocks${url}`),
  routes: (url = "") => API_URL.root(`orgboard/flows${url}`),
  user: (url = "") => API_URL.root(`staff/users${url}`),
};

const options: CreateAxiosDefaults = {
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

export const axiosClassic = axios.create(options);
