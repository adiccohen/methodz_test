// src/features/fields/fieldsThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Field } from "./fieldsSlice";
import { fetchFieldsFromApi, saveFieldsToApi } from "../../api/fieldsApi";

export const fetchFields = createAsyncThunk("fields/fetchFields", async () => {
  const data = await fetchFieldsFromApi();
  return data;
});

export const saveFields = createAsyncThunk(
  "fields/saveFields",
  async (fields: Field[]) => {
    await saveFieldsToApi(fields);
  }
);
