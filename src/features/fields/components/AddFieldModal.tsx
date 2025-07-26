import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Formik, Form } from "formik";
import { Field } from "../fieldsSlice";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (field: Field) => void;
}

const useStyles = makeStyles({
  formControl: {
    marginTop: 8,
    marginBottom: 8,
    minWidth: 120,
  },
});

const AddFieldModal: React.FC<Props> = ({ open, onClose, onAdd }) => {
  const classes = useStyles();

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
          const parsedField = {
            ...values,
            offsetFrom: Number(values.offsetFrom),
            offsetTo: Number(values.offsetTo),
          };
          onAdd(parsedField);
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
              <FormControl
                fullWidth
                margin="dense"
                className={classes.formControl}
              >
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={values.type}
                  onChange={handleChange}
                  label="Type"
                >
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
