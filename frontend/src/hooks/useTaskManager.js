import { useState } from "react";
import {
  createTask,
  updateTask,
  deleteTask,
  uploadTaskFile,
} from "../services";

export const useTaskManager = (refreshTasks) => {
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleOpenAdd = () => {
    setEditingTask(null);
    setOpen(true);
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    refreshTasks();
  };

  const handleMarkAsDone = async (task) => {
    await updateTask(task._id, {
      status: "completed",
    });
    refreshTasks();
  };

  const handleSubmit = async ({ title, file }) => {
    let task;

    if (editingTask) {
      const response = await updateTask(
        editingTask._id,
        { title }
      );
      task = response.data.data;
    } else {
      const response = await createTask({ title });
      task = response.data.data;
    }

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      await uploadTaskFile(task._id, formData);
    }

    setOpen(false);
    refreshTasks();
  };

  return {
    open,
    editingTask,
    setOpen,
    handleOpenAdd,
    handleOpenEdit,
    handleDelete,
    handleMarkAsDone,
    handleSubmit,
  };
};