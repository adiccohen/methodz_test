import React from "react";
import {
  Typography,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Field } from "../fieldsSlice";
import { useDispatch } from "react-redux";
import { setFields } from "../fieldsSlice";
import { saveFields } from "../fieldsThunks";
import { AppDispatch } from "../../../app/store";

interface Props {
  fields: Field[];
}

const useStyles = makeStyles({
  fieldPaper: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    marginBottom: 8,
    justifyContent: "space-between",
  },
  container: {
    marginTop: 32,
  },
  outerPaper: {
    padding: 16,
    height: "100%",
  },
  type: {
    fontWeight: "bold",
    marginRight: 12,
    width: 60,
    textTransform: "uppercase",
  },
  fieldInfo: {
    display: "flex",
    flexDirection: "column",
  },
  offset: {
    fontSize: "0.9rem",
    color: "#555",
  },
  fieldLeft: {
    display: "flex",
    alignItems: "center",
  },
  deleteButton: {
    fontSize: "1.2rem",
    color: "#d32f2f",
    padding: 4,
  },
});

const Canvas: React.FC<Props> = ({ fields }) => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (indexToDelete: number) => {
    const updatedFields = fields.filter((_, i) => i !== indexToDelete);
    dispatch(setFields(updatedFields));
    dispatch(saveFields(updatedFields));
  };

  return (
    <Paper elevation={3} className={classes.outerPaper}>
      <Box className={classes.container}>
        <Typography variant="h6">Canvas</Typography>
        {fields.map((field, index) => {
          const length = field.offsetTo - field.offsetFrom + 1;
          return (
            <Paper key={index} className={classes.fieldPaper}>
              <div className={classes.fieldLeft}>
                <div className={classes.type}>{field.type}</div>
                <div className={classes.fieldInfo}>
                  <div>
                    <strong>{field.name}</strong> {field.offsetFrom}:
                    {field.offsetTo} ({length})
                  </div>
                </div>
              </div>

              <IconButton
                onClick={() => handleDelete(index)}
                className={classes.deleteButton}
              >
                ×
              </IconButton>
            </Paper>
          );
        })}
      </Box>
    </Paper>
  );
};

export default Canvas;
