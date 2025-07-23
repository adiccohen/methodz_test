import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Box,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./app/store";
import { addField, Field } from "./features/fields/fieldsSlice";
import { Formik, Form } from "formik";
import Canvas from "./features/fields/components/Canvas";
import { fetchFields, saveFields } from "./features/fields/fieldsThunks"; // <-- Add saveFields import here
import AddFieldModal from "./features/fields/components/AddFieldModal";
import Editor from "./features/fields/components/Editor";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fields = useSelector((state: RootState) => state.fields.fields);

  useEffect(() => {
    dispatch(fetchFields());
  }, [dispatch]);

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Field Editor
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
      >
        + Add Field
      </Button>

      <AddFieldModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={(newField) => {
          const newFields = [...fields, newField];
          dispatch(addField(newField));
          dispatch(saveFields(newFields));
        }}
      />
      <Canvas fields={fields} />

      <Editor />
    </div>
  );
};

export default App;
