import React from "react";
import { Typography, Box, Paper } from "@mui/material";
import { Field } from "../fieldsSlice";

interface Props {
  fields: Field[];
}

const Canvas: React.FC<Props> = ({ fields }) => {
  return (
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
  );
};

export default Canvas;
