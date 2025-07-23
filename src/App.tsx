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
import { fetchFields, saveFields } from "./features/fields/fieldsThunks"; // <-- Add saveFields import here

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

      <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
        + Add Field
      </Button>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>New Field</DialogTitle>

        <Formik
          initialValues={{
            name: "",
            type: "string" as "string" | "num",
            offsetFrom: 0,
            offsetTo: 0,
            description: "",
          }}
          onSubmit={(values, { resetForm }) => {
            const newFields = [...fields, values];
            dispatch(addField(values));
            dispatch(saveFields(newFields)); // <-- Save fields to server
            setModalOpen(false);
            resetForm();
          }}
        >
          {({ values, handleChange }) => (
            <Form>
              <DialogContent>
                <TextField
                  label="Field Name"
                  name="name"
                  fullWidth
                  margin="dense"
                  value={values.name}
                  onChange={handleChange}
                />

                <FormControl fullWidth margin="dense">
                  <InputLabel>Type</InputLabel>
                  <Select
                    label="Type"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                  >
                    <MenuItem value="string">String</MenuItem>
                    <MenuItem value="num">Num</MenuItem>
                  </Select>
                </FormControl>

                <Box display="flex" gap={2} mt={1}>
                  <TextField
                    label="Offset From"
                    name="offsetFrom"
                    type="number"
                    margin="dense"
                    value={values.offsetFrom}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    label="Offset To"
                    name="offsetTo"
                    type="number"
                    margin="dense"
                    value={values.offsetTo}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>

                <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  margin="dense"
                  multiline
                  rows={2}
                  value={values.description}
                  onChange={handleChange}
                />
              </DialogContent>

              <DialogActions>
                <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button variant="contained" type="submit">
                  Add
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>

      {/* Canvas */}
      <Box mt={4}>
        <Typography variant="h6">Fields</Typography>
        {fields.map((field, index) => (
          <Paper key={index} style={{ padding: 10, marginBottom: 8 }}>
            <strong>{field.name}</strong> ({field.type}) | Offset: {field.offsetFrom} - {field.offsetTo}
            <br />
            <em>{field.description}</em>
          </Paper>
        ))}
      </Box>

      {/* Editor */}
      <Box mt={4}>
        <Typography variant="h6">Raw JSON</Typography>
        <Paper style={{ padding: 10, whiteSpace: "pre-wrap" }}>
          {JSON.stringify(fields, null, 2)}
        </Paper>
      </Box>
    </div>
  );
};

export default App;
