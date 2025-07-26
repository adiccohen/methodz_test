
import axios from "axios";
import { Field } from "../features/fields/fieldsSlice";

const API_BASE = "https://pkzpm229n1.execute-api.eu-north-1.amazonaws.com/Prod";

export const fetchFieldsFromApi = async (): Promise<Field[]> => {
  const response = await axios.get(`${API_BASE}/fields`);

  const mapped = response.data.map((f: any) => ({
    name: f.name,
    type: f.type,
    offsetFrom: f.offset_from ?? 0,
    offsetTo: f.offset_to ?? 0,
    description: f.description || "",
  }));

  return mapped;
};

export const saveFieldsToApi = async (fields: Field[]) => {
  const cleanedFields = fields.map((f) => ({
    ...f,
    offsetFrom: typeof f.offsetFrom === "number" ? f.offsetFrom : 0,
    offsetTo: typeof f.offsetTo === "number" ? f.offsetTo : 0,
    description: f.description || "",
  }));

  await axios.post(`${API_BASE}/fields`, cleanedFields);
};
