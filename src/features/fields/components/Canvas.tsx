import React from "react";
import { Typography, Box, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Field } from "../fieldsSlice";

interface Props {
  fields: Field[];
}

const useStyles = makeStyles({
  fieldPaper: {
    padding: 10,
    marginBottom: 8,
  },
  container: {
    marginTop: 32,
  },
  outerPaper: {
    padding: 16,
    height: "100%",
  },
});

const Canvas: React.FC<Props> = ({ fields }) => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.outerPaper}>
      <Box className={classes.container}>
        <Typography variant="h6">Canvas</Typography>
        {fields.map((field, index) => (
          <Paper key={index} className={classes.fieldPaper}>
            <strong>{field.name}</strong> ({field.type}) | Offset: {field.offsetFrom} - {field.offsetTo}
            <br />
            <em>{field.description}</em>
          </Paper>
        ))}
      </Box>
    </Paper>
  );
};

export default Canvas;
