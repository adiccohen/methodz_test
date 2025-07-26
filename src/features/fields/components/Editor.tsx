import React from "react";
import { Box, Typography, Paper, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../app/store";
import { saveFields } from "../fieldsThunks";
import { setFields } from "../fieldsSlice";
import { Field } from "../fieldsSlice";

const useStyles = makeStyles({
  editorContainer: {
    marginTop: 32,
  },
  paper: {
    padding: 10,
    height: 400,
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    flexGrow: 1,
    "& .MuiOutlinedInput-root": {
      height: "100%",
      alignItems: "flex-start",
    },
    "& .MuiInputBase-inputMultiline": {
      overflow: "auto !important",
      height: "100% !important",
    },
    "& textarea": {
      overflow: "auto",
    },
  },
});

const Editor = () => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const fields = useSelector((state: RootState) => state.fields.fields);
  const [json, setJson] = React.useState("");

  // Convert offsetFrom/offsetTo → start/end for display
  const convertToDisplayJson = (fields: Field[]) =>
    JSON.stringify(
      fields.map((f) => ({
        name: f.name,
        type: f.type,
        start: f.offsetFrom,
        end: f.offsetTo,
        description: f.description,
      })),
      null,
      2
    );

  React.useEffect(() => {
    setJson(convertToDisplayJson(fields));
  }, [fields]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newJson = e.target.value;
    setJson(newJson);
    try {
      const parsed = JSON.parse(newJson);
      const normalized: Field[] = parsed.map((f: any) => ({
        name: f.name,
        type: f.type,
        offsetFrom: f.start ?? 0,
        offsetTo: f.end ?? 0,
        description: f.description || "",
      }));

      dispatch(setFields(normalized));
      dispatch(saveFields(normalized));
    } catch (err) {
      // ignore invalid JSON while typing
    }
  };

  return (
    <Box className={classes.editorContainer}>
      <Typography variant="h6">Editor</Typography>
      <Paper className={classes.paper}>
        <TextField
          multiline
          fullWidth
          value={json}
          onChange={handleChange}
          variant="outlined"
          className={classes.textField}
        />
      </Paper>
    </Box>
  );
};

export default Editor;
