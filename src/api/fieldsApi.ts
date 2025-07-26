// src/api/fieldsApi.ts
import axios from "axios";
import { Field } from "../features/fields/fieldsSlice";

//const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";
const API_BASE = "https://pkzpm229n1.execute-api.eu-north-1.amazonaws.com/Prod";


export const fetchFieldsFromApi = async (): Promise<Field[]> => {
  const response = await axios.get(`${API_BASE}/fields`);
  return response.data;
};

export const saveFieldsToApi = async (fields: Field[]) => {
  await axios.post(`${API_BASE}/fields`, fields);
};
