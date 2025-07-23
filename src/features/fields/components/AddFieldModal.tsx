import React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import { Formik, Form } from "formik";
import { Field } from "../fieldsSlice";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (field: Field) => void;
}

const AddFieldModal: React.FC<Props> = ({ open, onClose, onAdd }) => {
  return (
    <Dialog open={open} onClose={onClose}>
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
          onAdd(values);
          resetForm();
          onClose();
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
                <Select name="type" value={values.type} onChange={handleChange} label="Type">
                  <MenuItem value="string">String</MenuItem>
                  <MenuItem value="num">Num</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Offset From"
                name="offsetFrom"
                type="number"
                margin="dense"
                fullWidth
                value={values.offsetFrom}
                onChange={handleChange}
              />
              <TextField
                label="Offset To"
                name="offsetTo"
                type="number"
                margin="dense"
                fullWidth
                value={values.offsetTo}
                onChange={handleChange}
              />
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
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddFieldModal;
