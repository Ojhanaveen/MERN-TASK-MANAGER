import api from "../api/axios";

export const getTasks = () => api.get("/tasks");

export const createTask = (data) =>
  api.post("/tasks", data);

export const updateTask = (id, data) =>
  api.patch(`/tasks/${id}`, data);

export const deleteTask = (id) =>
  api.delete(`/tasks/${id}`);

export const uploadTaskFile = (id, formData) =>
  api.post(`/tasks/${id}/upload`, formData);