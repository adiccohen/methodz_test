import React, { useEffect, useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./app/store";
import { addField, Field } from "./features/fields/fieldsSlice";
import { fetchFields, saveFields } from "./features/fields/fieldsThunks";
import AddFieldModal from "./features/fields/components/AddFieldModal";
import Canvas from "./features/fields/components/Canvas";
import Editor from "./features/fields/components/Editor";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  addButton: {
    marginBottom: 16,
  },
});

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const fields = useSelector((state: RootState) => state.fields.fields);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchFields());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      <Typography
        variant="h4"
        fontWeight="bold"
        color="#ff69b4" // Same pink
        textAlign="center"
        sx={{ mt: 3, mb: 2 }}
      >
        Header Analysis
      </Typography>

      <Button
        variant="contained"
        onClick={() => setModalOpen(true)}
        className={classes.addButton}
        style={{
          fontSize: 24,
          padding: "6px 16px",
          backgroundColor: "#f8bbd0", // light pink
          color: "#880e4f", // darker pink text for contrast
        }}
      >
        +
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

      <Box display="flex" gap={3} mt={4}>
        {/* Left side: Canvas */}
        <Box flex={1}>
          <Canvas fields={fields} />
        </Box>

        {/* Right side: Editor */}
        <Box flex={1}>
          <Editor />
        </Box>
      </Box>
    </Box>
  );
};

export default App;
