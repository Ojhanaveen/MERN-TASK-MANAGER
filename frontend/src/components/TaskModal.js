import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import FileUpload from "./FileUpload";

const TaskModal = ({
  open,
  onClose,
  onSubmit,
  editingTask,
}) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
    } else {
      setTitle("");
    }
    setFile(null);
  }, [editingTask]);

  const handleSave = () => {
    onSubmit({ title, file });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {editingTask ? "Edit Task" : "Add Task"}
      </DialogTitle>

      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {!editingTask && (
          <FileUpload
            file={file}
            onFileChange={setFile}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSave}
        >
          {editingTask ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;