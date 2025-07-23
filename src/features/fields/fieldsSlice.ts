import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFields } from './fieldsThunks';

export interface Field {
  name: string;
  type: 'string' | 'num';
  offsetFrom: number;
  offsetTo: number;
  description: string;
}

interface FieldsState {
  fields: Field[];
}

const initialState: FieldsState = {
  fields: [],
};

const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    setFields(state, action: PayloadAction<Field[]>) {
      state.fields = action.payload;
    },
    addField(state, action: PayloadAction<Field>) {
      state.fields.push(action.payload);
    },
    clearFields(state) {
      state.fields = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFields.fulfilled, (state, action) => {
      state.fields = action.payload;
    });
  },
});

export const { setFields, addField, clearFields } = fieldsSlice.actions;
export default fieldsSlice.reducer;
