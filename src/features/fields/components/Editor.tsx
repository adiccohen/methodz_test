import React from "react";
import { Box, Typography, Paper, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../app/store";
import { saveFields } from "../fieldsThunks";
import { setFields } from "../fieldsSlice";

const Editor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fields = useSelector((state: RootState) => state.fields.fields);
  const [json, setJson] = React.useState(JSON.stringify(fields, null, 2));

  React.useEffect(() => {
    setJson(JSON.stringify(fields, null, 2));
  }, [fields]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJson(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      dispatch(setFields(parsed));
      dispatch(saveFields(parsed));
    } catch (err) {
      // Don't dispatch if not valid JSON
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h6">Raw JSON Editor</Typography>
      <Paper style={{ padding: 10 }}>
        <TextField
          multiline
          fullWidth
          minRows={10}
          value={json}
          onChange={handleChange}
          variant="outlined"
        />
      </Paper>
    </Box>
  );
};

export default Editor;
