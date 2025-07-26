import React from "react";
import { Box, Typography, Paper, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../app/store";
import { saveFields } from "../fieldsThunks";
import { setFields } from "../fieldsSlice";

const useStyles = makeStyles({
  editorContainer: {
    marginTop: 32,
  },
  paper: {
    padding: 10,
  },
});

const Editor = () => {
  const classes = useStyles();
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
      // Ignore invalid JSON
    }
  };

  return (
    <Box className={classes.editorContainer}>
      <Typography variant="h6">Editor</Typography>
      <Paper className={classes.paper}>
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
