import React, { useState } from "react";
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
  SelectChangeEvent,
} from "@mui/material";

interface Field {
  name: string;
  type: "string" | "num";
  offsetFrom: number;
  offsetTo: number;
  description: string;
}

const App = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState<Field>({
    name: "",
    type: "string",
    offsetFrom: 0,
    offsetTo: 0,
    description: "",
  });

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "offsetFrom" || name === "offsetTo" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value as "string" | "num",
    }));
  };

  const handleAddField = () => {
    setFields(prev => [...prev, formData]);
    setFormData({
      name: "",
      type: "string",
      offsetFrom: 0,
      offsetTo: 0,
      description: "",
    });
    setModalOpen(false);
  };

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
        <DialogContent>

          <TextField
            label="Field Name"
            name="name"
            fullWidth
            margin="dense"
            value={formData.name}
            onChange={handleTextChange}
          />

          <FormControl fullWidth margin="dense">
            <InputLabel>Type</InputLabel>
            <Select
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleSelectChange}
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
              value={formData.offsetFrom}
              onChange={handleTextChange}
              fullWidth
            />
            <TextField
              label="Offset To"
              name="offsetTo"
              type="number"
              margin="dense"
              value={formData.offsetTo}
              onChange={handleTextChange}
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
            value={formData.description}
            onChange={handleTextChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddField}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Canvas */}
      <Box mt={4}>
        <Typography variant="h6">Fields</Typography>
        {fields.map((field, index) => (
          <Paper key={index} style={{ padding: 10, marginBottom: 8 }}>
            <strong>{field.name}</strong> ({field.type}) | Offset: {field.offsetFrom}-{field.offsetTo}
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
